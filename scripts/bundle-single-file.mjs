// Menyatukan hasil build menjadi satu berkas dist/index.html.
//
// Browser memblokir <script type="module"> lewat protokol file:// karena CORS,
// sehingga dist/index.html hasil build biasa tampil kosong bila dibuka langsung
// dari disk. Demo di lokasi klien sering tidak punya jaringan, jadi build harus
// menghasilkan satu berkas yang bisa diklik dua kali tanpa menjalankan server.
//
// Skrip juga dipindah ke akhir <body>: tanpa type="module" skrip tidak lagi
// ditunda, jadi kalau tetap di <head> ia berjalan sebelum <div id="root"> ada.

import { readFileSync, writeFileSync, rmSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const indexPath = resolve(dist, 'index.html')

if (!existsSync(indexPath)) {
  console.error('dist/index.html tidak ditemukan — jalankan vite build lebih dulu.')
  process.exit(1)
}

let html = readFileSync(indexPath, 'utf8')
const used = []

const takeScript = (_match, src) => {
  used.push(src)
  return ''
}
const takeStyle = (_match, href) => {
  used.push(href)
  return `<style>\n${readFileSync(resolve(dist, href), 'utf8')}\n</style>`
}

const scriptRe = /[ \t]*<script\b[^>]*\bsrc="\.?\/?(assets\/[^"]+)"[^>]*><\/script>\n?/g
const styleRe = /[ \t]*<link\b[^>]*\bhref="\.?\/?(assets\/[^"]+\.css)"[^>]*>\n?/g
const preloadRe = /[ \t]*<link\b[^>]*rel="modulepreload"[^>]*>\n?/g

const scriptSrcs = [...html.matchAll(scriptRe)].map((m) => m[1])
html = html.replace(scriptRe, takeScript).replace(styleRe, takeStyle).replace(preloadRe, '')

const inline = scriptSrcs
  .map((src) => `    <script>\n${readFileSync(resolve(dist, src), 'utf8')}\n    </script>`)
  .join('\n')

// Pengganti berupa FUNGSI, bukan string: bundel ter-minify bisa memuat pola
// seperti $& atau $` yang akan ditafsirkan sebagai substitusi oleh replace()
// dan menggandakan isi berkas.
html = html.replace('</body>', () => `${inline}\n  </body>`)
writeFileSync(indexPath, html)

// Bersihkan aset yang sudah diserap, lalu buang folder assets bila kosong.
used.forEach((a) => rmSync(resolve(dist, a), { force: true }))
const assetsDir = resolve(dist, 'assets')
if (existsSync(assetsDir) && readdirSync(assetsDir).length === 0) {
  rmSync(assetsDir, { recursive: true, force: true })
}

const kb = (Buffer.byteLength(html) / 1024).toFixed(0)
console.log(`\n  dist/index.html  ${kb} kB  — satu berkas, bisa dibuka langsung dari disk\n`)
