import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {playwright} from '@vitest/browser-playwright'
import {mergeConfig} from 'vite'
import {configDefaults, defineConfig} from 'vitest/config'
import base from '../vite.config.ts'

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url))
const isVitestBrowserRun = process.argv.some(arg => arg === '--browser' || arg.startsWith('--browser.'))

/**
 * Absolute paths to the shared component test setup files.
 */
export const componentTestSetupFiles = [
  path.resolve(repositoryRoot, 'tests/component/config/setup-act-environment.ts'),
  ...(!isVitestBrowserRun ? [path.resolve(repositoryRoot, 'tests/component/config/setup-jsdom.ts')] : []),
  path.resolve(repositoryRoot, 'tests/component/config/setup.ts'),
]

/**
 * Glob for component tests, relative to a tests/react-* package.
 */
export const componentTestGlob = '../component/tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'

const isCI = !!(process.env.CI || process.env.GITHUB_ACTIONS || process.env.EARTHLY_CI)

export default defineConfig(env =>
  mergeConfig(base(env), {
    ...(isVitestBrowserRun
      ? {
          optimizeDeps: {
            include: ['react/jsx-runtime'],
          },
        }
      : {}),
    test: {
      isolate: true,
      environment: 'jsdom',
      setupFiles: componentTestSetupFiles,
      coverage: {
        reporter: ['text', 'html'],
      },
      alias: [
        {
          find: /^monaco-editor$/,
          // Browser tests need language/format contributions (editor.main). jsdom stays on editor.api.
          replacement:
            repositoryRoot +
            (isVitestBrowserRun
              ? '/node_modules/monaco-editor/esm/vs/editor/editor.main'
              : '/node_modules/monaco-editor/esm/vs/editor/editor.api'),
        },
        ...(!isVitestBrowserRun
          ? [
              {
                find: /^vitest\/browser$/,
                replacement: path.resolve(repositoryRoot, 'tests/component/util/vitestBrowserStub.ts'),
              },
            ]
          : []),
      ],
      clearMocks: true,
      // VM pools retain per-file isolation; recycling bounds retained module state.
      ...(isVitestBrowserRun ? {maxWorkers: 1} : {pool: 'vmForks', vmMemoryLimit: '512MiB'}),
      exclude: [...configDefaults.exclude, 'examples/**'],
      silent: isCI ? 'passed-only' : false,
      reporters: isCI ? ['dot', 'junit'] : ['default', 'junit'],
      outputFile: {
        junit: './reports/junit-report.xml',
      },
      onConsoleLog(log: string, type: 'stdout' | 'stderr'): boolean | void {
        if (!isCI && type === 'stderr') {
          // additionally, write to console.error to make the tests crash
          console.error(log)
        }
        return true
      },
      testTimeout: 60_000,
      browser: {
        provider: playwright({
          contextOptions: {
            permissions: ['clipboard-read', 'clipboard-write'],
          },
          launchOptions: {
            args: ['--disable-dev-shm-usage', '--no-sandbox', ...(process.env.BROWSER_DEVTOOL ? ['--auto-open-devtools-for-tabs'] : [])],
          },
        }),
        enabled: false,
        name: 'chromium',
        instances: [{browser: 'chromium'}],
        screenshotFailures: true,
        screenshotDirectory: 'reports/screenshots',
        viewport: {
          width: 1440,
          height: 900,
        },
      },
      // reporters: ['verbose']
    },
  })
)
