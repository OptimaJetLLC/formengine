import react from '@vitejs/plugin-react'
import path from 'path'
import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({command}) => ({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: [["@emotion/babel-plugin", { "labelFormat": "[filename]_[local]" }]],
    },
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'scripts/test/setup.ts')]
  },
}))
