// Mesin simulasi aliran data sub-meter.
//
// Prinsip: SELURUH keluaran deterministik terhadap (titik, timestamp).
// Tidak ada Math.random dan tidak ada state berurutan, sehingga demo yang
// sama selalu menghasilkan angka yang sama — reload halaman, lompat maju,
// lalu lompat mundur, angkanya tetap identik.

export const INTERVAL_MIN = 15;
export const INTERVALS_PER_DAY = (24 * 60) / INTERVAL_MIN; // 96
export const VOLT = 380;
export const SQRT3 = Math.sqrt(3);

// --- Derau deterministik ------------------------------------------------
// Hash 32-bit (mulberry32 satu putaran) dipakai sebagai pengganti PRNG
// berurutan supaya nilainya tidak bergantung pada urutan pemanggilan.
function hash32(seed) {
  let t = (seed + 0x9e3779b9) | 0;
  t = Math.imul(t ^ (t >>> 16), 0x21f0aaad);
  t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
  t = t ^ (t >>> 15);
  return (t >>> 0) / 4294967296;
}

function seedOf(id, minuteIndex, salt = 0) {
  let h = salt | 0;
  for (let i = 0; i < id.length; i += 1) h = (Math.imul(h, 31) + id.charCodeAt(i)) | 0;
  return (h ^ Math.imul(minuteIndex, 2654435761)) | 0;
}

// Derau simetris di rentang [-1, 1]
function noise(id, date, salt = 0) {
  const minuteIndex = Math.floor(date.getTime() / 60000);
  return hash32(seedOf(id, minuteIndex, salt)) * 2 - 1;
}

// --- Pola produksi ------------------------------------------------------
// Mengembalikan 0..1. Bernilai 1 saat jam produksi penuh, 0 saat pabrik
// berhenti, dengan ramp 30 menit di batas shift agar grafiknya tidak kotak.
export function prodFactor(date, shift) {
  if (!shift.prodDays.includes(date.getDay())) return 0;
  const h = date.getHours() + date.getMinutes() / 60;
  const ramp = 0.5;
  const { prodStart, prodEnd } = shift;
  if (h <= prodStart - ramp || h >= prodEnd + ramp) return 0;
  if (h < prodStart + ramp) return (h - (prodStart - ramp)) / (2 * ramp);
  if (h > prodEnd - ramp) return (prodEnd + ramp - h) / (2 * ramp);
  return 1;
}

// --- Besaran terukur ----------------------------------------------------
export function kwAt(point, date, shift) {
  const f = prodFactor(date, shift);
  const base = point.baseKw + (point.peakKw - point.baseKw) * f;
  const amp = f > 0.05 ? 0.055 : 0.02; // beban dasar jauh lebih stabil
  return Math.max(0, base * (1 + noise(point.id, date) * amp));
}

// Faktor daya ikut turun saat motor berjalan jauh di bawah beban nominal —
// inilah alasan teknis kenapa exception "faktor daya rendah" bisa muncul.
export function pfAt(point, date, shift) {
  const f = prodFactor(date, shift);
  const drop = f > 0.3 ? 0 : 0.1 * (1 - f / 0.3);
  const v = point.pf - drop + noise(point.id, date, 77) * 0.015;
  return Math.min(0.99, Math.max(0.55, v));
}

export function intervalKwh(point, date, shift) {
  return (kwAt(point, date, shift) * INTERVAL_MIN) / 60;
}

// Plafon fisik satu interval: rating CT x tegangan x akar3, pada PF 1.
export function ctAmp(point) {
  return parseInt(point.meter.ct, 10) || 0;
}
export function maxIntervalKwh(point) {
  return ((ctAmp(point) * VOLT * SQRT3) / 1000) * (INTERVAL_MIN / 60);
}

