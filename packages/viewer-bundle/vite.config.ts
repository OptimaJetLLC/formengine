import path from 'path'
// @ts-ignore
import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'

import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({command}) => {
  return ({
    ...base,
    // with this setting only the production version of React will be included in the bundle
    define: {'process.env.NODE_ENV': '"production"'},
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['umd'],
        fileName: format => `index.${format}.js`,
        name: 'FormEngineViewerBundle',
      },
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'react-is'],
    },
  })
})
