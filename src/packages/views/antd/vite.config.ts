import path from 'path'
import {fileURLToPath} from 'url'
import {mergeConfig} from 'vite'
import {defineConfig} from 'vite'

import base from '../../../vite.config'
import packageJson from './package.json'

const peerDependencies = (packageJson as any)['peerDependencies'] || {}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig((env) => mergeConfig(base(env), {
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
    }
  },
}))
