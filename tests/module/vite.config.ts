import {resolve} from 'node:path'
import {defineConfig, mergeConfig} from 'vite'
import base, {componentTestSetupFiles} from '../../vite.config.ts'
import {rewriteDeepImports} from './vite-plugin-rewrite-deep-imports.ts'

// These suites read browser globals in BuilderStore or import browser-only Monaco code.
const jsdomTests = [
  './tests/added-component.spec.tsx',
  './tests/builder-ui-language.spec.tsx',
  './tests/builderstore-form-as-string-pruning.spec.tsx',
  './tests/fe-1995-localization-languages-seeding.spec.tsx',
  './tests/insert-order.spec.tsx',
  './tests/preset-insert-order.spec.tsx',
]

export default defineConfig(env => {
  const config = base(env)

  // Keep setup files project-specific and let both Node-based projects share one Vite server.
  return mergeConfig(
    {...config, test: {...config.test, browser: undefined, setupFiles: []}},
    {
      plugins: [rewriteDeepImports()],
      test: {
        projects: [
          {
            test: {
              name: 'module:node',
              environment: 'node',
              include: ['./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
              exclude: jsdomTests,
              setupFiles: ['./setup.ts'],
            },
          },
          {
            test: {
              name: 'module:jsdom',
              environment: 'jsdom',
              include: jsdomTests,
              setupFiles: componentTestSetupFiles,
            },
          },
        ],
      },
      resolve: {
        alias: {
          '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider': resolve(
            import.meta.dirname,
            '../../packages/core/src/features/form-viewer/components/ViewerStoreProvider.tsx'
          ),
        },
      },
    }
  )
})
