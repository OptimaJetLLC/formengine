#!/usr/bin/env node

import {existsSync, mkdirSync, readdirSync, copyFileSync} from 'fs';
import {join, dirname, basename} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const statsProjectDir = '../../../../examples/community/bundle-size'
const bundleSizeIncludesDir = join(__dirname, statsProjectDir + '/.bundle-stats/');
const bundleSizeChartsDir = join(__dirname, statsProjectDir + '/.bundle-stats/charts/');
const docsStaticDir = join(__dirname, '../static/includes/bundle-size');

if (!existsSync(docsStaticDir)) {
  mkdirSync(docsStaticDir, {recursive: true});
}

if (!existsSync(bundleSizeChartsDir)) {
  console.warn(`⚠️  Source directory not found: ${bundleSizeChartsDir}`);
  console.warn('   Run "npm run bundle-size" in the bundle-size directory first.');
  process.exit(0);
}


 const chartsToCopy = ['.json', '.svg', '.mdx']
const chartFiles = readdirSync(bundleSizeChartsDir).filter(file => {
  return chartsToCopy.some(ext => file.endsWith(ext))
}).map(file => join(bundleSizeChartsDir, file))

const includesToCopy = ['.mdx']
const includeFiles = readdirSync(bundleSizeIncludesDir).filter(file => {
  return includesToCopy.some(ext => file.endsWith(ext))
}).map(file => join(bundleSizeIncludesDir, file))

const files = [...chartFiles, ...includeFiles]

if (files.length === 0) {
  console.warn('⚠️  No files found in bundle-size output.');
  process.exit(0);
}

let copiedCount = 0
for (const file of files) {
  copyFileSync(file, join(docsStaticDir, basename(file)))
  copiedCount++
}

console.log(`✅ Copied ${copiedCount} file(s) to ${docsStaticDir}`);
