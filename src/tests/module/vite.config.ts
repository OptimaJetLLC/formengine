import {resolve} from 'path'
import {defineConfig, mergeConfig} from 'vite'

import base from '../../vite.config'
import {rewriteDeepImports} from './vite-plugin-rewrite-deep-imports'

const testDir = './tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'
const actEnvSetup = '../component/config/setup-act-environment.ts'
const configDir = '../component/config/setup.ts'

// TODO move common to base config
export default defineConfig((env) => mergeConfig(base(env), {
  plugins: [
    rewriteDeepImports()
  ],
  test: {
    environment: 'jsdom', // Use jsdom for testing in the browser
    include: [testDir],
    setupFiles: [actEnvSetup, configDir],
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
  resolve: {
    alias: {
      '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider': resolve(__dirname, '../../packages/core/src/features/form-viewer/components/ViewerStoreProvider.tsx'),
    }
  },
}))
