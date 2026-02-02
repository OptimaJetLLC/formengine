/**
 * Runs the Lerna build with concurrency set to half of the available CPU cores.
 * Use via: npm run build:auto-concurrency
 */

import {execSync} from 'node:child_process'
import os from 'node:os'

const cpus = os.cpus().length
const concurrency = Math.max(1, Math.floor(cpus / 3))

execSync(`npx lerna run --stream build --ignore @react-form-builder/docs --concurrency=${concurrency}`, {stdio: 'inherit'})
