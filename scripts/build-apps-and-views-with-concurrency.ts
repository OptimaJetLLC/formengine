#!/usr/bin/env node

/**
 * Runs `build` for packages that have no `pack` script in CI.
 * Used by CI to verify apps and view packages that are excluded from `pack:ci`.
 */

import {execSync} from 'node:child_process'

import {getCpuScaledConcurrency} from '@react-form-builder/cli-lib/concurrency'

const BUILD_SCOPES = [
  '@react-form-builder/demo',
  '@react-form-builder/example-viewer',
  '@react-form-builder/formbuilder',
  '@react-form-builder/components-antd',
  '@react-form-builder/components-test',
] as const

function main(): void {
  const {cpus, concurrency} = getCpuScaledConcurrency()
  const scopeArgs = BUILD_SCOPES.map(scope => `--scope ${scope}`).join(' ')

  console.log(`build:apps-and-views:ci concurrency=${concurrency} (cpus=${cpus})`)
  execSync(`npx lerna run --stream build ${scopeArgs} --include-dependencies --concurrency=${concurrency}`, {stdio: 'inherit'})
}

try {
  main()
} catch (error) {
  console.error('❌ build-apps-and-views-with-concurrency script failed.', error)
  process.exitCode = 1
}
