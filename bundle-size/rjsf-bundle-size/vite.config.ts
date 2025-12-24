import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // with this setting only the production version of React will be included in the bundle
  define: {'process.env.NODE_ENV': '"production"'},
})
