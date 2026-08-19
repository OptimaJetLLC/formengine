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
      // Mantine supports react >= 18
      '../component/tests/**/mantine-*.{test,spec}.?(c|m)[jt]s?(x)',
      '../component/tests/**/modal.{test,spec}.?(c|m)[jt]s?(x)',
      '../component/tests/**/component-ref.spec.tsx',
    ],
  },
  server: monorepoServerConfig,
}))
