import path from 'path'
// @ts-ignore
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import {fileURLToPath} from 'url'
import type {LibraryFormats} from 'vite'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(() => ({
  ...base,
  plugins: [
    dts({rollupTypes: true, tsconfigPath: './bundle.tsconfig.json'}),
    svgr({
      include: '**/*.svg',
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      formats: ['es'] satisfies LibraryFormats[],
      fileName: 'index'
    },
    rollupOptions: {
      plugins: [
        excludeDependenciesFromBundle({dependencies: true, peerDependencies: true})
      ]
    }
  },
}))