// --- Satu pembacaan utuh ------------------------------------------------
export function readingAt(point, date, shift) {
  const kw = kwAt(point, date, shift);
  return {
    pointId: point.id,
    at: new Date(date.getTime()),
    kw,
    kwh: (kw * INTERVAL_MIN) / 60,
    pf: pfAt(point, date, shift),
    missing: false,
  };
}

// --- Lapis 2: aturan validasi ------------------------------------------
// Dijalankan pada setiap pembacaan sebelum data diterima.
export const RULES = {
  counterTurun: { id: 'counter_turun', short: 'Counter turun', label: 'Penghitung kWh turun' },
  batasFisik: { id: 'batas_fisik', short: 'Di atas plafon', label: 'Melebihi batas fisik rating CT' },
  gapInterval: { id: 'gap_interval', short: 'Data hilang', label: 'Interval hilang' },
  pfRendah: { id: 'pf_rendah', short: 'PF rendah', label: 'Faktor daya di bawah ambang' },
  // aggregate: pembacaannya sendiri sah — yang jadi temuan adalah polanya,
  // jadi aturan ini hanya muncul di exception log, bukan di tiap baris ticker.
  bebanDasar: { id: 'beban_dasar', short: 'Beban dasar', label: 'Beban dasar tinggi di luar jam produksi', aggregate: true },
};

export const PF_MIN = 0.7;

export function validate(reading, point, shift) {
  const issues = [];
  if (reading.missing) issues.push(RULES.gapInterval);
  if (reading.kwh < 0) issues.push(RULES.counterTurun);
  if (reading.kwh > maxIntervalKwh(point)) issues.push(RULES.batasFisik);
  // Beban dasar hanya bermakna saat tidak ada produksi sama sekali, dan
  // sengaja diperiksa sebelum faktor daya karena inilah temuan utamanya.
  if (!reading.missing && prodFactor(reading.at, shift) === 0) {
    const ratio = point.baseKw / (point.kwhYear / 8760);
    if (ratio > 0.5) issues.push(RULES.bebanDasar);
  }
  if (!reading.missing && reading.pf < PF_MIN) issues.push(RULES.pfRendah);
  return issues;
}

// --- Momen yang bisa dilompati saat demo -------------------------------
// Jangkar: Minggu 1 Maret 2026 (hari ke-90 setelah sub-meter terpasang).
export const ANCHOR = new Date(2026, 2, 1, 2, 0, 0); // Minggu, 02:00

export const JUMPS = [
  {
    id: 'idle',
    label: 'Minggu 02:00',
    note: 'pabrik berhenti',
    date: new Date(2026, 2, 1, 2, 0, 0),
  },
  {
    id: 'ramp',
    label: 'Senin 06:00',
    note: 'shift mulai',
    date: new Date(2026, 2, 2, 6, 0, 0),
  },
  {
    id: 'peak',
    label: 'Senin 10:00',
    note: 'produksi penuh',
    date: new Date(2026, 2, 2, 10, 0, 0),
  },
];

// --- Kejadian terjadwal -------------------------------------------------
// Sengaja TIDAK acak: presenter harus tahu persis kapan tiap kejadian
// muncul supaya bisa menunjuknya saat demo.
export const SCRIPTED_EVENTS = [
  {
    day: 0, hour: 3, minute: 0, pointId: 'MIL-02', type: 'gap', intervals: 2,
    msg: 'Gateway tidak merespons — 2 interval hilang',
  },
  {
    day: 1, hour: 9, minute: 15, pointId: 'CLT-01', type: 'pf_low',
    msg: 'Faktor daya turun ke 0,66 — di bawah ambang 0,70',
  },
  {
    day: 1, hour: 14, minute: 30, pointId: 'GLV-01', type: 'spike',
    msg: 'Lonjakan 38% dibanding interval sebelumnya',
  },
];

