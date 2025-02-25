import {join, resolve} from 'path'
import {defineConfig, mergeConfig} from 'vite'

import base from '../../vite.config'

const testDir = resolve(__dirname, '../component/tests')
const configDir = resolve(__dirname, '../component/config')

// TODO move common to base config
// TODO https://github.com/facebook/react/issues/13991
export default defineConfig((env) => mergeConfig(base(env), {
  test: {
    environment: 'jsdom', // Use jsdom for testing in the browser
    include: [join(testDir, '/**/*.{test,spec}.?(c|m)[jt]s?(x)')],
    setupFiles: [join(configDir, '/setup.ts')], // Optional: Set up file for tests
    globals: true, // Use global variables for testing
    coverage: {
      reporter: ['text', 'html'], // Report coverage in both text and HTML
      // Use coverageConfig: { ... } to customize coverage options
    }
  }
}))
