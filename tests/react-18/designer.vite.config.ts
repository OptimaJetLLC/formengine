import {defineConfig, mergeConfig} from 'vite'

import base from '../../vite.config.ts'
import {indexPlugin} from '../common/lib/vite-common.ts'

export default defineConfig(env =>
  mergeConfig(base(env), {
    plugins: [indexPlugin('/designer.html')],
  })
)
