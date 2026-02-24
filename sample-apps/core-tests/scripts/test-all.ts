#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */
// @ts-nocheck TS5097 allow .ts import

import {execSync} from 'child_process'
import {existsSync} from 'fs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import {analyzeBundle, generateStats, getDistTestDir} from './utils.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageDir = join(__dirname, '..')
const distTestDir = getDistTestDir(packageDir)

console.log('🚀 Running all bundle tests...')
console.log('')

// Run lite test
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('  Testing Lite Version')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
execSync('node scripts/test-lite.ts', {
  cwd: packageDir,
  stdio: 'inherit',
})

console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('  Testing Full Version')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
execSync('node scripts/test-full.ts', {
  cwd: packageDir,
  stdio: 'inherit',
})

console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('  Comparing Bundle Sizes')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

const litePath = join(distTestDir, 'lite.js')
const fullPath = join(distTestDir, 'full.js')

const liteResults = analyzeBundle(litePath)
const fullResults = analyzeBundle(fullPath)

const diff = ((fullResults.size - liteResults.size) / 1024).toFixed(2)

console.log('Lite bundle:  ', liteResults.sizeKB, 'KB')
console.log('Full bundle:  ', fullResults.sizeKB, 'KB')
console.log('Difference:   ', diff, 'KB')

console.log('')
console.log('📊 Generating statistics from vite-bundle-analyzer output...')

const liteStatsPath = join(distTestDir, 'stats-lite.json')
const fullStatsPath = join(distTestDir, 'stats-full.json')

if (!existsSync(liteStatsPath)) {
  console.warn('⚠️  Warning: stats-lite.json not found. Make sure vite-bundle-analyzer is configured correctly.')
}
if (!existsSync(fullStatsPath)) {
  console.warn('⚠️  Warning: stats-full.json not found. Make sure vite-bundle-analyzer is configured correctly.')
}

const stats = generateStats(distTestDir, liteResults, fullResults)

console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('  Bundle Size Comparison (vite-bundle-analyzer)')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('')
console.log('Bundle Sizes:')
console.log('  Lite:  ', stats.bundles.lite.size.kb, 'KB (', stats.bundles.lite.size.bytes, 'bytes)')
console.log('  Full:  ', stats.bundles.full.size.kb, 'KB (', stats.bundles.full.size.bytes, 'bytes)')
console.log('  Diff:  ', stats.diff.bundleSize.diff.kb, 'KB (', stats.diff.bundleSize.diff.bytes, 'bytes, ', stats.diff.bundleSize.diff.percent, '%)')
console.log('')
console.log('Chunks:')
console.log('  Lite:  ', stats.diff.chunks.lite)
console.log('  Full:  ', stats.diff.chunks.full)
console.log('  Diff:  ', stats.diff.chunks.diff > 0 ? '+' : '', stats.diff.chunks.diff)
console.log('')
console.log('Modules:')
console.log('  Lite:  ', stats.diff.modules.lite)
console.log('  Full:  ', stats.diff.modules.full)
console.log('  Diff:  ', stats.diff.modules.diff > 0 ? '+' : '', stats.diff.modules.diff)
console.log('  Only in Lite:  ', stats.diff.modules.onlyInLite)
console.log('  Only in Full:  ', stats.diff.modules.onlyInFull)
console.log('  In Both:       ', stats.diff.modules.inBoth)

if (stats.diff.moduleDetails.onlyInFull.length > 0) {
  console.log('')
  console.log('Top modules only in Full bundle:')
  for (const module of stats.diff.moduleDetails.onlyInFull.slice(0, 10)) {
    console.log('  ', module.sizeKB, 'KB - ', module.path)
  }
}

if (stats.diff.moduleDetails.largestDiffs.length > 0) {
  console.log('')
  console.log('Top modules with largest size differences:')
  for (const module of stats.diff.moduleDetails.largestDiffs.slice(0, 10)) {
    const sign = module.diff > 0 ? '+' : ''
    console.log('  ', sign, module.diffKB, 'KB (', sign, module.diffPercent, '%) - ', module.path)
    console.log('    Lite: ', module.liteSize, 'bytes, Full: ', module.fullSize, 'bytes')
  }
}

console.log('')
console.log('Lite stats:', join(distTestDir, 'stats-lite.json'))
console.log('Full stats:', join(distTestDir, 'stats-full.json'))

console.log('')

console.log('Bundling with rsbuild')
execSync('npm run build', {
  cwd: join(packageDir, 'test-app-full-rsbuild'),
  stdio: 'inherit',
})

console.log('✅ All tests completed!')


