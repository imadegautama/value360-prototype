// Label asal-usul angka. Inilah yang membuat dashboard melakukan apa yang
// dijanjikan deck: setiap angka punya tingkat kepercayaan, bukan hanya nilai.
export const STATUS = {
  DATA: { label: 'DATA KASUS', tone: 'data', hint: 'Dari dokumen atau rekaman perusahaan' },
  TURUNAN: { label: 'TURUNAN', tone: 'turunan', hint: 'Dihitung dari angka lain yang sudah ada' },
  ASUMSI: { label: 'ASUMSI', tone: 'asumsi', hint: 'Belum divalidasi, akan dibuktikan' },
  ILUSTRATIF: { label: 'ILUSTRATIF', tone: 'ilustratif', hint: 'Contoh perhitungan, perlu data riil' },
  SIMULASI: { label: 'SIMULASI', tone: 'simulasi', hint: 'Angka simulasi untuk menunjukkan tampilan' },
  TERVERIFIKASI: { label: 'TERVERIFIKASI', tone: 'verif', hint: 'Sudah diperiksa pihak independen' },
}

// Tiga fase perjalanan. Yang berubah antar fase bukan hanya besaran angkanya,
// melainkan statusnya: kolom yang kosong perlahan terisi, dan label naik kelas.
export const PHASES = [
  { id: 'd90', label: 'Hari ke-90', long: 'Hari ke-90 (awal 2026)', metered: 5, totalPoints: 28, baseline: 'PROVISIONAL' },
  { id: 'm12', label: 'Bulan ke-12', long: 'Bulan ke-12 (akhir 2026)', metered: 5, totalPoints: 28, baseline: 'TERKUNCI' },
  { id: 'y2028', label: '2028-2030', long: '2028 sampai 2030', metered: 28, totalPoints: 28, baseline: 'TERVERIFIKASI' },
]

