import {defineConfig, mergeConfig} from 'vite'

import base from '../../../vite.config.ts'

export default defineConfig(env => mergeConfig(base(env), {}))
