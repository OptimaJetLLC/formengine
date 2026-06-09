import {defineConfig, mergeConfig} from 'vite'

import base from '../../vite.config'

const testDir = '../component/tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'
const actEnvSetup = '../component/config/setup-act-environment.ts'
const configDir = '../component/config/setup.ts'

// TODO move common to base config
// TODO https://github.com/facebook/react/issues/13991
export default defineConfig((env) => mergeConfig(base(env), {
  test: {
    environment: 'jsdom', // Use jsdom for testing in the browser
    include: [testDir],
    setupFiles: [actEnvSetup, configDir],
    globals: true, // Use global variables for testing
    coverage: {
      reporter: ['text', 'html'], // Report coverage in both text and HTML
      // Use coverageConfig: { ... } to customize coverage options
    },
  }
}))
