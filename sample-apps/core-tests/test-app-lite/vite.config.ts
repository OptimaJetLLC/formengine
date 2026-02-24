import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import {defineConfig} from 'vite'
import {analyzer} from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    react(),
    analyzer({
      analyzerMode: 'json',
      summary: false,
      openAnalyzer: false,
      fileName: 'stats-lite',
    }),
  ],
  build: {
    minify: 'terser',
    outDir: path.resolve(__dirname, '../dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'TestLite',
      fileName: 'lite',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-is'],
    },
  }/*,
  resolve: {
    alias: {
      // Use the lite entry point for proper tree-shaking
      '@react-form-builder/core': path.resolve(__dirname, '../../../src/packages/core/src/index-lite.ts'),
    },
  },*/
})

