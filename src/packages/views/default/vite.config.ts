import path from 'path'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import {fileURLToPath} from 'url'
import {defineConfig, mergeConfig} from 'vite'

import base from '../../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig((env) => mergeConfig(base(env), {
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [excludeDependenciesFromBundle({dependencies: true, peerDependencies: true})],
    }
  },
}))
