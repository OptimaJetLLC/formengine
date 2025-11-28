import path from 'path'
import {fileURLToPath} from 'url'
import type {LibraryFormats} from 'vite'
import {defineConfig} from 'vite'

import base from '../../../vite.config'
import packageJson from './package.json'

const peerDependencies = (packageJson as any)['peerDependencies'] || {}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(() => ({
  ...base,
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'] satisfies LibraryFormats[],
      fileName: 'index'
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
    }
  },
}))
