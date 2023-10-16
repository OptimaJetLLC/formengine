import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'

import base from '../../../vite.config'

export default defineConfig(({command}) => ({
  ...base,
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      plugins: [['@swc/plugin-emotion', {labelFormat: '[filename]_[local]'}]]
    }),
    svgr()
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
}))
