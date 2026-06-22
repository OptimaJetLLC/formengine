import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig, mergeConfig} from 'vite'
import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const testDir = '../component/tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'
const actEnvSetup = '../component/config/setup-act-environment.ts'
const configDir = '../component/config/setup.ts'
const exclude = [
  // Mantine supports react >= 18
  '../component/tests/**/mantine-*.{test,spec}.?(c|m)[jt]s?(x)',
  '../component/tests/**/modal.{test,spec}.?(c|m)[jt]s?(x)',
  '../component/tests/**/component-ref.spec.tsx',
]

// TODO move common to base config
// TODO https://github.com/facebook/react/issues/13991
export default defineConfig((env) => mergeConfig(base(env), {
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'scheduler': path.resolve(__dirname, 'node_modules/scheduler'),
    },
  },
  test: {
    environment: 'jsdom', // Use jsdom for testing in the browser
    include: [testDir],
    exclude,
    setupFiles: [actEnvSetup, configDir],
    globals: true, // Use global variables for testing
    coverage: {
      reporter: ['text', 'html'], // Report coverage in both text and HTML
      // Use coverageConfig: { ... } to customize coverage options
    },
  },
  server: {
    fs: {
      strict: false
    },
    allow: ['..']
  }
}))
