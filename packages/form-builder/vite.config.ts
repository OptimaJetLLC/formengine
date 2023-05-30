import path from 'path'
// @ts-ignore
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
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
      entry: [path.resolve(__dirname, './index.ts'), path.resolve(__dirname, './view.ts')],
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [excludeDependenciesFromBundle({dependencies: true, peerDependencies: true})]
    }
  },
}))
