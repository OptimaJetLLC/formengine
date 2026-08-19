import {defineConfig, mergeConfig} from 'vite'
import base, {componentTestGlob} from '../../vite.config'

export default defineConfig((env) => mergeConfig(base(env), {
  test: {
    include: [componentTestGlob],
  },
}))
