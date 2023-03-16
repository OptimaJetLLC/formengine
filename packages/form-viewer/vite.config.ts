import react from '@vitejs/plugin-react'
import path from 'path'
import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'

import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({command}) => ({
  ...base,
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'form-viewer',
      formats: ['es', 'umd'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          'react': 'React',
        }
      }
    }
  },
}))
