import {defineConfig, mergeConfig} from 'vite'
import base, {componentTestGlob} from '../../vite.config.ts'

export default defineConfig(env =>
  mergeConfig(base(env), {
    test: {
      include: [componentTestGlob],
    },
  })
)