// Kejadian yang berlaku untuk satu titik pada satu interval. Sebuah kejadian
// bisa membentang beberapa interval (mis. gateway putus 2 interval).
export function scriptedFor(pointId, date) {
  const mins = date.getHours() * 60 + date.getMinutes();
  return SCRIPTED_EVENTS.find((e) => {
    if (e.pointId !== pointId || e.day !== date.getDay()) return false;
    const start = e.hour * 60 + e.minute;
    const span = (e.intervals || 1) * INTERVAL_MIN;
    return mins >= start && mins < start + span;
  });
}

// Terapkan kejadian ke pembacaan — dipakai ticker maupun exception log.
export function applyScripted(reading, ev) {
  if (!ev) return reading;
  if (ev.type === 'gap') return { ...reading, missing: true, kwh: 0, kw: 0 };
  if (ev.type === 'pf_low') return { ...reading, pf: 0.66 };
  if (ev.type === 'spike') return { ...reading, kw: reading.kw * 1.38, kwh: reading.kwh * 1.38 };
  return reading;
}

// Satu pembacaan final: hasil simulasi + kejadian terjadwal + hasil validasi.
export function sampleAt(point, date, shift) {
  const ev = scriptedFor(point.id, date);
  const reading = applyScripted(readingAt(point, date, shift), ev);
  return { reading, ev, issues: validate(reading, point, shift) };
}

// --- Rekonsiliasi -------------------------------------------------------
// Σ sub-meter + blok belum terukur harus kembali ke angka tagihan PLN.
export function reconcile(submeter) {
  const metered = submeter.points.reduce((sum, p) => sum + p.kwhYear, 0);
  const total = metered + submeter.unmeteredKwh;
  const selisih = (total - submeter.totalPlantKwh) / submeter.totalPlantKwh;
  return {
    metered,
    unmetered: submeter.unmeteredKwh,
    total,
    tagihan: submeter.totalPlantKwh,
    selisihPct: selisih * 100,
    coveragePct: (metered / submeter.totalPlantKwh) * 100,
    tco2e: (total * submeter.emissionFactor) / 1000,
  };
}

// Konsumsi di luar jam produksi — temuan utama demo.
export function idleProfile(submeter) {
  const prodHours = (submeter.shift.prodEnd - submeter.shift.prodStart) * submeter.shift.prodDays.length;
  const idleHours = 8760 * (1 - prodHours / 168);
  const rows = submeter.points.map((p) => {
    const avgKw = p.kwhYear / 8760;
    const kwh = p.baseKw * idleHours;
    return {
      ...p,
      avgKw,
      idleKwh: kwh,
      idleRupiah: kwh * submeter.tariff,
      idleTco2e: (kwh * submeter.emissionFactor) / 1000,
      baseRatio: p.baseKw / avgKw,
    };
  });
  const totalKwh = rows.reduce((s, r) => s + r.idleKwh, 0);
  return {
    idleHours,
    rows,
    totalKwh,
    totalRupiah: totalKwh * submeter.tariff,
    totalTco2e: (totalKwh * submeter.emissionFactor) / 1000,
    sharePct: (totalKwh / rows.reduce((s, r) => s + r.kwhYear, 0)) * 100,
  };
}

// Profil 24 jam BERGULIR yang berakhir di `end`.
// Sengaja bergulir, bukan per hari kalender: saat jam simulasi berada di
// Minggu dini hari, jendela ini tetap memuat produksi hari Sabtu sehingga
// kontras antara jam produksi dan beban dasar langsung terlihat.
export function windowProfile(point, end, shift, hours = 24) {
  const n = (hours * 60) / INTERVAL_MIN;
  const start = new Date(end.getTime() - (n - 1) * INTERVAL_MIN * 60000);
  const out = [];
  for (let i = 0; i < n; i += 1) {
    const t = new Date(start.getTime() + i * INTERVAL_MIN * 60000);
    out.push({ at: t, kw: kwAt(point, t, shift), kwh: intervalKwh(point, t, shift) });
  }
  return out;
}

export const fmtClock = (d) =>
  `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

export const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const fmtDay = (d) => HARI[d.getDay()];
