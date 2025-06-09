import {defineConfig, mergeConfig} from 'vite'

import base from '../../vite.config'
import {indexPlugin} from '../common/lib/vite-common'

export default defineConfig((env) => mergeConfig(base(env), {
  resolve: {
    alias: {
      lodash: 'lodash-es'
    },
  },
  plugins: [indexPlugin('/viewer.html')]
}))
