import react from '@vitejs/plugin-react'
import {mergeConfig} from 'vite'
import svgr from 'vite-plugin-svgr'

import bundleSizeBase from '../vite.config.ts'

export default () =>
  mergeConfig(bundleSizeBase, {
    plugins: [
      react(),
      svgr({
        include: '**/*.svg',
      }),
    ],
    resolve: {
      dedupe: ['react-is'], // MUI
      alias: {
        lodash: 'lodash-es',
      },
    },
  })
