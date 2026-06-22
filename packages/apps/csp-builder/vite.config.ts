import {defineConfig, mergeConfig} from 'vite'

import base from '../../../vite.config'

export default defineConfig(env => mergeConfig(base(env), {}))
