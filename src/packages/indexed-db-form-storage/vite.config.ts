import path from 'path'
// @ts-ignore
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import {fileURLToPath} from 'url'
import type {LibraryFormats} from 'vite'
import {defineConfig} from 'vite'

import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(() => ({
  ...base,
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      formats: ['es'] satisfies LibraryFormats[],
    },
    rollupOptions: {
      plugins: [excludeDependenciesFromBundle({dependencies: true, peerDependencies: true})],
    },
  },
}))
