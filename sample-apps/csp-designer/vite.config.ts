import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Some dependencies ship CSS with nested rules and an in-rule `@font-face`, which Lightning CSS rejects during minification.
    // esbuild is more tolerant here and matches older Vite behavior.
    cssMinify: 'esbuild',
  },
})
