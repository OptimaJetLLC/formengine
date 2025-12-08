import react from '@vitejs/plugin-react-swc'
import path from 'path'
import type {ModuleFormat} from 'rollup'
// @ts-ignore
import {fileURLToPath} from 'url'
import {defineConfig, mergeConfig} from 'vite'
import {inlineCssPlugin} from 'vite-inline-css-plugin'
import cp from 'vite-plugin-cp'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import svgr from 'vite-plugin-svgr'

import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(env =>
  mergeConfig(base(env), {
    // with this setting only the production version of React will be included in the bundle
    define: {'process.env.NODE_ENV': '"production"'},
    build: {
      cssCodeSplit: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['umd', 'iife'],
        fileName: (format: ModuleFormat) => `index.${format}.js`,
        name: 'FormEngineDesignerBundle',
      },
      rollupOptions: {
        plugins: [
          cp({
            targets: [
              {
                src: '../views/rsuite/public/css/*.*',
                dest: 'dist',
              },
            ],
          }),
        ],
      },
    },
    plugins: [
      inlineCssPlugin(),
      react({jsxImportSource: '@emotion/react'}),
      svgr({
        include: '**/*.svg',
      }),
      cssInjectedByJsPlugin(),
    ],
    resolve: {
      dedupe: ['react', 'react-dom', 'react-is'],
    },
  })
)
