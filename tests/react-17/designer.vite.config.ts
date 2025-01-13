import {indexPlugin} from '@react-form-builder/tests-common/lib/vite.js'
import {defineConfig, mergeConfig} from 'vite'

import base from '../../vite.config'

export default defineConfig((env) => mergeConfig(base(env), {
  resolve: {
    alias: {
      lodash: 'lodash-es'
    },
  },
  plugins: [indexPlugin('/designer.html')]
}))
