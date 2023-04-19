import path from 'path'
import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'

import base from '../../../vite.config'
import {peerDependencies} from './package.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({command}) => ({
  ...base,
  build: {
    sourcemap: false,
    lib: {
      //entry: [path.resolve(__dirname, 'src/metaView.ts'), path.resolve(__dirname, 'src/modelView.ts')],
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      //fileName: 'index'
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
    }
  },
}))
