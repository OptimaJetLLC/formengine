import path from 'path'
import {fileURLToPath} from 'url'
import {defineConfig, mergeConfig} from 'vite'
import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const testDir = '../component/tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'
const configDir = '../component/config/setup.ts'

// TODO move common to base config
// TODO https://github.com/facebook/react/issues/13991
export default defineConfig((env) => mergeConfig(base(env), {
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'scheduler': path.resolve(__dirname, 'node_modules/scheduler'),
    },
    dedupe: ['react', 'react-dom'],
  },
  test: {
    environment: 'jsdom', // Use jsdom for testing in the browser
    include: [testDir],
    setupFiles: [configDir], // Optional: Set up file for tests
    globals: true, // Use global variables for testing
    coverage: {
      reporter: ['text', 'html'], // Report coverage in both text and HTML
      // Use coverageConfig: { ... } to customize coverage options
    },
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './reports/junit-report.xml',
    },
  },
  server: {
    fs: {
      strict: false
    },
    allow: ['..']
  }
}))