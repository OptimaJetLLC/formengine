#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */
// @ts-nocheck TS5097 allow .ts import

import {execSync} from 'child_process'
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'
import {analyzeBundle, printAnalysis, getDistTestDir} from './utils.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageDir = join(__dirname, '..')
const distTestDir = getDistTestDir(packageDir)

console.log('🧪 Building full test app...')
execSync('vite build', {
  cwd: join(packageDir, 'test-app-full'),
  stdio: 'inherit',
})

console.log('')
console.log('📊 Analyzing bundle...')
const bundlePath = join(distTestDir, 'full.js')
const results = analyzeBundle(bundlePath)
printAnalysis({results: results, expectedComponent: 'FormViewer'})

console.log('')
console.log('✅ Full test completed!')