export const DATA = {
  meta: {
    periode: 'Simulasi Q3 2027',
    baselineTahun: 2024,
    plant: 'PT Indonesia Steel Tube Works',
  },
  dashboard: {
    periods: PHASES.map((f) => ({ id: f.id, label: f.label })),
    defaultPeriod: 'd90',
    funnelTitle: 'Stage-Gate Pipeline',
    emissionTrend: {
      title: 'Tren Emisi Scope 1+2',
      unit: 'tCO2e',
      // Baseline = angka ISTW sebenarnya: Scope 1 (1.643,27) + Scope 2 (11.789,53).
      baseline: 13432.8,
      legend: 'Emisi Scope 1+2 (tCO2e)',
      // Titik yang tampil bertambah seiring fase: di hari ke-90 hanya ada dua
      // tahun yang sah, di 2028 sudah lima.
      byPhase: {
        d90: [
          { year: '2024', label: 'Baseline', value: 13433 },
          { year: '2025', label: 'Actual', value: 13010 },
        ],
        m12: [
          { year: '2024', label: 'Baseline', value: 13433 },
          { year: '2025', label: 'Actual', value: 13010 },
          { year: '2026', label: 'Terkunci', value: 12480 },
        ],
        y2028: [
          { year: '2024', label: 'Baseline', value: 13433 },
          { year: '2025', label: 'Actual', value: 13010 },
          { year: '2026', label: 'Terkunci', value: 12480 },
          { year: '2027', label: 'Actual', value: 11920 },
          { year: '2028', label: 'Terverifikasi', value: 11180 },
        ],
      },
    },
    byPeriod: {
      d90: {
        kpi: {
          social: { icon: 'people', label: 'Social Value', value: 'Belum tersedia', empty: true, sub: 'Needs assessment selesai, 4 gate akademi terpenuhi', note: 'SROI dikunci setelah kohort berjalan 6-12 bulan' },
          carbon: { icon: 'leaf', label: 'Carbon & Energy', value: '13.432,80', unit: 'tCO2e', status: 'DATA', note: 'Baseline 2024, belum ada pengukuran tahunan baru' },
          dataQuality: { icon: 'database', label: 'Data Quality', value: '71', unit: 'DQS Score', percent: 71, status: 'TURUNAN', note: 'Lolos ambang pelaporan, belum ambang 80 untuk CAPEX' },
          financial: { icon: 'dollar', label: 'Financial Value', value: 'Belum tersedia', empty: true, sub: 'Baseline biaya belum terkunci', note: 'Penghematan baru bisa dihitung setelah baseline sah' },
          risk: { icon: 'warning', label: 'Risk', value: 'Medium Risk', sub: 'Perlu perhatian', note: '3 dari 5 risiko termitigasi', barPercent: 52 },
        },
        emission: { value: 13433, label: 'Baseline 2024', status: 'DATA' },
        funnel: {
          total: 14,
          stages: [
            { gate: 'G0', label: 'Ideation', value: 8, investasi: 0.4 },
            { gate: 'G1', label: 'Screening', value: 4, investasi: 0.6 },
            { gate: 'G2', label: 'Feasibility', value: 2, investasi: 0.3 },
            { gate: 'G3', label: 'Implementation', value: 0, investasi: 0 },
            { gate: 'G4', label: 'Impact & Scale', value: 0, investasi: 0 },
          ],
        },
      },
      m12: {
        kpi: {
          social: { icon: 'people', label: 'Social Value', value: '26 dari 30', sub: 'Lulus sertifikasi angkatan pertama', status: 'DATA', note: 'SROI menunggu horizon outcome 6-12 bulan' },
          carbon: { icon: 'leaf', label: 'Carbon & Energy', value: '12.480,00', unit: 'tCO2e', trendDir: 'down', trend: '7%', trendNote: 'dari baseline 2024', status: 'DATA' },
          dataQuality: { icon: 'database', label: 'Data Quality', value: '85', unit: 'DQS Score', percent: 85, status: 'TURUNAN', note: 'Di atas ambang keputusan CAPEX' },
          financial: { icon: 'dollar', label: 'Financial Value', value: 'Rp 0,48 M', unit: 'Net Benefit', sub: 'Payback 3,1 tahun', status: 'TURUNAN', note: 'Terhitung, belum diverifikasi independen' },
          risk: { icon: 'warning', label: 'Risk', value: 'Low-Medium Risk', sub: 'Terkendali', note: '4 dari 5 risiko termitigasi', barPercent: 78 },
        },
        emission: { value: 12480, label: 'Baseline 2026 terkunci', status: 'DATA' },
        funnel: {
          total: 38,
          stages: [
            { gate: 'G0', label: 'Ideation', value: 14, investasi: 1.1 },
            { gate: 'G1', label: 'Screening', value: 10, investasi: 2.4 },
            { gate: 'G2', label: 'Feasibility', value: 8, investasi: 4.2 },
            { gate: 'G3', label: 'Implementation', value: 5, investasi: 7.6 },
            { gate: 'G4', label: 'Impact & Scale', value: 1, investasi: 1.9 },
          ],
        },
      },
      y2028: {
        kpi: {
          social: { icon: 'people', label: 'Social Value', value: 'SROI 1:2.4', sub: '60 peserta, 38 tertempatkan', status: 'TERVERIFIKASI', trendDir: 'up', trend: '12%', trendNote: 'vs tahun sebelumnya' },
          carbon: { icon: 'leaf', label: 'Carbon & Energy', value: '11.180,00', unit: 'tCO2e', trendDir: 'down', trend: '17%', trendNote: 'dari baseline 2024', status: 'TERVERIFIKASI' },
          dataQuality: { icon: 'database', label: 'Data Quality', value: '92', unit: 'DQS Score', percent: 92, status: 'TURUNAN', note: 'Siap assurance pihak ketiga' },
          financial: { icon: 'dollar', label: 'Financial Value', value: 'Rp 1,2 M', unit: 'Net Benefit', sub: 'Payback 2,3 tahun', status: 'TERVERIFIKASI', trendDir: 'up', trend: '18%', trendNote: 'vs tahun sebelumnya' },
          risk: { icon: 'warning', label: 'Risk', value: 'Low Risk', sub: 'Under Control', note: '5 dari 5 risiko termitigasi', barPercent: 100 },
        },
        emission: { value: 11180, label: '2028 terverifikasi', status: 'TERVERIFIKASI' },
        funnel: {
          total: 65,
          stages: [
            { gate: 'G0', label: 'Ideation', value: 24, investasi: 3.6 },
            { gate: 'G1', label: 'Screening', value: 18, investasi: 6.2 },
            { gate: 'G2', label: 'Feasibility', value: 12, investasi: 9.4 },
            { gate: 'G3', label: 'Implementation', value: 7, investasi: 14.8 },
            { gate: 'G4', label: 'Impact & Scale', value: 4, investasi: 8.8 },
          ],
        },
      },
    },
  },
  sharedValueEngine: {
    byPhase: {
      d90: {
        label: 'Hari ke-90',
        kpis: [
          { icon: 'people', title: '1. Input / Activity', value: 0, sub: 'kelas belum dibuka', empty: true },
          { icon: 'certificate', title: '2. Output', value: 0, sub: 'belum ada lulusan', empty: true },
          { icon: 'briefcase', title: '3. Outcome (6-12 bulan)', value: 0, sub: 'belum ada penempatan', empty: true },
          { icon: 'target', title: '4. Impact (SROI)', value: '-', sub: 'belum bisa dihitung', empty: true },
        ],
        gates: [
          { label: 'Kebutuhan tervalidasi', done: true, note: 'Skill gap terbukti dari data HR & kontraktor' },
          { label: 'Mitra sertifikasi', done: true, note: 'BLK setempat sudah terikat' },
          { label: 'Jalur penempatan', done: true, note: 'Magang & rekrutmen internal tersedia' },
          { label: 'Manfaat terukur', done: true, note: 'Metrik outcome disepakati sebelum angkatan pertama' },
        ],
        note: 'Empat gerbang aktivasi sudah terpenuhi, jadi angkatan pertama boleh dibuka. Belum ada satu pun angka outcome, dan memang belum boleh ada.',
        trackDistribution: null,
        cohorts: [],
      },
      m12: {
        label: 'Bulan ke-12',
        kpis: [
          { icon: 'people', title: '1. Input / Activity', value: 30, sub: 'peserta terdaftar', status: 'DATA', spark: [0, 0, 0.2, 0.4, 0.6, 0.8, 0.9, 1] },
          { icon: 'certificate', title: '2. Output', value: 26, sub: 'lulus sertifikasi', status: 'DATA', spark: [0, 0, 0, 0.3, 0.5, 0.7, 0.85, 1] },
          { icon: 'briefcase', title: '3. Outcome (6-12 bulan)', value: 0, sub: 'horizon belum tercapai', empty: true },
          { icon: 'target', title: '4. Impact (SROI)', value: '-', sub: 'menunggu data outcome', empty: true },
        ],
        note: 'Angkatan pertama selesai, tetapi outcome dan SROI baru sah setelah lulusan dilacak enam sampai dua belas bulan.',
        trackDistribution: {
          total: 30,
          segments: [
            { label: 'Green Maintenance & Energy Efficiency', percent: 100, count: 30, tone: 'dark' },
          ],
          banner: 'Green Maintenance didahulukan. SteelSkill menyusul setelah kebutuhannya tervalidasi.',
        },
        cohorts: [
          { name: 'Green Maintenance Cohort 2026-1', track: 'Green Maintenance & Energy Efficiency', period: '1 Sep - 30 Nov 2026', participants: 30, completion: 87, placement: 0, status: 'Selesai', biaya: 185000000, pendapatanAwal: 2650000, terlacak: null, horizonOutcome: 'Mei 2027' },
        ],
      },
      y2028: {
        label: '2028-2030',
        kpis: [
          { icon: 'people', title: '1. Input / Activity', value: 60, sub: 'peserta terdaftar', status: 'DATA', spark: [0.3, 0.5, 0.35, 0.6, 0.5, 0.7, 0.55, 0.85] },
          { icon: 'certificate', title: '2. Output', value: 52, sub: 'lulus sertifikasi', status: 'DATA', spark: [0.4, 0.3, 0.55, 0.4, 0.65, 0.5, 0.75, 0.9] },
          { icon: 'briefcase', title: '3. Outcome (6-12 bulan)', value: 38, sub: 'ditempatkan kerja', status: 'DATA', spark: [0.25, 0.45, 0.3, 0.55, 0.4, 0.6, 0.5, 0.8] },
          { icon: 'target', title: '4. Impact (SROI)', value: '1:2.4', sub: 'SROI terverifikasi', status: 'TERVERIFIKASI', spark: [0.35, 0.5, 0.4, 0.65, 0.55, 0.75, 0.6, 0.9] },
        ],
        note: 'Tangga outcome lengkap. Anak tangga ketiga dan keempat, yang hari ini tidak pernah dinaiki, sudah punya angkanya.',
        sroi: {
          ratio: '1:2.4',
          note: 'Setiap Rp1 investasi menghasilkan Rp2,4 nilai sosial',
          stats: [
            { icon: 'coins', label: 'Total Investasi', value: 'Rp 1,85 M', trend: 9 },
            { icon: 'people', label: 'Total Nilai Sosial', value: 'Rp 4,44 M', trend: 11 },
            { icon: 'trend', label: 'Net Social Value', value: 'Rp 2,59 M', trend: 13 },
          ],
          banner: 'Sudah dikurangi deadweight 30% dan attribution 50%, lalu diverifikasi pihak independen.',
        },
        trackDistribution: {
          total: 60,
          segments: [
            { label: 'Green Maintenance & Energy Efficiency', percent: 60, count: 36, tone: 'dark' },
            { label: 'Las & Fabrikasi Baja (SteelSkill)', percent: 40, count: 24, tone: 'light' },
          ],
          banner: 'Green Maintenance tetap mayoritas. SteelSkill dibuka setelah demand tervalidasi.',
        },
        cohorts: [
          { name: 'Green Maintenance Cohort 2027-1', track: 'Green Maintenance & Energy Efficiency', period: '1 Feb - 30 Apr 2027', participants: 18, completion: 94, placement: 78, status: 'Selesai', biaya: 118000000, pendapatanAwal: 2700000, pendapatanAkhir: 4150000, terlacak: 16, horizonOutcome: 'Okt 2027' },
          { name: 'SteelSkill Cohort 2027-1', track: 'Las & Fabrikasi Baja', period: '1 Jun - 31 Agu 2027', participants: 24, completion: 83, placement: 63, status: 'Selesai', biaya: 162000000, pendapatanAwal: 2580000, pendapatanAkhir: 3920000, terlacak: 20, horizonOutcome: 'Feb 2028' },
          { name: 'Green Maintenance Cohort 2028-1', track: 'Green Maintenance & Energy Efficiency', period: '1 Feb - 30 Apr 2028', participants: 18, completion: 89, placement: 56, status: 'Berjalan', biaya: 124000000, pendapatanAwal: 2810000, terlacak: 11, horizonOutcome: 'Okt 2028' },
        ],
      },
    },
  },
  carbonIntelligence: {
    // axisMax diturunkan dari data di komponen, bukan dikunci di sini.
    hotspotUnits: {
      kwh: { id: 'kwh', label: 'kWh' },
      tco2e: { id: 'tco2e', label: 'tCO2e' },
    },
    co2Factor: 0.85,
    byPhase: {
      d90: {
        scopes: [
          { icon: 'factory', label: 'Scope 1', value: '1.643,27', unit: 'tCO2e', percent: '12,2%', note: 'baseline 2024', status: 'DATA' },
          { icon: 'bolt', label: 'Scope 2', value: '11.789,53', unit: 'tCO2e', percent: '87,8%', note: 'baseline 2024', status: 'DATA', priority: true },
          { icon: 'share', label: 'Scope 3', value: 'Belum terkuantifikasi', sub: '(screening belum dimulai)', percent: '-', note: '4 dari 15 kategori dilaporkan sejak 2025, tonase belum diungkap' },
        ],
        areas: [
          { area: 'Mill 1', kwh: 2346189 },
          { area: 'Mill 2', kwh: 1980000 },
          { area: 'Galva 1', kwh: 1150000 },
          { area: 'Compressor', kwh: 1025340 },
          { area: 'Cooling Tower', kwh: 748612 },
          { area: '23 titik belum terukur', kwh: 6619894, estimated: true },
        ],
        areasNote: 'Lima batang pertama diukur sub-meter selama 90 hari. Blok terakhir adalah selisih terhadap tagihan PLN, yaitu 23 titik yang belum punya alamat.',
        portfolioNote: 'Peringkat sementara dari 90 hari pengukuran. Belum ada proyek yang lolos G3, jadi belum ada CAPEX yang keluar.',
        dqs: {
          score: 71,
          dims: [
            { icon: 'checkCircle', label: 'Completeness', value: 88 },
            { icon: 'clock', label: 'Timeliness', value: 92 },
            { icon: 'link', label: 'Traceability', value: 84 },
            { icon: 'target', label: 'Measurement method', value: 76 },
            { icon: 'shield', label: 'Approval', value: 15 },
          ],
          note: 'Approval masih rendah karena baru satu periode yang disetujui pemilik data.',
        },
      },
      m12: {
        scopes: [
          { icon: 'factory', label: 'Scope 1', value: '1.520,00', unit: 'tCO2e', percent: '12,2%', note: 'baseline 2026 terkunci', status: 'DATA' },
          { icon: 'bolt', label: 'Scope 2', value: '10.960,00', unit: 'tCO2e', percent: '87,8%', note: 'baseline 2026 terkunci', status: 'DATA', priority: true },
          { icon: 'share', label: 'Scope 3', value: '15 kategori', sub: 'ter-screening, 4 terkuantifikasi', percent: '-', note: 'Kategori material didalami lebih dulu' },
        ],
        areas: [
          { area: 'Mill 1', kwh: 2290000 },
          { area: 'Mill 2', kwh: 1935000 },
          { area: 'Galva 1', kwh: 1120000 },
          { area: 'Compressor', kwh: 905000 },
          { area: 'Cooling Tower', kwh: 702000 },
          { area: '23 titik belum terukur', kwh: 5942118, estimated: true },
        ],
        areasNote: 'Data 12 bulan penuh untuk lima titik. Konsumsi Compressor turun setelah perbaikan kebocoran.',
        portfolioNote: 'Portofolio terurut dari biaya abatement termurah. Yang bernilai negatif dikerjakan lebih dulu.',
        dqs: {
          score: 85,
          dims: [
            { icon: 'checkCircle', label: 'Completeness', value: 94 },
            { icon: 'clock', label: 'Timeliness', value: 93 },
            { icon: 'link', label: 'Traceability', value: 88 },
            { icon: 'target', label: 'Measurement method', value: 82 },
            { icon: 'shield', label: 'Approval', value: 68 },
          ],
          note: 'Sudah di atas ambang 80, jadi angkanya boleh mendukung keputusan CAPEX.',
        },
      },
      y2028: {
        scopes: [
          { icon: 'factory', label: 'Scope 1', value: '1.360,00', unit: 'tCO2e', percent: '12,2%', note: 'terverifikasi independen', status: 'TERVERIFIKASI' },
          { icon: 'bolt', label: 'Scope 2', value: '9.820,00', unit: 'tCO2e', percent: '87,8%', note: 'terverifikasi independen', status: 'TERVERIFIKASI', priority: true },
          { icon: 'share', label: 'Scope 3', value: 'Data primer', sub: 'pemasok menggantikan estimasi', percent: '-', note: 'Kategori 1, 4, 6, 9 memakai data pemasok' },
        ],
        areas: [
          { area: 'Mill 1', kwh: 1820000 },
          { area: 'Mill 2', kwh: 1540000 },
          { area: 'Welding 1 & 2', kwh: 1310000 },
          { area: 'Galva 1 & 2', kwh: 1180000 },
          { area: 'Cutting & Facing', kwh: 980000 },
          { area: 'Compressor', kwh: 620000 },
          { area: 'Cooling Tower', kwh: 540000 },
          { area: 'IPAL & Water Supply', kwh: 460000 },
          { area: '20 titik lainnya', kwh: 3102941 },
        ],
        areasNote: 'Seluruh 28 titik sudah terukur. Tidak ada lagi blok yang belum punya alamat.',
        portfolioNote: 'Hasil pilot sudah diverifikasi pihak independen. Perluasan hanya untuk yang lolos G4.',
        dqs: {
          score: 92,
          dims: [
            { icon: 'checkCircle', label: 'Completeness', value: 97 },
            { icon: 'clock', label: 'Timeliness', value: 95 },
            { icon: 'link', label: 'Traceability', value: 93 },
            { icon: 'target', label: 'Measurement method', value: 90 },
            { icon: 'shield', label: 'Approval', value: 85 },
          ],
          note: 'Siap diperiksa pihak ketiga tanpa persiapan dadakan.',
        },
      },
    },
  },
  governance: {
    // Lima dimensi ini sengaja sama persis dengan scorecard kuartalan di deck.
    byPhase: {
      d90: {
        scorecard: [['Social Value', 40], ['Carbon & Energy', 35], ['Data Quality', 71], ['Financial Value', 0], ['Risk', 52]],
        scorecardNote: 'Financial Value sengaja nol, bukan buruk. Baseline biayanya memang belum sah.',
        auditCompliance: { value: 42, trend: '-', trendNote: 'periode pertama' },
        operatingModel: [
          { pihak: 'Data Owner', peran: 'R · A', cakupan: 'Kualitas data, traceability, dan sumber pengukuran', status: 'Baru ditunjuk' },
          { pihak: 'ESG Steering Committee', peran: 'A · C', cakupan: 'Keputusan gerbang dan ambang DQS', status: 'Baru dibentuk' },
          { pihak: 'Finance + HSE', peran: 'C · I', cakupan: 'Validasi CAPEX dan risiko keselamatan', status: 'Terlibat' },
          { pihak: 'Internal Audit', peran: 'I', cakupan: 'Audit trail dan kepatuhan tiap kuartal', status: 'Belum mulai' },
        ],
      },
      m12: {
        scorecard: [['Social Value', 62], ['Carbon & Energy', 71], ['Data Quality', 85], ['Financial Value', 64], ['Risk', 78]],
        scorecardNote: 'Baseline 2026 terkunci, sehingga empat dari lima dimensi sudah punya angka yang sah.',
        auditCompliance: { value: 81, trend: '39%', trendNote: 'vs periode pertama' },
        operatingModel: [
          { pihak: 'Data Owner', peran: 'R · A', cakupan: 'Kualitas data, traceability, dan sumber pengukuran', status: 'Aktif' },
          { pihak: 'ESG Steering Committee', peran: 'A · C', cakupan: 'Keputusan gerbang dan ambang DQS', status: 'Aktif' },
          { pihak: 'Finance + HSE', peran: 'C · I', cakupan: 'Validasi CAPEX dan risiko keselamatan', status: 'Aktif' },
          { pihak: 'Internal Audit', peran: 'I', cakupan: 'Audit trail dan kepatuhan tiap kuartal', status: 'Terjadwal' },
        ],
      },
      y2028: {
        scorecard: [['Social Value', 88], ['Carbon & Energy', 86], ['Data Quality', 92], ['Financial Value', 84], ['Risk', 94]],
        scorecardNote: 'Kelima dimensi sudah terisi dan sudah melewati pemeriksaan pihak independen.',
        auditCompliance: { value: 96, trend: '15%', trendNote: 'vs bulan ke-12' },
        operatingModel: [
          { pihak: 'Data Owner', peran: 'R · A', cakupan: 'Kualitas data, traceability, dan sumber pengukuran', status: 'Aktif' },
          { pihak: 'ESG Steering Committee', peran: 'A · C', cakupan: 'Keputusan gerbang dan ambang DQS', status: 'Aktif' },
          { pihak: 'Finance + HSE', peran: 'C · I', cakupan: 'Validasi CAPEX dan risiko keselamatan', status: 'Aktif' },
          { pihak: 'Internal Audit', peran: 'I', cakupan: 'Audit trail dan kepatuhan tiap kuartal', status: 'Aktif' },
        ],
      },
    },
    // Lima risiko yang dijanjikan di deck. Tiga ada di slide utama, dua sisanya
    // selama ini hanya disebut "ada di lampiran" tanpa pernah ditulis.
    risks: [
      { nama: 'Mismatch kebutuhan skill', mitigasi: 'Demand validation 60-90 hari sebelum kelas pertama dibuka', byPhase: { d90: 'Termitigasi', m12: 'Termitigasi', y2028: 'Termitigasi' } },
      { nama: 'Kesiapan API / sensor', mitigasi: 'Integrasi bertahap, mulai dari controlled template', byPhase: { d90: 'Termitigasi', m12: 'Termitigasi', y2028: 'Termitigasi' } },
      { nama: 'Overclaim SROI / ROI', mitigasi: 'Independent check untuk seluruh metrik material', byPhase: { d90: 'Dipantau', m12: 'Dipantau', y2028: 'Termitigasi' } },
      { nama: 'Kapasitas SDM (peran topi tambahan)', mitigasi: 'Lingkup dibatasi lima titik, plafon jam kerja disepakati di muka', byPhase: { d90: 'Dipantau', m12: 'Termitigasi', y2028: 'Termitigasi' } },
      { nama: 'Pergantian sponsor / hilangnya momentum', mitigasi: 'Kadens scorecard kuartalan dan artefak yang bisa diperiksa tiap fase', byPhase: { d90: 'Terbuka', m12: 'Dipantau', y2028: 'Termitigasi' } },
    ],
  },
}

