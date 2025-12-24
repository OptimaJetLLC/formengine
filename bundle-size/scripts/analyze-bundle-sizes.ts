#!/usr/bin/env node

/* eslint-disable no-console */

import {execSync} from 'child_process'
import {cpSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import {formatSize, getActualFileSize} from './utils.ts'

interface BundleChunk {
  filename?: string
  label?: string
  size?: number
  parsedSize?: number
  statSize?: number
  actualSize?: number
  groups?: BundleChunk[]
  source?: BundleChunk[]
  stats?: BundleChunk[]
}

type BundleStats =
  | {
      chunks?: Record<string, BundleChunk>
      modules?: BundleChunk[]
      size?: number
    }
  | BundleChunk[]
  | undefined

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const statsDir = join(rootDir, '.bundle-stats')

const apps = ['formengine', 'rjsf', 'survey', 'vueform'] as const
const variants = ['login', 'login-mui', 'booking', 'booking-mui'] as const

interface BundleBreakdown {
  code: number
  css: number
}

interface BundleInfo {
  app: string
  variant: string
  totalSize: number
  chunks: Record<string, BundleChunk>
  breakdown: BundleBreakdown
}

function calculateTotalSize(stats: BundleStats): number {
  if (!stats) return 0

  let total = 0

  if (Array.isArray(stats)) {
    for (const module of stats) {
      // Prefer actualSize (actual file size from disk), then fall back to other metrics
      const size = module.actualSize ?? module.size ?? module.parsedSize ?? module.statSize ?? 0
      total += size
    }
  } else if ('chunks' in stats && stats.chunks) {
    for (const chunk of Object.values(stats.chunks)) {
      const size = chunk?.actualSize ?? chunk?.size ?? chunk?.parsedSize ?? chunk?.statSize ?? 0
      total += size
    }
  } else if (stats.modules && Array.isArray(stats.modules)) {
    for (const module of stats.modules) {
      const size = module.actualSize ?? module.size ?? module.parsedSize ?? module.statSize ?? 0
      total += size
    }
  }

  return total
}

/**
 * Calculates percentage safely, avoiding division by zero.
 * @param part part value
 * @param total total value
 * @returns percentage as a number (0-100)
 */
function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0
  return (part / total) * 100
}

/**
 * Recursively extracts all modules from bundle stats.
 * @param node stats node (can be chunk or module)
 * @param modules array to collect modules with their paths and sizes
 */
function extractModulesRecursive(node: BundleChunk | undefined, modules: Array<{path: string; size: number}>): void {
  if (!node) return

  const nodePath = node.filename || node.label || ''
  const nodeSize = node.actualSize ?? node.size ?? node.parsedSize ?? node.statSize ?? 0

  // Check if this node has children (groups, source, or stats)
  const hasChildren =
    (Array.isArray(node.groups) && node.groups.length > 0) ||
    (Array.isArray(node.source) && node.source.length > 0) ||
    (Array.isArray(node.stats) && node.stats.length > 0)

  // Process children first
  if (hasChildren) {
    if (node.groups) {
      for (const child of node.groups) {
        extractModulesRecursive(child, modules)
      }
    }
    if (node.source) {
      for (const child of node.source) {
        extractModulesRecursive(child, modules)
      }
    }
    if (node.stats) {
      for (const child of node.stats) {
        extractModulesRecursive(child, modules)
      }
    }
  }

  // If this is a leaf node (module) with a path and size, add it
  if (nodePath && nodeSize > 0 && !hasChildren) {
    const existingModule = modules.find(m => m.path === nodePath)
    if (existingModule) {
      // If module exists, add to its size
      existingModule.size += nodeSize
    } else {
      modules.push({path: nodePath, size: nodeSize})
    }
  }
}

/**
 * Categorizes a module path into breakdown categories.
 * @param path module file path
 * @returns category: 'own', 'css', or 'external'
 */
function categorizeModule(path: string): 'own' | 'css' | 'external' {
  const normalizedPath = path.toLowerCase()

  // Check if it's a CSS file
  if (normalizedPath.endsWith('.css')) {
    return 'css'
  }

  // Check if it's from node_modules (external dependency)
  if (normalizedPath.includes('node_modules')) {
    return 'external'
  }

  // Otherwise it's own code
  return 'own'
}

/**
 * Calculates bundle breakdown by analyzing all modules.
 * @param stats bundle stats
 * @returns breakdown with sizes for code and CSS
 */
