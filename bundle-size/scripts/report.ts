/* eslint-disable no-console */

// Re-export functions from split modules
export {exportToCSV} from './report-csv.ts'
export {exportToHTML} from './report-html.ts'
export {exportToMarkdown} from './report-mdx.ts'
export {
  calculatePerformanceMetrics,
  escapeCsvValue,
  exportToJSON,
  generatePieChart,
  generateVegaLiteChart,
  generateVegaLitePieChart,
  saveSVGFile,
  saveVegaLiteFile,
} from './report-common.ts'

import type {BundleInfo} from './tool.ts'
import {formatSize, formatSizeWithCompression} from './utils.ts'

/**
 * Displays bundle size comparison results in the console.
 * @param allResults bundle info results
 * @param apps list of app names
 * @param variants list of variant names
 * @param activeBuildTools list of active build tools
 */
export function displayBundleSizes(
  allResults: BundleInfo[],
  apps: readonly string[],
  variants: readonly string[],
  activeBuildTools: readonly string[]
): void {
  console.log('\n📦 Bundle Size Comparison - All Variants\n')
  console.log(`Build Tools: ${activeBuildTools.map(t => t.toUpperCase()).join(', ')}`)
  console.log('='.repeat(120))

  if (allResults.length === 0) {
    console.log(`\n❌ No bundle statistics found. Please run builds for all variants first.\n`)
    console.log(`Expected stats files in .bundle-stats/ (using ${activeBuildTools.join(' and ')}):`)
    for (const tool of activeBuildTools) {
      for (const app of apps) {
        for (const variant of variants) {
          console.log(`  - .bundle-stats/${app}-${variant}-${tool}.json`)
        }
      }
    }
    console.log('\n')
    return
  }

  // Create comparison table by app and build tool
  console.log('\n📊 Comparison Table by App:\n')

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    console.log(`${app.toUpperCase()}:`)
    console.log('-'.repeat(120))

    // Header row - include build tool if multiple tools are used
    const hasMultipleTools = activeBuildTools.length > 1
    const header = hasMultipleTools
      ? `${'Variant'.padEnd(20)} ${'Build Tool'.padEnd(12)} ${'Total Size'.padEnd(40)} ${'Chunks'.padEnd(10)}`
      : `${'Variant'.padEnd(20)} ${'Total Size'.padEnd(40)} ${'Chunks'.padEnd(10)}`
    console.log(header)
    console.log('-'.repeat(120))

    // Sort by variant name, then by build tool for consistent display
    appResults.sort((a, b) => {
      const variantCompare = a.variant.localeCompare(b.variant)
      if (variantCompare !== 0) return variantCompare
      return a.buildTool.localeCompare(b.buildTool)
    })

    for (const result of appResults) {
      const chunkCount = Object.keys(result.chunks).length
      if (hasMultipleTools) {
        console.log(
          `${result.variant.padEnd(20)} ${result.buildTool.padEnd(12)} ${formatSizeWithCompression(result.totalSize, result.totalSizeGzip).padEnd(40)} ${chunkCount.toString().padEnd(10)}`
        )
      } else {
        console.log(
          `${result.variant.padEnd(20)} ${formatSizeWithCompression(result.totalSize, result.totalSizeGzip).padEnd(40)} ${chunkCount.toString().padEnd(10)}`
        )
      }
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

    // Header row - include build tool if multiple tools are used
    const hasMultipleTools = activeBuildTools.length > 1
    const header = hasMultipleTools
      ? `${'App'.padEnd(20)} ${'Build Tool'.padEnd(12)} ${'Total Size'.padEnd(40)} ${'Chunks'.padEnd(10)}`
      : `${'App'.padEnd(20)} ${'Total Size'.padEnd(40)} ${'Chunks'.padEnd(10)}`
    console.log(header)
    console.log('-'.repeat(120))

    // Sort by total size descending, then by build tool
    variantResults.sort((a, b) => {
      const sizeCompare = b.totalSize - a.totalSize
      if (sizeCompare !== 0) return sizeCompare
      return a.buildTool.localeCompare(b.buildTool)
    })

    for (const result of variantResults) {
      const chunkCount = Object.keys(result.chunks).length
      if (hasMultipleTools) {
        console.log(
          `${result.app.padEnd(20)} ${result.buildTool.padEnd(12)} ${formatSizeWithCompression(result.totalSize, result.totalSizeGzip).padEnd(40)} ${chunkCount.toString().padEnd(10)}`
        )
      } else {
        console.log(
          `${result.app.padEnd(20)} ${formatSizeWithCompression(result.totalSize, result.totalSizeGzip).padEnd(40)} ${chunkCount.toString().padEnd(10)}`
        )
      }
    }

    console.log('-'.repeat(120))
    console.log('')
  }

  // Summary matrix - show both tools if available
  if (activeBuildTools.length > 1) {
    // Show comparison matrix for each build tool
    for (const tool of activeBuildTools) {
      console.log(`\n📈 Summary Matrix (Total Size) - ${tool.toUpperCase()}:\n`)
      console.log('-'.repeat(120))

      // Header
      const matrixHeader = `${'App'.padEnd(15)} ${variants.map(v => v.padEnd(15)).join(' ')}`
      console.log(matrixHeader)
      console.log('-'.repeat(120))

      // Rows
      for (const app of apps) {
        const row: string[] = [app.padEnd(15)]
        for (const variant of variants) {
          const info = allResults.find(r => r.app === app && r.variant === variant && r.buildTool === tool)
          row.push((info ? formatSize(info.totalSize) : 'N/A').padEnd(15))
        }
        console.log(row.join(' '))
      }

      console.log('-'.repeat(120))
    }

    // Show comparison between tools
    console.log(`\n📊 Build Tool Comparison:\n`)
    console.log('-'.repeat(120))
    const comparisonHeader = `${'App'.padEnd(15)} ${'Variant'.padEnd(20)} ${'Vite Size'.padEnd(15)} ${'Rspack Size'.padEnd(15)} ${'Difference'.padEnd(15)}`
    console.log(comparisonHeader)
    console.log('-'.repeat(120))

    for (const app of apps) {
      for (const variant of variants) {
        const viteResult = allResults.find(r => r.app === app && r.variant === variant && r.buildTool === 'vite')
        const rspackResult = allResults.find(r => r.app === app && r.variant === variant && r.buildTool === 'rspack')

        if (viteResult && rspackResult) {
          const diff = rspackResult.totalSize - viteResult.totalSize
          const diffFormatted = diff >= 0 ? `+${formatSize(diff)}` : formatSize(diff)
          console.log(
            `${app.padEnd(15)} ${variant.padEnd(20)} ${formatSize(viteResult.totalSize).padEnd(15)} ${formatSize(rspackResult.totalSize).padEnd(15)} ${diffFormatted.padEnd(15)}`
          )
        }
      }
    }
    console.log('-'.repeat(120))
  } else {
    // Single tool matrix
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
  }

  // Detailed chunk information
  console.log('\n📋 Detailed Chunk Information:\n')

  const hasMultipleTools = activeBuildTools.length > 1

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    console.log(`\n${app.toUpperCase()}:`)
    console.log('='.repeat(120))

    for (const result of appResults) {
      const variantLabel = hasMultipleTools ? `${result.variant} (${result.buildTool})` : result.variant
      console.log(`\n  Variant: ${variantLabel}`)
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

      console.log(`    ${'Total'.padEnd(50)} ${formatSizeWithCompression(result.totalSize, result.totalSizeGzip)}`)

      // Duplicate packages information
      if (result.duplicates.duplicateCount > 0) {
        console.log(`\n    Duplicate Packages (${result.duplicates.duplicateCount} packages):`)
        console.log(`    ${'Package'.padEnd(40)} ${'Occurrences'.padEnd(15)} ${'Total Size'.padEnd(15)} ${'Wasted Size'.padEnd(15)}`)
        console.log(`    ${'-'.repeat(85)}`)

        for (const dup of result.duplicates.packages) {
          const uniqueSize = dup.totalSize / dup.occurrences
          const wastedSize = dup.totalSize - uniqueSize
          console.log(
            `    ${dup.packageName.padEnd(40)} ${dup.occurrences.toString().padEnd(15)} ${formatSize(dup.totalSize).padEnd(15)} ${formatSize(wastedSize).padEnd(15)}`
          )
        }

        console.log(`    ${'Total Wasted Size'.padEnd(40)} ${formatSize(result.duplicates.totalDuplicateSize)}`)
      } else {
        console.log(`\n    ✅ No duplicate packages found`)
      }
    }
  }

  console.log('\n' + '='.repeat(120))
  console.log('\n')

  // Duplicate packages summary
  console.log('\n🔄 Duplicate Packages Summary:\n')
  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    console.log(`${app.toUpperCase()}:`)
    console.log('-'.repeat(120))
    const header = `${'Variant'.padEnd(20)} ${'Duplicates'.padEnd(15)} ${'Wasted Size'.padEnd(15)}`
    console.log(header)
    console.log('-'.repeat(120))

    for (const result of appResults.sort((a, b) => a.variant.localeCompare(b.variant))) {
      const duplicateInfo = result.duplicates.duplicateCount > 0 ? `${result.duplicates.duplicateCount} packages` : 'None'
      const wastedSize = result.duplicates.totalDuplicateSize > 0 ? formatSize(result.duplicates.totalDuplicateSize) : '0 B'
      console.log(`${result.variant.padEnd(20)} ${duplicateInfo.padEnd(15)} ${wastedSize.padEnd(15)}`)
    }
    console.log('-'.repeat(120))
    console.log('')
  }

  console.log('\n' + '='.repeat(120))
  console.log('\n')
}
