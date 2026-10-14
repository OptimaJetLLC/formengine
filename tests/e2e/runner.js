#!/usr/bin/env node

import {existsSync, rmSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, join, resolve} from 'node:path'
import {cwd} from 'node:process'
import {fileURLToPath} from 'node:url'
import spawn from 'cross-spawn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = {
  templates: [
    {name: 'react-18', expectedReactMajor: 18},
    {name: 'react-19', expectedReactMajor: 19},
  ],
  projects: [
    {
      name: 'viewer',
      port: '15001',
      command: 'npm run start:viewer',
    },
    {
      name: 'designer',
      port: '15002',
      command: 'npm run start:designer',
    },
  ],
}

/**
 * Resolves and validates the React version installed for a test host package.
 * @param hostDir the absolute path to tests/react-18 or tests/react-19.
 * @param expectedMajor the expected React major version.
 * @returns the installed React package version.
 */
function resolveReactVersion(hostDir, expectedMajor) {
  const requireFromHost = createRequire(join(hostDir, 'package.json'))
  const reactVersion = requireFromHost('react/package.json').version
  const installedMajor = Number.parseInt(reactVersion.split('.')[0], 10)
  if (installedMajor !== expectedMajor) {
    throw new Error(`Expected React ${expectedMajor}.x in ${hostDir}, but found ${reactVersion}`)
  }
  return reactVersion
}

const ENV = JSON.parse(JSON.stringify(process.env))
const isCI = !!ENV.CI
const ctrfReportsPath = join(__dirname, 'reports', 'ctrf')
const ctrfReportPath = join(ctrfReportsPath, 'ctrf-report.json')

rmSync(ctrfReportsPath, {recursive: true, force: true})

if (!isCI) {
  console.info('Starting projects test...')
}

let withError = false

const debug = ENV['DEBUG_TPL']

for (const {name: tpl, expectedReactMajor} of config.templates) {
  if (debug && tpl !== debug) continue

  if (!isCI) {
    console.log(tpl)
    console.info(`Starting with project: ${tpl}`)
  }

  for (const {name, port, command} of config.projects) {
    const path = resolve(join(__dirname, '..', tpl))
    const reactVersion = resolveReactVersion(path, expectedReactMajor)
    const args = isCI ? ['playwright', 'test'] : ['--verbose', 'playwright', 'test']

    if (debug) {
      args.push('--ui')
    }

    console.info(isCI ? `Running e2e: ${tpl} / ${name}` : {path, name, command, reactVersion})

    const result = spawn.sync('npx', args, {
      cwd: __dirname,
      env: {
        ...ENV,
        TEST_PROJECT: path,
        TEST_TEMPLATE: tpl,
        TEST_TESTS_PATH: name,
        TEST_PORT: port,
        TEST_START_CMD: command,
        TEST_REACT_VERSION: reactVersion,
      },
      stdio: 'inherit',
    })

    if (result.status !== 0) {
      console.error('Error running tests', __dirname, tpl)
      console.error(result)
      withError = true
    }

    // https://github.com/allure-framework/allure2/issues/2336
    // https://timdeschryver.dev/blog/merging-your-playwright-sharded-reports-into-a-single-html-report#updating-the-ci-pipeline-github-actions
    const reportPath = join(cwd(), 'reports', 'blob')
    const mergeResult = spawn.sync('npx', `playwright merge-reports -c playwright.config.ts --reporter html ${reportPath}`.split(' '), {
      cwd: __dirname,
      env: {
        ...ENV,
        TEST_PROJECT: path,
        TEST_TESTS_PATH: name,
        TEST_PORT: port,
        TEST_START_CMD: command,
        CI: true,
      },
      stdio: 'inherit',
    })

    if (mergeResult.status !== 0) {
      console.error('Error merging reports', __dirname, tpl)
      console.error(mergeResult)
      withError = true
    }
  }
}

const ctrfMergeResult = spawn.sync('npx', ['ctrf', 'merge', ctrfReportsPath, '--output', ctrfReportPath], {
  cwd: __dirname,
  env: ENV,
  stdio: 'inherit',
})
const hasCtrfReport = existsSync(ctrfReportPath)

if (ctrfMergeResult.status !== 0 || !hasCtrfReport) {
  console.error('Error merging CTRF reports', __dirname)
  if (!hasCtrfReport) console.error('Merged CTRF report was not created', ctrfReportPath)
  console.error(ctrfMergeResult)
  withError = true
}

if (withError) {
  process.exit(1)
}