function calculateBreakdown(stats: BundleStats): BundleBreakdown {
  const breakdown: BundleBreakdown = {
    code: 0,
    css: 0,
  }

  if (!stats) return breakdown

  const modules: Array<{path: string; size: number}> = []

  // Extract all modules from stats
  if (Array.isArray(stats)) {
    for (const module of stats) {
      extractModulesRecursive(module, modules)
    }
  } else if ('chunks' in stats && stats.chunks) {
    for (const chunk of Object.values(stats.chunks)) {
      extractModulesRecursive(chunk, modules)
    }
  } else if (stats.modules && Array.isArray(stats.modules)) {
    for (const module of stats.modules) {
      extractModulesRecursive(module, modules)
    }
  }

  // Categorize and sum up sizes
  for (const module of modules) {
    const category = categorizeModule(module.path)
    if (category === 'css') {
      breakdown.css += module.size
    } else {
      // Both 'own' and 'external' go into code
      breakdown.code += module.size
    }
  }

  return breakdown
}

function buildApp(appName: string, variant: string): boolean {
  const appPath = join(rootDir, appName)

  if (!existsSync(appPath)) {
    console.warn(`App directory not found: ${appName}`)
    return false
  }

  try {
    console.log(`🔨 Building ${appName} with variant: ${variant}...`)
    execSync('npm run build', {
      cwd: appPath,
      env: {
        ...process.env,
        APP_INPUT: variant,
      },
      stdio: 'inherit',
    })

    // Copy build output and stats to central location before next build overwrites it
    const distPath = join(rootDir, appName, 'dist')
    const distStatPath = join(distPath, `vite-stat-${variant}.json`)

    if (existsSync(distPath)) {
      if (!existsSync(statsDir)) {
        mkdirSync(statsDir, {recursive: true})
      }

      // Create folder for this build variant: {appName}-{variant}
      const buildOutputDir = join(statsDir, `${appName}-${variant}`)

      // Remove existing build output if it exists
      if (existsSync(buildOutputDir)) {
        execSync(`rm -rf "${buildOutputDir}"`, {cwd: rootDir})
      }

      // Read stats and update with actual file sizes from original dist before copying
      if (existsSync(distStatPath)) {
        const statsContent = readFileSync(distStatPath, 'utf-8')
        const parsedStats: BundleStats = JSON.parse(statsContent)

        if (parsedStats) {
          const stats = parsedStats

          // Update stats with actual file sizes from the original dist folder
          if (Array.isArray(stats)) {
            for (const module of stats) {
              if (module.filename) {
                module.actualSize = getActualFileSize(distPath, module.filename)
              }
            }
          } else if ('chunks' in stats && stats.chunks) {
            for (const chunk of Object.values(stats.chunks)) {
              if (chunk?.filename) {
                chunk.actualSize = getActualFileSize(distPath, chunk.filename)
              }
            }
          } else if (stats.modules && Array.isArray(stats.modules)) {
            for (const module of stats.modules) {
              if (module.filename) {
                module.actualSize = getActualFileSize(distPath, module.filename)
              }
            }
          }

          // Copy entire dist folder to build output directory
          cpSync(distPath, buildOutputDir, {recursive: true})

          // Save updated stats with actual sizes in the build output directory
          const savedStatPath = join(buildOutputDir, `vite-stat-${variant}.json`)
          writeFileSync(savedStatPath, JSON.stringify(stats, null, 2), 'utf-8')

          // Also save a copy in the root stats dir for easy access
          const rootStatPath = join(statsDir, `${appName}-${variant}.json`)
          writeFileSync(rootStatPath, JSON.stringify(stats, null, 2), 'utf-8')
        }
      } else {
        // If no stats file, still copy the build output
        cpSync(distPath, buildOutputDir, {recursive: true})
      }
    }

    return true
  } catch (error) {
    console.error(`❌ Failed to build ${appName} with variant ${variant}:`, (error as Error).message)
    return false
  }
}

function getBundleInfo(appName: string, variant: string): BundleInfo | null {
  // Read stats from central location in monorepo root
  const statPath = join(statsDir, `${appName}-${variant}.json`)

  if (!existsSync(statPath)) {
    return null
  }

  try {
    const content = readFileSync(statPath, 'utf-8')
    const stats: BundleStats = JSON.parse(content)
    const totalSize = calculateTotalSize(stats)
    const breakdown = calculateBreakdown(stats)

    const chunks: Record<string, BundleChunk> = {}

    if (!stats) {
      // stats is undefined, skip
    } else if (Array.isArray(stats)) {
      stats.forEach((module, index) => {
        if (!module.filename) return
        // Use actualSize (saved during build), fall back to other metrics
        const actualSize = module.actualSize ?? module.size ?? module.parsedSize ?? module.statSize ?? 0
        chunks[module.filename || module.label || `module-${index}`] = {...module, actualSize}
      })
    } else if ('chunks' in stats && stats.chunks) {
      for (const [key, chunk] of Object.entries(stats.chunks)) {
        if (!chunk?.filename) continue
        const actualSize = chunk.actualSize ?? chunk.size ?? chunk.parsedSize ?? chunk.statSize ?? 0
        chunks[chunk.filename || key] = {...chunk, actualSize}
      }
    } else if (stats.modules && Array.isArray(stats.modules)) {
      stats.modules.forEach((module, index) => {
        if (!module.filename) return
        const actualSize = module.actualSize ?? module.size ?? module.parsedSize ?? module.statSize ?? 0
        chunks[module.filename || module.label || `module-${index}`] = {...module, actualSize}
      })
    }

    return {
      app: appName,
      variant,
      totalSize,
      chunks,
      breakdown,
    }
  } catch (error) {
    console.error(`Error reading ${statPath}:`, (error as Error).message)
    return null
  }
}

