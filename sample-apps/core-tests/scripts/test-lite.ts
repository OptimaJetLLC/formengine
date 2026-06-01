#!/usr/bin/env node

// @ts-nocheck TS5097 allow .ts import

import {execSync} from 'node:child_process'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {analyzeBundle, printAnalysis, getDistTestDir} from './utils.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageDir = join(__dirname, '..')
const distTestDir = getDistTestDir(packageDir)

console.log('🧪 Building lite test app...')
execSync('vite build', {
  cwd: join(packageDir, 'test-app-lite'),
  stdio: 'inherit',
})

console.log('')
console.log('📊 Analyzing bundle...')
const bundlePath = join(distTestDir, 'lite.js')
const results = analyzeBundle(bundlePath)
printAnalysis({results: results, expectedComponent: 'FormViewerLite'})

console.log('')
console.log('✅ Lite test completed!')


