#!/usr/bin/env node

/**
 * Runs the Lerna pack with concurrency set to a fraction of available CPU cores.
 * Used by CI bundle to reduce peak RAM/CPU vs unconstrained `npm run pack`.
 */

import {execSync} from 'node:child_process'

import {getCpuScaledConcurrency} from '@react-form-builder/cli-lib/concurrency'

function main(): void {
  const {cpus, concurrency} = getCpuScaledConcurrency()

  console.log(`pack:ci concurrency=${concurrency} (cpus=${cpus})`)
  execSync(
    `npx lerna run --stream pack --ignore @react-form-builder/docs --ignore @react-form-builder/designer-guide --concurrency=${concurrency}`,
    {stdio: 'inherit'}
  )
}

try {
  main()
} catch (error) {
  console.error('❌ pack-with-concurrency script failed.', error)
  process.exitCode = 1
}