function displayBundleSizes(): void {
  console.log('\n📦 Bundle Size Comparison - All Variants\n')
  console.log('='.repeat(120))

  // Build all variants for all apps
  console.log('\n🔨 Building all variants...\n')
  for (const app of apps) {
    for (const variant of variants) {
      if (!buildApp(app, variant)) {
        console.error(`Build of ${app}-${variant} FAILED`)
        process.exit(1)
      }
    }
  }

  console.log('\n📊 Collecting bundle statistics...\n')

  // Collect all bundle info for all apps and variants
  const allResults: BundleInfo[] = []
  for (const app of apps) {
    for (const variant of variants) {
      const info = getBundleInfo(app, variant)
      if (info) {
        allResults.push(info)
      }
    }
  }

  if (allResults.length === 0) {
    console.log('\n❌ No bundle statistics found. Please run builds for all variants first.\n')
    console.log('Expected stats files in .bundle-stats/:')
    for (const app of apps) {
      for (const variant of variants) {
        console.log(`  - .bundle-stats/${app}-${variant}.json`)
      }
    }
    console.log('\n')
    return
  }

  // Create comparison table
  console.log('\n📊 Comparison Table by App:\n')

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    console.log(`${app.toUpperCase()}:`)
    console.log('-'.repeat(120))

    // Header row
    const header = `${'Variant'.padEnd(20)} ${'Total Size'.padEnd(15)} ${'Chunks'.padEnd(10)}`
    console.log(header)
    console.log('-'.repeat(120))

    // Sort by variant name for consistent display
    appResults.sort((a, b) => a.variant.localeCompare(b.variant))

    for (const result of appResults) {
      const chunkCount = Object.keys(result.chunks).length
      console.log(`${result.variant.padEnd(20)} ${formatSize(result.totalSize).padEnd(15)} ${chunkCount.toString().padEnd(10)}`)
    }

    console.log('-'.repeat(120))
    console.log('')
  }

  // Create comparison table by variant
  console.log('\n📊 Comparison Table by Variant:\n')

  for (const variant of variants) {
    const variantResults = allResults.filter(r => r.variant === variant)
    if (variantResults.length === 0) continue

    console.log(`${variant.toUpperCase()}:`)
    console.log('-'.repeat(120))

    // Header row
    const header = `${'App'.padEnd(20)} ${'Total Size'.padEnd(15)} ${'Chunks'.padEnd(10)}`
    console.log(header)
    console.log('-'.repeat(120))

    // Sort by total size descending
    variantResults.sort((a, b) => b.totalSize - a.totalSize)

    for (const result of variantResults) {
      const chunkCount = Object.keys(result.chunks).length
      console.log(`${result.app.padEnd(20)} ${formatSize(result.totalSize).padEnd(15)} ${chunkCount.toString().padEnd(10)}`)
    }

    console.log('-'.repeat(120))
    console.log('')
  }

  // Summary matrix
  console.log('\n📈 Summary Matrix (Total Size):\n')
  console.log('-'.repeat(120))

  // Header
  const matrixHeader = `${'App'.padEnd(15)} ${variants.map(v => v.padEnd(15)).join(' ')}`
  console.log(matrixHeader)
  console.log('-'.repeat(120))

  // Rows
  for (const app of apps) {
    const row: string[] = [app.padEnd(15)]
    for (const variant of variants) {
      const info = allResults.find(r => r.app === app && r.variant === variant)
      row.push((info ? formatSize(info.totalSize) : 'N/A').padEnd(15))
    }
    console.log(row.join(' '))
  }

  console.log('-'.repeat(120))

  // Detailed chunk information
  console.log('\n📋 Detailed Chunk Information:\n')

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    console.log(`\n${app.toUpperCase()}:`)
    console.log('='.repeat(120))

    for (const result of appResults) {
      console.log(`\n  Variant: ${result.variant}`)
      console.log('-'.repeat(120))

      const chunks = Object.entries(result.chunks)
        .map(([name, chunk]) => {
          const size = chunk.actualSize ?? chunk.size ?? chunk.parsedSize ?? chunk.statSize ?? 0
          return {name, size}
        })
        .sort((a, b) => b.size - a.size)

      if (chunks.length === 0) {
        console.log('    No chunks found')
        continue
      }

      for (const chunk of chunks) {
        console.log(`    ${chunk.name.padEnd(50)} ${formatSize(chunk.size)}`)
      }

      console.log(`    ${'Total'.padEnd(50)} ${formatSize(result.totalSize)}`)
    }
  }

  console.log('\n' + '='.repeat(120))
  console.log('\n')

  // Export reports
  exportToCSV(allResults)
  exportToJSON(allResults)
  exportToHTML(allResults)
  exportToMarkdown(allResults)
}

