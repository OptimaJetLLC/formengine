import path from 'path'
import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'

import base from '../../vite.config'
import {peerDependencies} from './package.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const external: (string | RegExp)[] = Object.keys(peerDependencies)
external.push(/monaco-editor/)

export default defineConfig(({command}) => ({
  ...base,
  build: {
    sourcemap: false,
    lib: {
      entry: [path.resolve(__dirname, './index.ts'), path.resolve(__dirname, './view.ts')],
      formats: ['es'],
    },
    rollupOptions: {external}
  },
}))
