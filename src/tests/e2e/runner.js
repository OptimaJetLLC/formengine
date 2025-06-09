#!/usr/bin/env node

import spawn from 'cross-spawn'
import {dirname, join, resolve} from 'path'
import {fileURLToPath} from 'url'
import {cwd} from 'node:process'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  templates: [
    'react-17',
    'react-18',
    'react-19'
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
  ]
}

const reactVersions = {
  'react-17': '17.0.2',
  'react-18': '18.3.1',
  'react-19': '19.0.0',
}

console.info('Starting projects test...')

const ENV = JSON.parse(JSON.stringify(process.env))

let withError = false

const debug = ENV['DEBUG_TPL']

for (const tpl of config.templates) {
  if (debug && tpl !== debug) continue

  console.log(tpl)

  console.info(`Starting with project: ${tpl}`)

  for (const {name, port, command} of config.projects) {
    const path = resolve(join(__dirname, '..', tpl))
    const args = ['--verbose', 'playwright', 'test'];

    if (debug) {
      args.push('--ui')
    }

    console.info({path, name, command})

    const result = spawn.sync('npx', args, {
      cwd: __dirname,
      env: {
        ...ENV,
        TEST_PROJECT: path,
        TEST_TEMPLATE: tpl,
        TEST_TESTS_PATH: name,
        TEST_PORT: port,
        TEST_START_CMD: command,
        TEST_REACT_VERSION: reactVersions[tpl],
      },
      stdio: 'inherit'
    })

    if (result.status !== 0) {
      console.error('Error running tests', __dirname, tpl)
      console.error(result)
      withError = true
    }

    // https://github.com/allure-framework/allure2/issues/2336
    // https://timdeschryver.dev/blog/merging-your-playwright-sharded-reports-into-a-single-html-report#updating-the-ci-pipeline-github-actions
    const reportPath = join(cwd(), 'reports', 'blob')
    const mergeResult = spawn.sync('npx',
      `playwright merge-reports -c playwright.config.ts --reporter html ${reportPath}`.split(' '), {
        cwd: __dirname,
        env: {
          ...ENV,
          TEST_PROJECT: path,
          TEST_TESTS_PATH: name,
          TEST_PORT: port,
          TEST_START_CMD: command,
          CI: true
        },
        stdio: 'inherit'
      })

    if (mergeResult.status !== 0) {
      console.error('Error merging reports', __dirname, tpl)
      console.error(mergeResult)
      withError = true
    }

    // merge CTRF reports
    const ctrfMergeResult = spawn.sync('npx',
      `npx ctrf merge reports/ctrf`.split(' '), {
        cwd: __dirname,
        env: {
          ...ENV,
          TEST_PROJECT: path,
          TEST_TESTS_PATH: name,
          TEST_PORT: port,
          TEST_START_CMD: command,
          CI: true
        },
        stdio: 'inherit'
      })

    if (ctrfMergeResult.status !== 0) {
      console.error('Error merging CTFR reports', __dirname, tpl)
      console.error(ctrfMergeResult)
      withError = true
    }
  }
}

if (withError) {
  process.exit(1)
}