function escapeCsvValue(value: string | number): string {
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function exportToCSV(allResults: BundleInfo[]): void {
  if (allResults.length === 0) {
    return
  }

  // Summary CSV: App, Variant, Total Size (bytes), Total Size (formatted), Chunk Count, Code, CSS
  const summaryLines: string[] = [
    'App,Variant,Total Size (bytes),Total Size (formatted),Chunk Count,Code (bytes),Code (formatted),CSS (bytes),CSS (formatted)',
  ]

  for (const result of allResults.sort((a, b) => {
    const appCompare = a.app.localeCompare(b.app)
    if (appCompare !== 0) return appCompare
    return a.variant.localeCompare(b.variant)
  })) {
    const chunkCount = Object.keys(result.chunks).length
    summaryLines.push(
      `${escapeCsvValue(result.app)},${escapeCsvValue(result.variant)},${result.totalSize},${escapeCsvValue(formatSize(result.totalSize))},${chunkCount},${result.breakdown.code},${escapeCsvValue(formatSize(result.breakdown.code))},${result.breakdown.css},${escapeCsvValue(formatSize(result.breakdown.css))}`
    )
  }

  const summaryCsvPath = join(statsDir, 'bundle-sizes-summary.csv')
  writeFileSync(summaryCsvPath, summaryLines.join('\n') + '\n', 'utf-8')
  console.log(`📄 Summary CSV exported to: ${summaryCsvPath}`)

  // Detailed chunks CSV: App, Variant, Chunk Name, Chunk Size (bytes), Chunk Size (formatted)
  const chunksLines: string[] = ['App,Variant,Chunk Name,Chunk Size (bytes),Chunk Size (formatted)']

  for (const result of allResults.sort((a, b) => {
    const appCompare = a.app.localeCompare(b.app)
    if (appCompare !== 0) return appCompare
    return a.variant.localeCompare(b.variant)
  })) {
    const chunks = Object.entries(result.chunks)
      .map(([name, chunk]) => {
        const size = chunk.actualSize ?? chunk.size ?? chunk.parsedSize ?? chunk.statSize ?? 0
        return {name, size}
      })
      .sort((a, b) => b.size - a.size)

    for (const chunk of chunks) {
      chunksLines.push(
        `${escapeCsvValue(result.app)},${escapeCsvValue(result.variant)},${escapeCsvValue(chunk.name)},${chunk.size},${escapeCsvValue(formatSize(chunk.size))}`
      )
    }
  }

  const chunksCsvPath = join(statsDir, 'bundle-sizes-chunks.csv')
  writeFileSync(chunksCsvPath, chunksLines.join('\n') + '\n', 'utf-8')
  console.log(`📄 Detailed chunks CSV exported to: ${chunksCsvPath}`)

  // Summary matrix CSV: App vs Variant matrix
  const matrixLines: string[] = []
  const matrixHeader = ['App', ...variants.map(v => escapeCsvValue(v))].join(',')
  matrixLines.push(matrixHeader)

  for (const app of apps) {
    const row: string[] = [escapeCsvValue(app)]
    for (const variant of variants) {
      const info = allResults.find(r => r.app === app && r.variant === variant)
      row.push(info ? escapeCsvValue(formatSize(info.totalSize)) : 'N/A')
    }
    matrixLines.push(row.join(','))
  }

  const matrixCsvPath = join(statsDir, 'bundle-sizes-matrix.csv')
  writeFileSync(matrixCsvPath, matrixLines.join('\n') + '\n', 'utf-8')
  console.log(`📄 Summary matrix CSV exported to: ${matrixCsvPath}`)
  console.log('')
}

function exportToJSON(allResults: BundleInfo[]): void {
  if (allResults.length === 0) {
    return
  }

  const jsonReport = {
    generatedAt: new Date().toISOString(),
    apps,
    variants,
    results: allResults,
  }

  const jsonPath = join(statsDir, 'bundle-sizes-report.json')
  writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2), 'utf-8')
  console.log(`📄 JSON report exported to: ${jsonPath}`)
}

/**
 * Generates an SVG pie chart for bundle breakdown.
 * @param breakdown bundle breakdown data
 * @param size chart size in pixels
 * @returns SVG string
 */
