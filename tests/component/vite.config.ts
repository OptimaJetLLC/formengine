import {defineConfig, mergeConfig} from 'vite'

import base from '../../vite.config'

const actEnvSetup = './config/setup-act-environment.ts'

export default defineConfig((env) => mergeConfig(base(env), {
  test: {
    setupFiles: [actEnvSetup, './config/setup.ts']
  }
}))