// --- Lapis 1 & 2 Carbon Intelligence: sumber data sub-meter -------------
// Lima titik prioritas dari 28 titik yang sudah ISTW daftarkan.
// kwhYear dipilih agar rekonsiliasi kembali ke Scope 2 = 11.789,53 tCO2e
// pada faktor emisi 0,85 kgCO2e/kWh (total pabrik 13.870.035 kWh/tahun).
// Rating CT dihitung dari I = P / (akar3 x 380 V x PF), dibulatkan ke atas.
export const SUBMETER = {
  emissionFactor: 0.85,
  tariff: 1200,              // Rp/kWh - ASUMSI, wajib dikonfirmasi ke rekening ISTW
  totalPlantKwh: 13870035,   // turunan: 11.789,53 / 0,85 x 1000
  shift: { prodDays: [1, 2, 3, 4, 5, 6], prodStart: 6, prodEnd: 22 },
  points: [
    {
      id: 'MIL-01', nama: 'Mill 1', zona: 'A - Produk Inti',
      kwhYear: 2346189, baseKw: 45, peakKw: 435, pf: 0.89,
      owner: 'Manager Produksi', steward: 'Supervisor Line 1',
      meter: { serial: 'PM-2041', ct: '1000/5', commissioned: '18 Feb 2026' },
      catatan: 'Beban mengikuti produksi - profil sehat.',
    },
    {
      id: 'MIL-02', nama: 'Mill 2', zona: 'A - Produk Inti',
      kwhYear: 1980000, baseKw: 40, peakKw: 366, pf: 0.88,
      owner: 'Manager Produksi', steward: 'Supervisor Line 2',
      meter: { serial: 'PM-2042', ct: '800/5', commissioned: '18 Feb 2026' },
      catatan: 'Pembanding Mill 1 - selisih kWh per ton jadi temuan langsung.',
    },
    {
      id: 'CMP-01', nama: 'Compressor', zona: 'B - Utilitas',
      kwhYear: 1025340, baseKw: 72, peakKw: 151, pf: 0.84,
      owner: 'Manager Maintenance', steward: 'Facility Data Steward',
      meter: { serial: 'PM-2043', ct: '400/5', commissioned: '20 Feb 2026' },
      catatan: 'Beban dasar 62% dari rata-rata - indikasi kebocoran udara.',
    },
    {
      id: 'CLT-01', nama: 'Cooling Tower', zona: 'B - Utilitas',
      kwhYear: 748612, baseKw: 48, peakKw: 114, pf: 0.86,
      owner: 'Manager Maintenance', steward: 'Facility Data Steward',
      meter: { serial: 'PM-2044', ct: '250/5', commissioned: '20 Feb 2026' },
      catatan: 'Pompa dan kipas berjalan terus - kandidat VSD.',
    },
    {
      id: 'GLV-01', nama: 'Galva 1', zona: 'C - Finishing',
      kwhYear: 1150000, baseKw: 95, peakKw: 159, pf: 0.91,
      owner: 'Manager Finishing', steward: 'Supervisor Galvanis',
      meter: { serial: 'PM-2045', ct: '400/5', commissioned: '21 Feb 2026' },
      catatan: 'Beban termal tinggi - cek juga konsumsi gas (Scope 1).',
    },
  ],
  unmeteredKwh: 6619894,     // 23 titik sisanya, 47,7% - belum punya alamat
  unmeteredCount: 23,
  totalPoints: 28,
}