function generatePieChart(breakdown: BundleBreakdown, size = 200): string {
  const total = breakdown.code + breakdown.css
  if (total === 0) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><text x="${size / 2}" y="${size / 2}" text-anchor="middle" fill="#666">No data</text></svg>`
  }

  const center = size / 2
  const radius = size / 2 - 10
  const colors = {
    code: '#4CAF50',
    css: '#2196F3',
  }

  let currentAngle = -Math.PI / 2 // Start at top
  const segments: Array<{path: string; color: string; label: string; percentage: number}> = []

  // Code
  if (breakdown.code > 0) {
    const angle = (breakdown.code / total) * 2 * Math.PI
    const x1 = center + radius * Math.cos(currentAngle)
    const y1 = center + radius * Math.sin(currentAngle)
    const x2 = center + radius * Math.cos(currentAngle + angle)
    const y2 = center + radius * Math.sin(currentAngle + angle)
    const largeArc = angle > Math.PI ? 1 : 0
    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
    segments.push({
      path,
      color: colors.code,
      label: 'Code',
      percentage: (breakdown.code / total) * 100,
    })
    currentAngle += angle
  }

  // CSS
  if (breakdown.css > 0) {
    const angle = (breakdown.css / total) * 2 * Math.PI
    const x1 = center + radius * Math.cos(currentAngle)
    const y1 = center + radius * Math.sin(currentAngle)
    const x2 = center + radius * Math.cos(currentAngle + angle)
    const y2 = center + radius * Math.sin(currentAngle + angle)
    const largeArc = angle > Math.PI ? 1 : 0
    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
    segments.push({
      path,
      color: colors.css,
      label: 'CSS',
      percentage: (breakdown.css / total) * 100,
    })
  }

  const paths = segments.map(s => `<path d="${s.path}" fill="${s.color}" stroke="#fff" stroke-width="2"/>`).join('')

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`
}

