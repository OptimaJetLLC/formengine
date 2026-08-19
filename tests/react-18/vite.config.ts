import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig, mergeConfig} from 'vite'
import base, {componentTestGlob} from '../../vite.config'
import {monorepoServerConfig, reactVersionAliases} from '../common/lib/vite-common'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig((env) => mergeConfig(base(env), {
  resolve: reactVersionAliases(__dirname),
  test: {
    include: [componentTestGlob],
    exclude: [
      '../component/tests/**/component-ref.spec.tsx',
    ],
  },
  server: monorepoServerConfig,
}))
