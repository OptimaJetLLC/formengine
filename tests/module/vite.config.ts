import {resolve} from 'node:path'
import {defineConfig, mergeConfig} from 'vite'
import base from '../../vite.config'
import {rewriteDeepImports} from './vite-plugin-rewrite-deep-imports'

export default defineConfig(env =>
  mergeConfig(base(env), {
    plugins: [rewriteDeepImports()],
    test: {
      include: ['./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
    resolve: {
      alias: {
        '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider': resolve(
          __dirname,
          '../../packages/core/src/features/form-viewer/components/ViewerStoreProvider.tsx'
        ),
      },
    },
  })
)