// Rupiah ringkas untuk angka besar: 1.351.542.857 -> "Rp 1,35 miliar"
export const compactRp = (value) => {
  if (value >= 1e9) return `Rp ${number(value / 1e9, 2)} miliar`
  if (value >= 1e6) return `Rp ${number(value / 1e6, 0)} juta`
  return money(value)
}

// --- Registri proyek & mesin hitung ------------------------------------
// Ekonomi proyek TIDAK di-hardcode. Semuanya diturunkan dari kWh yang
// dihemat, memakai tarif dan faktor emisi yang sama dengan SUBMETER, lewat
// tiga formula yang sama persis dengan slide "Jual Mesin, Bukan Angka".
export function projectEconomics(pr) {
  const listrik = pr.kwhSaved * SUBMETER.tariff
  const tco2e = (pr.kwhSaved * SUBMETER.emissionFactor) / 1000
  const anb = listrik + (pr.hematProses || 0) + (pr.nilaiHr || 0) + (pr.pajak || 0) - pr.opexTahunan
  return {
    listrik,
    tco2e,
    anb,
    payback: pr.capex / anb,            // initial investment / annual net benefit
    abatement: -anb / tco2e,            // net annual cost / tCO2e avoided
  }
}

// Empat anak tangga outcome untuk satu kohort, diturunkan dari field kohort.
// Ini padanan Lapis 1 & 2 untuk jalur sosial: tiap tangga punya sumber,
// pemilik, frekuensi, dan cara datanya masuk.
export function cohortLadder(c) {
  const lulus = Math.round((c.participants * c.completion) / 100)
  const tempat = Math.round((c.participants * c.placement) / 100)
  const naik = c.pendapatanAkhir ? c.pendapatanAkhir - c.pendapatanAwal : null
  const belumTerlacak = c.terlacak == null ? null : c.participants - c.terlacak
  return [
    {
      rung: 1, label: 'Input / Activity',
      nilai: `${c.participants} peserta terdaftar`,
      detail: `Biaya program ${c.biaya ? Math.round(c.biaya / 1e6) + ' juta' : '-'} · pendapatan awal rata-rata ${Math.round(c.pendapatanAwal / 1e3)} rb/bulan`,
      sumber: 'Form pendaftaran + data Finance',
      owner: 'HR / CSR Head',
      kapan: 'Sekali, saat kelas dibuka',
      status: 'terisi',
      catatan: 'Pendapatan awal wajib direkam di sini. Kalau terlewat, SROI tidak akan punya pembanding dan tidak bisa diperbaiki belakangan.',
    },
    {
      rung: 2, label: 'Output',
      nilai: `${lulus} lulus, ${lulus} tersertifikasi`,
      detail: `Completion rate ${c.completion}%`,
      sumber: 'Lembaga sertifikasi (BLK / politeknik)',
      owner: 'HR',
      kapan: 'Akhir kelas',
      status: 'terisi',
      catatan: 'Sertifikat diterbitkan pihak ketiga, jadi keterlacakannya tinggi.',
    },
    {
      rung: 3, label: 'Outcome (6-12 bulan)',
      nilai: c.placement ? `${tempat} tertempatkan (${c.placement}%)` : `Menunggu horizon, jatuh tempo ${c.horizonOutcome}`,
      detail: belumTerlacak == null
        ? 'Pelacakan alumni belum dimulai'
        : `${c.terlacak} dari ${c.participants} alumni terlacak, ${belumTerlacak} belum`,
      sumber: 'Survei alumni + konfirmasi pemberi kerja',
      owner: 'HR',
      kapan: 'Bulan ke-6 dan ke-12 setelah lulus',
      status: c.placement ? 'terisi' : 'menunggu',
      catatan: 'Alumni yang tidak terlacak dihitung sebagai TIDAK tertempatkan, bukan dikeluarkan dari perhitungan. Ini mencegah angka terlihat bagus hanya karena yang gagal hilang dari survei.',
    },
    {
      rung: 4, label: 'Impact (SROI)',
      nilai: naik ? `Pendapatan naik ${Math.round(naik / 1e3)} rb/bulan` : 'Belum bisa dihitung',
      detail: naik
        ? `Dari ${Math.round(c.pendapatanAwal / 1e3)} rb menjadi ${Math.round(c.pendapatanAkhir / 1e3)} rb, sebelum deadweight dan attribution`
        : 'Pembanding belum ada karena outcome belum terkumpul',
      sumber: 'Survei pendapatan, dua titik waktu',
      owner: 'CSR + ESG Lead',
      kapan: 'Saat daftar, lalu 6-12 bulan setelah lulus',
      status: naik ? 'terisi' : 'menunggu',
      catatan: 'Masih harus dikurangi deadweight dan attribution sebelum menjadi SROI.',
    },
  ]
}

