import {defineConfig, devices} from '@playwright/test'
import {dirname, resolve} from 'node:path'
import {chdir} from 'node:process'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const workspaceRoot = resolve(__dirname, '../..')

chdir(workspaceRoot)
console.log(`Running playwright... from ${workspaceRoot}`)

const env = JSON.parse(JSON.stringify(process.env))

const port = env['TEST_PORT'] ?? '15002'
const baseURL = env['TEST_BASE_URL'] ?? `http://localhost:${port}`
const testSuite = env['TEST_TESTS_PATH'] ?? 'designer'
const projectRoot = env['TEST_PROJECT'] ?? resolve(`${workspaceRoot}/tests/react-17`)
const command = env['TEST_START_CMD'] ?? 'npm run start:designer'
const cwd = env['TEST_PROJECT'] ?? projectRoot

const testDir = `./tests/${testSuite}`
const reportsDir = resolve(`${workspaceRoot}/tests/e2e/reports`)
const blobReportsDir = resolve(`${reportsDir}/blob`)
const ctrfReportsDir = resolve(`${reportsDir}/ctrf`)
const testName = [testSuite, projectRoot]
  .join('-')
  .replaceAll(' ', '_')
  .replaceAll(':', '-')
  .replaceAll('/', '_')

// https://stackoverflow.com/questions/78341855/how-to-run-projects-sequentially-but-with-tests-in-parallel
// https://playwright.dev/docs/test-projects#dependencies
// https://playwright.dev/docs/test-parameterize#parameterized-projects
export default defineConfig({
  testDir,
  outputDir: `${reportsDir}/test-results`,
  // testMatch: /hello\.spec\.ts/,
  testMatch: /.*\.spec\.ts/,
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!env.CI,
  retries: env.CI ? 2 : 0,
  workers: env.CI ? 2 : undefined,
  reporter: [
    ['html', {
      open: 'never',
      outputFolder: `${reportsDir}/report-html`
      // attachmentsBaseURL: 'https://external-storage.com/' }
    }],
    ['blob', {outputFile: `${blobReportsDir}/report-${testName}.zip`}],
    ['list'],
    ['monocart-reporter', {
      name: testName,
      outputFile: `${reportsDir}/monocart/index.html`
    }],
    ['playwright-ctrf-json-reporter', {
      outputFile: `ctrf-report-${env['TEST_TEMPLATE']}.json`,
      outputDir: ctrfReportsDir
    }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL, // url playwright visits with `await page.goto('/')`;
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'off',
    viewport: {width: 1920, height: 1080},
    actionTimeout: 5000,
    locale: 'en-US'
  },
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: {...devices['Desktop Chrome']},
    // },
    // {
    //   name: 'firefox',
    //   use: {...devices['Desktop Firefox']},
    // },
    // {
    //   name: 'webkit',
    //   use: {...devices['Desktop Safari']},
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    // {
    //   name: 'Microsoft Edge',
    //   use: {...devices['Desktop Edge'], channel: 'msedge'},
    // },
    {
      name: 'Google Chrome',
      use: {...devices['Desktop Chrome'], channel: 'chrome'},
    },
  ],
  webServer: [{
    command,
    url: baseURL,
    timeout: 5000,
    // reuseExistingServer: true,
    reuseExistingServer: !env.CI,
    cwd,
  }],
})
