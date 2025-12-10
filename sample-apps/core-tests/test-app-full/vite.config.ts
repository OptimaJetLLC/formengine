import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {analyzer} from 'vite-bundle-analyzer'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    analyzer({
      analyzerMode: 'json',
      summary: false,
      openAnalyzer: false,
      fileName: 'stats-full',
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'TestFull',
      fileName: 'full',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@fluent/bundle'],
    },
  }/*,
  resolve: {
    alias: {
      // Use the full entry point
      '@react-form-builder/core': path.resolve(__dirname, '../../../src/packages/core/src/index.ts'),
    },
  },*/
})