export const GATES = [
  { id: 'G0', nama: 'Problem Fit', tanya: 'Masalahnya cukup besar dan relevan?', bukti: 'Baseline awal + bukti pemangku kepentingan' },
  { id: 'G1', nama: 'Data Fit', tanya: 'Angkanya bisa dipakai bertaruh?', bukti: 'Skor DQS, nama data owner, source evidence' },
  { id: 'G2', nama: 'Technical Fit', tanya: 'Bisa dikerjakan tanpa mengganggu operasi?', bukti: 'Engineering assessment, data IoT' },
  { id: 'G3', nama: 'Value Fit & CAPEX', tanya: 'Ekonominya masuk?', bukti: 'tCO2e avoided, CAPEX-OPEX, payback' },
  { id: 'G4', nama: 'Scale Fit', tanya: 'Hasil pilot konsisten dan risikonya terkendali?', bukti: 'Tren KPI terverifikasi + lessons learned' },
]

const PR = {
  bocor: { id: 'P-01', nama: 'Perbaikan kebocoran udara', titik: 'CMP-01 Compressor', kwhSaved: 185000, capex: 85000000, hematProses: 8000000, opexTahunan: 12000000, owner: 'Manager Maintenance' },
  idle: { id: 'P-02', nama: 'Idle-load reduction akhir pekan', titik: 'CMP-01, CLT-01, GLV-01', kwhSaved: 110000, capex: 35000000, hematProses: 5000000, opexTahunan: 4000000, owner: 'Manager Maintenance' },
  vsdKomp: { id: 'P-03', nama: 'Kompresor VSD', titik: 'CMP-01 Compressor', kwhSaved: 375000, capex: 1200000000, hematProses: 25000000, nilaiHr: 15000000, opexTahunan: 60000000, owner: 'Manager Maintenance' },
  led: { id: 'P-04', nama: 'LED Retrofit area produksi', titik: 'Zona D', kwhSaved: 95000, capex: 260000000, nilaiHr: 6000000, opexTahunan: 9000000, owner: 'Manager Produksi' },
  vsdCt: { id: 'P-05', nama: 'VSD pompa Cooling Tower', titik: 'CLT-01 Cooling Tower', kwhSaved: 135000, capex: 340000000, hematProses: 6000000, opexTahunan: 14000000, owner: 'Manager Maintenance' },
  plts: { id: 'P-06', nama: 'Panel Surya Perluasan', titik: 'Atap gedung produksi', kwhSaved: 620000, capex: 2850000000, opexTahunan: 96000000, owner: 'Manager Engineering' },
  meter2: { id: 'P-07', nama: 'Sub-metering gelombang 2', titik: '23 titik sisa', kwhSaved: 0, capex: 195000000, opexTahunan: 0, owner: 'Facility Data Steward', diagnostic: true },
  jadwalGalva: { id: 'P-08', nama: 'Optimasi jadwal Galva', titik: 'GLV-01 Galva 1', kwhSaved: 72000, capex: 0, opexTahunan: 0, owner: 'Manager Finishing' },
}

// gate = posisi proyek saat ini pada fase tersebut.
export const PROJECTS = {
  d90: [
    { ...PR.bocor, gate: 'G1', estimasi: true },
    { ...PR.idle, gate: 'G1', estimasi: true },
    { ...PR.jadwalGalva, gate: 'G0', estimasi: true },
    { ...PR.vsdCt, gate: 'G0', estimasi: true },
    { ...PR.meter2, gate: 'G2', estimasi: true },
  ],
  m12: [
    { ...PR.bocor, gate: 'G3' },
    { ...PR.idle, gate: 'G3' },
    { ...PR.vsdKomp, gate: 'G3' },
    { ...PR.led, gate: 'G3' },
    { ...PR.vsdCt, gate: 'G2' },
    { ...PR.plts, gate: 'G2' },
  ],
  y2028: [
    { ...PR.bocor, gate: 'G4' },
    { ...PR.idle, gate: 'G4' },
    { ...PR.vsdKomp, gate: 'G4' },
    { ...PR.led, gate: 'G4' },
    { ...PR.vsdCt, gate: 'G3' },
    { ...PR.plts, gate: 'G3' },
    { ...PR.meter2, gate: 'G4' },
  ],
}

export const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
export const number = (value, digits = 0) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
