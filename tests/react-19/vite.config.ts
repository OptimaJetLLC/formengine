import {defineConfig, mergeConfig} from 'vite'
import base, {componentTestGlob} from '../vitest.config.ts'

export default defineConfig(env =>
  mergeConfig(base(env), {
    test: {
      include: [componentTestGlob],
    },
  })
)