function exportToHTML(allResults: BundleInfo[]): void {
  if (allResults.length === 0) {
    return
  }

  const escapeHtml = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

  const summaryByAppSections: string[] = []

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    appResults.sort((a, b) => a.variant.localeCompare(b.variant))

    const rows = appResults
      .map(result => {
        const chunkCount = Object.keys(result.chunks).length
        return `<tr>
          <td>${escapeHtml(result.variant)}</td>
          <td>${escapeHtml(formatSize(result.totalSize))}</td>
          <td>${chunkCount}</td>
          <td>${escapeHtml(formatSize(result.breakdown.code))}</td>
          <td>${escapeHtml(formatSize(result.breakdown.css))}</td>
        </tr>`
      })
      .join('')

    summaryByAppSections.push(
      `<section><h2>${escapeHtml(app.toUpperCase())}</h2><table><thead><tr><th>Variant</th><th>Total Size</th><th>Chunks</th><th>Code</th><th>CSS</th></tr></thead><tbody>${rows}</tbody></table></section>`
    )
  }

  const summaryByVariantSections: string[] = []

  for (const variant of variants) {
    const variantResults = allResults.filter(r => r.variant === variant)
    if (variantResults.length === 0) continue

    variantResults.sort((a, b) => b.totalSize - a.totalSize)

    // Find minimum values for highlighting
    const totalSizes = variantResults.map(r => r.totalSize)
    const codeSizes = variantResults.map(r => r.breakdown.code)
    const cssSizes = variantResults.map(r => r.breakdown.css)
    const minTotalSize = totalSizes.length > 0 ? Math.min(...totalSizes) : 0
    const minCode = codeSizes.length > 0 ? Math.min(...codeSizes) : 0
    const minCSS = cssSizes.length > 0 ? Math.min(...cssSizes) : 0

    const rows = variantResults
      .map(result => {
        const chunkCount = Object.keys(result.chunks).length
        const totalSizeClass = result.totalSize === minTotalSize ? ' class="smallest"' : ''
        const codeClass = result.breakdown.code === minCode ? ' class="smallest"' : ''
        const cssClass = result.breakdown.css === minCSS ? ' class="smallest"' : ''
        return `<tr>
          <td>${escapeHtml(result.app)}</td>
          <td${totalSizeClass}>${escapeHtml(formatSize(result.totalSize))}</td>
          <td>${chunkCount}</td>
          <td${codeClass}>${escapeHtml(formatSize(result.breakdown.code))}</td>
          <td${cssClass}>${escapeHtml(formatSize(result.breakdown.css))}</td>
        </tr>`
      })
      .join('')

    summaryByVariantSections.push(
      `<section><h2>${escapeHtml(variant.toUpperCase())}</h2><table><thead><tr><th>App</th><th>Total Size</th><th>Chunks</th><th>Code</th><th>CSS</th></tr></thead><tbody>${rows}</tbody></table><div class="legend">📊 <strong>Legend:</strong> Highlighted cells indicate the smallest value in each comparison. Smaller is better.</div></section>`
    )
  }

  const matrixHeaderCells = variants.map(v => `<th>${escapeHtml(v)}</th>`).join('')

  // Find minimum value for each column (variant) and track which row to highlight
  const columnMins: Array<{value: number; rowIndex: number}> = variants.map(variant => {
    const variantResults = allResults.filter(r => r.variant === variant)
    if (variantResults.length === 0) {
      return {value: Infinity, rowIndex: -1}
    }
    const sizes = variantResults.map(r => r.totalSize)
    const minValue = Math.min(...sizes)
    // Find first app with this minimum value
    const firstAppWithMin = apps.findIndex(app => {
      const info = allResults.find(r => r.app === app && r.variant === variant)
      return info && info.totalSize === minValue
    })
    return {value: minValue, rowIndex: firstAppWithMin}
  })

  const matrixRows = apps
    .map((app, rowIndex) => {
      const cells = variants
        .map((variant, colIndex) => {
          const info = allResults.find(r => r.app === app && r.variant === variant)
          if (!info) {
            return '<td>N/A</td>'
          }
          const value = formatSize(info.totalSize)
          // Highlight only if this is the first row with the minimum value for this column
          const isSmallest =
            colIndex < columnMins.length && columnMins[colIndex].rowIndex === rowIndex && info.totalSize === columnMins[colIndex].value
          const cellClass = isSmallest ? ' class="smallest"' : ''
          return `<td${cellClass}>${escapeHtml(value)}</td>`
        })
        .join('')
      return `<tr><td>${escapeHtml(app)}</td>${cells}</tr>`
    })
    .join('')

  const detailedSections: string[] = []

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    const variantsHtml = appResults
      .map(result => {
        const chunks = Object.entries(result.chunks)
          .map(([name, chunk]) => {
            const size = chunk.actualSize ?? chunk.size ?? chunk.parsedSize ?? chunk.statSize ?? 0
            return {name, size}
          })
          .sort((a, b) => b.size - a.size)

        const chunkRows =
          chunks.length === 0
            ? '<tr><td colspan="2">No chunks found</td></tr>'
            : chunks
                .map(chunk => {
                  return `<tr><td>${escapeHtml(chunk.name)}</td><td>${escapeHtml(formatSize(chunk.size))}</td></tr>`
                })
                .join('')

        const totalRow = `<tr class="total-row"><td>Total</td><td>${escapeHtml(formatSize(result.totalSize))}</td></tr>`

        // Breakdown table
        const codePct = calculatePercentage(result.breakdown.code, result.totalSize)
        const cssPct = calculatePercentage(result.breakdown.css, result.totalSize)
        const breakdownTable = `<table class="breakdown-table">
          <thead><tr><th>Category</th><th>Size</th><th>Percentage</th></tr></thead>
          <tbody>
            <tr><td>Code</td><td>${escapeHtml(formatSize(result.breakdown.code))}</td><td>${codePct.toFixed(1)}%</td></tr>
            <tr><td>CSS</td><td>${escapeHtml(formatSize(result.breakdown.css))}</td><td>${cssPct.toFixed(1)}%</td></tr>
          </tbody>
        </table>`

        // Pie chart
        const pieChart = generatePieChart(result.breakdown)
        const legend = `<div class="pie-legend">
          <div class="legend-item"><span class="legend-color" style="background-color: #4CAF50;"></span> Code (${codePct.toFixed(1)}%)</div>
          <div class="legend-item"><span class="legend-color" style="background-color: #2196F3;"></span> CSS (${cssPct.toFixed(1)}%)</div>
        </div>`

        return `<section>
          <h3>Variant: ${escapeHtml(result.variant)}</h3>
          <div class="breakdown-container">
            <div class="pie-chart-container">
              ${pieChart}
              ${legend}
            </div>
            <div class="breakdown-table-container">
              ${breakdownTable}
            </div>
          </div>
          <table><thead><tr><th>Chunk</th><th>Size</th></tr></thead><tbody>${chunkRows}${totalRow}</tbody></table>
        </section>`
      })
      .join('')

    detailedSections.push(`<section><h2>${escapeHtml(app.toUpperCase())}</h2>${variantsHtml}</section>`)
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bundle Size Report</title>
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; line-height: 1.5; }
    h1 { margin-bottom: 8px; }
    h2 { margin-top: 32px; margin-bottom: 8px; }
    h3 { margin-top: 16px; margin-bottom: 4px; }
    section { margin-bottom: 24px; }
    table { border-collapse: collapse; width: 100%; margin-top: 8px; }
    th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; font-size: 13px; }
    th { background-color: #f4f4f4; }
    tr:nth-child(even) { background-color: #fafafa; }
    .total-row { font-weight: 600; background-color: #f0f7ff; }
    .matrix-table th, .matrix-table td { text-align: center; }
    .muted { color: #666; font-size: 12px; }
    .smallest { background-color: #e8f5e9; font-weight: 600; }
    .legend { margin: 16px 0; padding: 12px; background-color: #f5f5f5; border-left: 4px solid #4CAF50; font-size: 13px; }
    .breakdown-container { display: flex; gap: 24px; margin: 16px 0; align-items: flex-start; }
    .pie-chart-container { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .pie-legend { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
    .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
    .legend-color { width: 16px; height: 16px; border-radius: 3px; display: inline-block; }
    .breakdown-table-container { flex: 1; }
    .breakdown-table { width: auto; min-width: 300px; }
    @media (max-width: 768px) {
      .breakdown-container { flex-direction: column; }
    }
  </style>
</head>
<body>
  <h1>Bundle Size Report</h1>
  <p class="muted">Generated at ${escapeHtml(new Date().toISOString())}</p>

  <section>
    <h2>Summary Matrix (Total Size)</h2>
    <table class="matrix-table">
      <thead>
        <tr>
          <th>App</th>
          ${matrixHeaderCells}
        </tr>
      </thead>
      <tbody>
        ${matrixRows}
      </tbody>
    </table>
    <div class="legend">📊 <strong>Legend:</strong> Highlighted cells indicate the smallest value in each comparison. Smaller is better.</div>
  </section>

  <section>
    <h2>Comparison by App</h2>
    ${summaryByAppSections.join('')}
  </section>

  <section>
    <h2>Comparison by Variant</h2>
    ${summaryByVariantSections.join('')}
  </section>

  <section>
    <h2>Detailed Chunk Information</h2>
    ${detailedSections.join('')}
  </section>
</body>
</html>
`

  const htmlPath = join(statsDir, 'bundle-sizes-report.html')
  writeFileSync(htmlPath, html, 'utf-8')
  console.log(`📄 HTML report exported to: ${htmlPath}`)
}

function exportToMarkdown(allResults: BundleInfo[]): void {
  if (allResults.length === 0) {
    return
  }

  const escapeMarkdown = (value: string): string => {
    // Escape markdown special characters
    return value.replace(/\|/g, '\\|').replace(/\n/g, ' ')
  }

  const markdownSections: string[] = []

  // Title and metadata
  markdownSections.push('# Bundle Size Report\n')
  markdownSections.push(`Generated at: ${new Date().toISOString()}\n`)

  // Summary Matrix
  markdownSections.push('## Summary Matrix (Total Size)\n')
  const matrixHeader = ['App', ...variants.map(v => escapeMarkdown(v))].join(' | ')
  markdownSections.push(`| ${matrixHeader} |`)
  markdownSections.push(`| ${variants.map(() => '---').join(' | ')} | --- |`)

  // Find minimum value for each column (variant) and track which row to highlight
  const columnMins: Array<{value: number; rowIndex: number}> = variants.map(variant => {
    const variantResults = allResults.filter(r => r.variant === variant)
    if (variantResults.length === 0) {
      return {value: Infinity, rowIndex: -1}
    }
    const sizes = variantResults.map(r => r.totalSize)
    const minValue = Math.min(...sizes)
    // Find first app with this minimum value
    const firstAppWithMin = apps.findIndex(app => {
      const info = allResults.find(r => r.app === app && r.variant === variant)
      return info && info.totalSize === minValue
    })
    return {value: minValue, rowIndex: firstAppWithMin}
  })

  for (let rowIndex = 0; rowIndex < apps.length; rowIndex++) {
    const app = apps[rowIndex]
    const row: string[] = [escapeMarkdown(app)]
    for (let colIndex = 0; colIndex < variants.length; colIndex++) {
      const variant = variants[colIndex]
      const info = allResults.find(r => r.app === app && r.variant === variant)
      if (!info) {
        row.push('N/A')
      } else {
        const value = formatSize(info.totalSize)
        // Highlight only if this is the first row with the minimum value for this column
        const isSmallest =
          colIndex < columnMins.length && columnMins[colIndex].rowIndex === rowIndex && info.totalSize === columnMins[colIndex].value
        const formatted = isSmallest ? `**${escapeMarkdown(value)}**` : escapeMarkdown(value)
        row.push(formatted)
      }
    }
    markdownSections.push(`| ${row.join(' | ')} |`)
  }

  markdownSections.push('> **Legend:** Bold values indicate the smallest value in each comparison. Smaller is better.\n')

  // Comparison by App
  markdownSections.push('## Comparison by App\n')

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    appResults.sort((a, b) => a.variant.localeCompare(b.variant))

    markdownSections.push(`### ${app.toUpperCase()}\n`)
    markdownSections.push('| Variant | Total Size | Chunks | Code | CSS |')
    markdownSections.push('| --- | --- | --- | --- | --- |')

    for (const result of appResults) {
      const chunkCount = Object.keys(result.chunks).length
      markdownSections.push(
        `| ${escapeMarkdown(result.variant)} | ${escapeMarkdown(formatSize(result.totalSize))} | ${chunkCount} | ${escapeMarkdown(formatSize(result.breakdown.code))} | ${escapeMarkdown(formatSize(result.breakdown.css))} |`
      )
    }

    markdownSections.push('')
  }

  // Comparison by Variant
  markdownSections.push('## Comparison by Variant\n')

  for (const variant of variants) {
    const variantResults = allResults.filter(r => r.variant === variant)
    if (variantResults.length === 0) continue

    variantResults.sort((a, b) => b.totalSize - a.totalSize)

    // Find minimum values for highlighting
    const totalSizes = variantResults.map(r => r.totalSize)
    const codeSizes = variantResults.map(r => r.breakdown.code)
    const cssSizes = variantResults.map(r => r.breakdown.css)
    const minTotalSize = totalSizes.length > 0 ? Math.min(...totalSizes) : 0
    const minCode = codeSizes.length > 0 ? Math.min(...codeSizes) : 0
    const minCSS = cssSizes.length > 0 ? Math.min(...cssSizes) : 0

    markdownSections.push(`### ${variant.toUpperCase()}\n`)
    markdownSections.push('| App | Total Size | Chunks | Code | CSS |')
    markdownSections.push('| --- | --- | --- | --- | --- |')

    for (const result of variantResults) {
      const chunkCount = Object.keys(result.chunks).length
      const totalSizeFormatted =
        result.totalSize === minTotalSize
          ? `**${escapeMarkdown(formatSize(result.totalSize))}**`
          : escapeMarkdown(formatSize(result.totalSize))
      const codeFormatted =
        result.breakdown.code === minCode
          ? `**${escapeMarkdown(formatSize(result.breakdown.code))}**`
          : escapeMarkdown(formatSize(result.breakdown.code))
      const cssFormatted =
        result.breakdown.css === minCSS
          ? `**${escapeMarkdown(formatSize(result.breakdown.css))}**`
          : escapeMarkdown(formatSize(result.breakdown.css))
      markdownSections.push(
        `| ${escapeMarkdown(result.app)} | ${totalSizeFormatted} | ${chunkCount} | ${codeFormatted} | ${cssFormatted} |`
      )
    }

    markdownSections.push('> **Legend:** Bold values indicate the smallest value in each comparison. Smaller is better.\n')
  }

  // Detailed Chunk Information
  markdownSections.push('## Detailed Chunk Information\n')

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    markdownSections.push(`### ${app.toUpperCase()}\n`)

    for (const result of appResults) {
      markdownSections.push(`#### Variant: ${result.variant}\n`)

      // Breakdown section
      const codePct = calculatePercentage(result.breakdown.code, result.totalSize)
      const cssPct = calculatePercentage(result.breakdown.css, result.totalSize)
      markdownSections.push('**Bundle Breakdown:**\n')
      markdownSections.push('| Category | Size | Percentage |')
      markdownSections.push('| --- | --- | --- |')
      markdownSections.push(`| Code | ${escapeMarkdown(formatSize(result.breakdown.code))} | ${codePct.toFixed(1)}% |`)
      markdownSections.push(`| CSS | ${escapeMarkdown(formatSize(result.breakdown.css))} | ${cssPct.toFixed(1)}% |`)
      markdownSections.push('')

      const chunks = Object.entries(result.chunks)
        .map(([name, chunk]) => {
          const size = chunk.actualSize ?? chunk.size ?? chunk.parsedSize ?? chunk.statSize ?? 0
          return {name, size}
        })
        .sort((a, b) => b.size - a.size)

      if (chunks.length === 0) {
        markdownSections.push('No chunks found\n')
      } else {
        markdownSections.push('**Chunks:**\n')
        markdownSections.push('| Chunk | Size |')
        markdownSections.push('| --- | --- |')

        for (const chunk of chunks) {
          markdownSections.push(`| ${escapeMarkdown(chunk.name)} | ${escapeMarkdown(formatSize(chunk.size))} |`)
        }

        markdownSections.push(`| **Total** | **${escapeMarkdown(formatSize(result.totalSize))}** |`)
      }

      markdownSections.push('')
    }
  }

  const markdown = markdownSections.join('\n')
  const markdownPath = join(statsDir, 'bundle-sizes-report.md')
  writeFileSync(markdownPath, markdown, 'utf-8')
  console.log(`📄 Markdown report exported to: ${markdownPath}`)
}

displayBundleSizes()
