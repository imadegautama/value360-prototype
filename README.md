# ISTW VALUE360 Prototype

Prototype dashboard untuk demo VALUE360 berdasarkan `PRD-Prototipe-VALUE360.md`.

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL yang diberikan Vite, biasanya `http://localhost:5173`.

## Build produksi

```bash
npm run build
```

Hasil build berada di `dist/`. Vite memakai path relatif (`base: './'`) sehingga bundle tetap portable; font visual dimuat dari Google Fonts saat koneksi tersedia dan akan jatuh ke font lokal bila tidak tersedia.

## Demo cepat

- Layar awal: Carbon Intelligence, mode `HARI INI`.
- Klik toggle header atau tekan `Space` untuk `DENGAN VALUE360`.
- Klik hotspot `Mill 1` untuk membuka detail proyek.
- Tekan `Esc` untuk menutup drawer.
- Tekan `1`–`4` untuk berpindah layar.

Semua angka prototipe berada di `src/data.js` sebagai sumber kebenaran tunggal.
