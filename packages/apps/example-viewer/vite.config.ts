import {readFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig, mergeConfig} from 'vite'

import base from '../../../vite.config.ts'

interface PackageJson {
  peerDependencies?: Record<string, string>
}

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as PackageJson
const peerDependencies = packageJson.peerDependencies ?? {}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(env =>
  mergeConfig(base(env), {
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        formats: ['es'],
        fileName: 'index',
      },
      rolldownOptions: {
        external: Object.keys(peerDependencies),
      },
    },
  })
)
