#!/usr/bin/env node

import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'node:fs'
import {basename, dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function main(): void {
  const bundleSizeDir = join(__dirname, '../../../examples/community/bundle-size')
  const bundleSizeIncludesDir = join(bundleSizeDir, '.bundle-stats')
  const bundleSizeChartsDir = join(bundleSizeIncludesDir, 'charts')
  const docsStaticDir = join(__dirname, '../static/includes/bundle-size')

  if (!existsSync(docsStaticDir)) {
    mkdirSync(docsStaticDir, {recursive: true})
  }

  const chartsToCopy = ['.json', '.svg', '.mdx']
  const includesToCopy = ['.mdx', '.json']

  const files: string[] = []

  if (existsSync(bundleSizeChartsDir)) {
    const chartFiles = readdirSync(bundleSizeChartsDir, {withFileTypes: true})
      .filter(entry => entry.isFile())
      .filter(entry => chartsToCopy.some(ext => entry.name.endsWith(ext)))
      .map(entry => join(bundleSizeChartsDir, entry.name))
    files.push(...chartFiles)
  } else {
    console.warn(`⚠️  Source directory not found: ${bundleSizeChartsDir}`)
    console.warn('   Run "npm run bundle-size" in the bundle-size directory first.')
  }

  if (existsSync(bundleSizeIncludesDir)) {
    const includeFiles = readdirSync(bundleSizeIncludesDir, {withFileTypes: true})
      .filter(entry => entry.isFile())
      .filter(entry => includesToCopy.some(ext => entry.name.endsWith(ext)))
      .map(entry => join(bundleSizeIncludesDir, entry.name))
    files.push(...includeFiles)
  } else {
    console.warn(`⚠️  Source directory not found: ${bundleSizeIncludesDir}`)
  }

  if (files.length === 0) {
    console.warn('⚠️  No files found in bundle-size output.')
    return
  }

  let copiedCount = 0
  for (const file of files) {
    copyFileSync(file, join(docsStaticDir, basename(file)))
    copiedCount++
  }

  console.log(`✅ Copied ${copiedCount} file(s) to ${docsStaticDir}`)
}

try {
  main()
} catch (error) {
  console.error('❌ copy-bundle-charts script failed.', error)
  process.exitCode = 1
}
