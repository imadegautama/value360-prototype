import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 1000000,
    // IIFE, bukan ESM, supaya bundel bisa di-inline sebagai skrip klasik dan
    // dibuka langsung dari file:// (lihat scripts/bundle-single-file.mjs).
    rollupOptions: { output: { format: 'iife' } },
  },
})
