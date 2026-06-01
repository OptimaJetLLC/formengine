#!/usr/bin/env node

/**
 * Runs the Lerna build with concurrency set to a fraction of available CPU cores.
 */

import {execSync} from 'node:child_process'
import os from 'node:os'

function main(): void {
  const cpus = os.cpus().length
  const concurrency = Math.max(1, Math.floor(cpus / 3))

  execSync(`npx lerna run --stream build --ignore @react-form-builder/docs --concurrency=${concurrency}`, {stdio: 'inherit'})
}

try {
  main()
} catch (error) {
  console.error('❌ build-with-concurrency script failed.', error)
  process.exitCode = 1
}
