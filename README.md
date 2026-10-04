# ISTW VALUE360 Prototype

Prototipe dashboard untuk demo VALUE360 di hadapan manajemen ISTW.

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL yang diberikan Vite, biasanya `http://localhost:5173`.

## Build untuk demo

```bash
npm run build
```

Menghasilkan **satu berkas** `dist/index.html` (±284 kB) dengan seluruh JS dan CSS
di dalamnya. Berkas itu bisa diklik dua kali dan dibuka langsung dari disk tanpa
menjalankan server — penting karena lokasi demo sering tidak punya jaringan.

Alasan teknisnya ada di `scripts/bundle-single-file.mjs`: browser memblokir
`<script type="module">` lewat protokol `file://`, jadi bundel dikeluarkan dalam
format IIFE lalu ditanam di akhir `<body>`.

Font visual dimuat dari Google Fonts bila ada koneksi, dan jatuh ke font lokal
bila tidak.

## Tiga fase

Pemilih di kanan atas berpindah antara **Hari ke-90**, **Bulan ke-12**, dan
**2028-2030**. Yang berubah bukan hanya besaran angkanya, melainkan statusnya:
kolom yang kosong perlahan terisi, dan label asal-usul angka naik kelas dari
`DATA KASUS` menjadi `TURUNAN` lalu `TERVERIFIKASI`.

| | Hari ke-90 | Bulan ke-12 | 2028-2030 |
|---|---|---|---|
| Titik terukur | 5 dari 28 | 5 dari 28 | 28 dari 28 |
| Baseline | provisional | terkunci | terverifikasi |
| SROI | belum tersedia | belum tersedia | 1:2.4 |
| Net Benefit | belum tersedia | Rp 0,48 M | Rp 1,2 M |
| DQS | 71 | 85 | 92 |

## Alur demo

| Aksi | Hasil |
|---|---|
| Tekan `1`-`4` | Berpindah layar |
| Tekan `←` `→` | Melangkah antar fase |
| Tekan `Space` | Beralih `HARI INI` dan `DENGAN VALUE360` |
| Klik **Minggu 02:00** | Pabrik berhenti, beban dasar terlihat, exception muncul |
| Klik **Senin 10:00** | Produksi penuh, Mill 1 naik ke sekitar 435 kW |
| Klik kartu titik | Drawer: profil beban 24 jam, beban dasar, bukti sumber |
| Klik gerbang di funnel | Daftar proyek di gerbang itu |
| Klik baris portofolio | Mesin hitung proyek: tiga formula dengan inputnya |
| Tekan `Esc` | Menutup drawer |

Dua urutan yang paling kuat. Pertama, buka Carbon Intelligence dalam mode
`HARI INI` (lima titik terdaftar tanpa satu pun angka kWh), lalu nyalakan
`DENGAN VALUE360` dan lompat ke **Minggu 02:00**. Kedua, berdiri di Dashboard
lalu tekan `→` dua kali: kolom yang kosong terisi satu per satu.

## Struktur

| Berkas | Isi |
|---|---|
| `src/data.js` | Seluruh angka prototipe. Sumber kebenaran tunggal. |
| `src/sim.js` | Mesin simulasi sub-meter: generator interval, aturan validasi, kejadian terjadwal. |
| `src/main.jsx` | Seluruh komponen dan empat layar. |
| `src/styles.css` | Seluruh gaya. |
| `scripts/bundle-single-file.mjs` | Pasca-build: menyatukan dist menjadi satu berkas. |

## Catatan angka

Angka yang berasal dari studi kasus ISTW dan **tidak boleh diubah**:

- Scope 1 = 1.643,27 tCO₂e · Scope 2 = 11.789,53 tCO₂e · total 2024 = 13.432,80 tCO₂e
- 28 titik konsumsi listrik terdaftar, lima di antaranya menjadi kandidat prioritas

Angka sub-meter di `SUBMETER` disusun agar **rekonsiliasi kembali** ke Scope 2:
konsumsi lima titik (7.250.141 kWh) ditambah 23 titik yang belum terukur
(6.619.894 kWh) sama dengan 13.870.035 kWh, dan dikalikan faktor emisi 0,85
menghasilkan tepat 11.789,53 tCO₂e. Kalau salah satu angka diubah, ketiganya
harus dihitung ulang.

Simulasi bersifat **deterministik** terhadap (titik, timestamp) — tidak memakai
`Math.random`, sehingga demo yang diulang selalu menghasilkan angka yang sama.

Sisanya adalah angka ilustratif untuk menunjukkan bentuk tampilan, bukan angka
ISTW. Lihat catatan kaki di setiap layar.
