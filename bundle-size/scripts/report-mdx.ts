/* eslint-disable no-console */

import {writeFileSync} from 'fs'
import {join} from 'path'
import type {BundleInfo} from './tool.ts'
import {calculatePercentage} from './tool.ts'
import {AVERAGE_4G_SPEED_BPS, SLOW_3G_SPEED_BPS} from './performance-constants.ts'
import {formatSize, formatSizeWithCompression} from './utils.ts'
import {
  calculateColumnMins,
  calculatePerformanceMetrics,
  formatDiffKB,
  generateVegaLiteChart,
  generateVegaLitePieChart,
  incrementExportedChartsCount,
  saveVegaLiteFile,
} from './report-common.ts'

/**
 * Exports bundle size results to Markdown format.
 * @param allResults bundle info results
 * @param apps list of app names
 * @param variants list of variant names
 * @param activeBuildTools list of active build tools
 * @param statsDir directory to save Markdown file
 */
export function exportToMarkdown(
  allResults: BundleInfo[],
  apps: readonly string[],
  variants: readonly string[],
  activeBuildTools: readonly string[],
  statsDir: string
): void {
  if (allResults.length === 0) {
    return
  }

  const escapeMarkdown = (value: string): string => {
    // Escape markdown special characters
    return value.replace(/\|/g, '\\|').replace(/\n/g, ' ')
  }

  const toValidIdentifier = (str: string): string => {
    // Convert to camelCase and ensure it starts with a letter
    const camelCase = str
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join('')
    // Ensure it starts with a letter
    return /^[a-zA-Z]/.test(camelCase) ? camelCase : `chart${camelCase}`
  }

  const hasMultipleTools = activeBuildTools.length > 1

  const markdownSections: string[] = []

  // Title and metadata
  // markdownSections.push('# Bundle Size Report\n')
  // markdownSections.push(`Generated at: ${new Date().toISOString()}\n`)
  // if (activeBuildTools.length > 1) {
  //   markdownSections.push(`Build Tools: ${activeBuildTools.map(t => t.toUpperCase()).join(', ')}\n`)
  // }

  // Summary Matrix
  markdownSections.push('### Summary Matrix (Total Size)\n')
  const matrixHeader = ['App', ...variants.map(v => `${escapeMarkdown(v)}<sub>(raw/gzip)</sub>`)].join(' | ')
  markdownSections.push(`| ${matrixHeader} |`)
  markdownSections.push(`| ${variants.map(() => '---').join(' | ')} | --- |`)

  // Find minimum value for each column (variant) and track which row to highlight
  const columnMins = calculateColumnMins(allResults, apps, variants)

  for (let rowIndex = 0; rowIndex < apps.length; rowIndex++) {
    const app = apps[rowIndex]
    const row: string[] = [escapeMarkdown(app)]
    for (let colIndex = 0; colIndex < variants.length; colIndex++) {
      const variant = variants[colIndex]
      const info = allResults.find(r => r.app === app && r.variant === variant)
      if (!info) {
        row.push('N/A')
      } else {
        const value = formatSizeWithCompression(info.totalSize, info.totalSizeGzip)
        // Highlight only if this is the first row with the minimum value for this column
        const isSmallest =
          colIndex < columnMins.length && columnMins[colIndex].rowIndex === rowIndex && info.totalSize === columnMins[colIndex].value
        const minValue = colIndex < columnMins.length ? columnMins[colIndex].value : info.totalSize
        const minGzipValue = colIndex < columnMins.length ? columnMins[colIndex].gzipValue : (info.totalSizeGzip ?? info.totalSize)
        const diffToMin = info.totalSize - minValue
        const diffGzipToMin = info.totalSizeGzip !== undefined ? info.totalSizeGzip - minGzipValue : undefined
        const diffHint = ` (${formatDiffKB(diffToMin, diffGzipToMin)})`
        const formatted = isSmallest ? `**${escapeMarkdown(value)}${diffHint}**` : `${escapeMarkdown(value)}${diffHint}`
        row.push(formatted)
      }
    }
    markdownSections.push(`| ${row.join(' | ')} |`)
  }

  markdownSections.push('> **Legend:** Bold values indicate the smallest value in each comparison. Smaller is better.\n')

  // Comparison by App
  markdownSections.push('### Comparison by App\n')

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    appResults.sort((a, b) => a.variant.localeCompare(b.variant))

    markdownSections.push(`#### ${app.toUpperCase()}\n`)
    const appTableHeader = hasMultipleTools
      ? '| Variant | Build Tool | Total Size<sub>(raw/gzip)</sub> | Chunks | Code<sub>(raw/gzip)</sub> | CSS<sub>(raw/gzip)</sub> | Duplicates | Wasted Size |'
      : '| Variant | Total Size<sub>(raw/gzip)</sub> | Chunks | Code<sub>(raw/gzip)</sub> | CSS<sub>(raw/gzip)</sub> | Duplicates | Wasted Size |'
    const appTableSeparator = hasMultipleTools
      ? '| --- | --- | --- | --- | --- | --- | --- | --- |'
      : '| --- | --- | --- | --- | --- | --- | --- |'
    markdownSections.push(appTableHeader)
    markdownSections.push(appTableSeparator)

    for (const result of appResults) {
      const chunkCount = Object.keys(result.chunks).length
      if (hasMultipleTools) {
        markdownSections.push(
          `| ${escapeMarkdown(result.variant)} | ${escapeMarkdown(result.buildTool)} | ${escapeMarkdown(formatSizeWithCompression(result.totalSize, result.totalSizeGzip))} | ${chunkCount} | ${escapeMarkdown(formatSizeWithCompression(result.breakdown.code, result.breakdownGzip?.code))} | ${escapeMarkdown(formatSizeWithCompression(result.breakdown.css, result.breakdownGzip?.css))} | ${result.duplicates.duplicateCount} | ${escapeMarkdown(formatSize(result.duplicates.totalDuplicateSize))} |`
        )
      } else {
        markdownSections.push(
          `| ${escapeMarkdown(result.variant)} | ${escapeMarkdown(formatSizeWithCompression(result.totalSize, result.totalSizeGzip))} | ${chunkCount} | ${escapeMarkdown(formatSizeWithCompression(result.breakdown.code, result.breakdownGzip?.code))} | ${escapeMarkdown(formatSizeWithCompression(result.breakdown.css, result.breakdownGzip?.css))} | ${result.duplicates.duplicateCount} | ${escapeMarkdown(formatSize(result.duplicates.totalDuplicateSize))} |`
        )
      }
    }

    markdownSections.push('')
  }

  // Comparison by Variant
  markdownSections.push('### Comparison by Variant\n')

  for (const variant of variants) {
    const variantResults = allResults.filter(r => r.variant === variant)
    if (variantResults.length === 0) continue

    variantResults.sort((a, b) => b.totalSize - a.totalSize)

    // Find minimum values for highlighting
    const totalSizes = variantResults.map(r => r.totalSize)
    const totalGzipSizes = variantResults.map(r => r.totalSizeGzip ?? r.totalSize)
    const codeSizes = variantResults.map(r => r.breakdown.code)
    const cssSizes = variantResults.map(r => r.breakdown.css)
    const minTotalSize = totalSizes.length > 0 ? Math.min(...totalSizes) : 0
    const minTotalGzipSize = totalGzipSizes.length > 0 ? Math.min(...totalGzipSizes) : 0
    const minCode = codeSizes.length > 0 ? Math.min(...codeSizes) : 0
    const minCSS = cssSizes.length > 0 ? Math.min(...cssSizes) : 0

    const wastedSizes = variantResults.map(r => r.duplicates.totalDuplicateSize)
    const minWasted = wastedSizes.length > 0 ? Math.min(...wastedSizes) : 0

    markdownSections.push(`#### ${variant.toUpperCase()}\n`)
    const variantTableHeader = hasMultipleTools
      ? '| App | Build Tool | Total Size<sub>(raw/gzip)</sub> | Chunks | Code<sub>(raw/gzip)</sub> | CSS<sub>(raw/gzip)</sub> | Duplicates | Wasted Size |'
      : '| App | Total Size<sub>(raw/gzip)</sub> | Chunks | Code<sub>(raw/gzip)</sub> | CSS<sub>(raw/gzip)</sub> | Duplicates | Wasted Size |'
    const variantTableSeparator = hasMultipleTools
      ? '| --- | --- | --- | --- | --- | --- | --- | --- |'
      : '| --- | --- | --- | --- | --- | --- | --- |'
    markdownSections.push(variantTableHeader)
    markdownSections.push(variantTableSeparator)

    for (const result of variantResults) {
      const chunkCount = Object.keys(result.chunks).length
      const diffToMin = result.totalSize - minTotalSize
      const diffGzipToMin = result.totalSizeGzip !== undefined ? result.totalSizeGzip - minTotalGzipSize : undefined
      const diffHint = diffToMin === 0 && (!diffGzipToMin || diffGzipToMin === 0) ? '' : ` (${formatDiffKB(diffToMin, diffGzipToMin)})`
      const totalSizeFormatted =
        result.totalSize === minTotalSize
          ? `**${escapeMarkdown(formatSizeWithCompression(result.totalSize, result.totalSizeGzip))}${diffHint}**`
          : `${escapeMarkdown(formatSizeWithCompression(result.totalSize, result.totalSizeGzip))}${diffHint}`
      const codeFormatted =
        result.breakdown.code === minCode
          ? `**${escapeMarkdown(formatSizeWithCompression(result.breakdown.code, result.breakdownGzip?.code))}**`
          : escapeMarkdown(formatSizeWithCompression(result.breakdown.code, result.breakdownGzip?.code))
      const cssFormatted =
        result.breakdown.css === minCSS
          ? `**${escapeMarkdown(formatSizeWithCompression(result.breakdown.css, result.breakdownGzip?.css))}**`
          : escapeMarkdown(formatSizeWithCompression(result.breakdown.css, result.breakdownGzip?.css))
      const wastedFormatted =
        result.duplicates.totalDuplicateSize === minWasted && minWasted > 0
          ? `**${escapeMarkdown(formatSize(result.duplicates.totalDuplicateSize))}**`
          : escapeMarkdown(formatSize(result.duplicates.totalDuplicateSize))
      if (hasMultipleTools) {
        markdownSections.push(
          `| ${escapeMarkdown(result.app)} | ${escapeMarkdown(result.buildTool)} | ${totalSizeFormatted} | ${chunkCount} | ${codeFormatted} | ${cssFormatted} | ${result.duplicates.duplicateCount} | ${wastedFormatted} |`
        )
      } else {
        markdownSections.push(
          `| ${escapeMarkdown(result.app)} | ${totalSizeFormatted} | ${chunkCount} | ${codeFormatted} | ${cssFormatted} | ${result.duplicates.duplicateCount} | ${wastedFormatted} |`
        )
      }
    }

    markdownSections.push('> **Legend:** Bold values indicate the smallest value in each comparison. Smaller is better.\n')

    // Add performance chart for this variant
    const slow3GData = variantResults.map(result => {
      const totalSizeGzip = result.totalSizeGzip || result.totalSize
      const metrics = calculatePerformanceMetrics(totalSizeGzip, result.breakdown.code, result.breakdown.css, SLOW_3G_SPEED_BPS)
      const label = hasMultipleTools ? `${result.app} (${result.buildTool})` : result.app
      return {label, ...metrics}
    })

    const avg4GData = variantResults.map(result => {
      const totalSizeGzip = result.totalSizeGzip || result.totalSize
      const metrics = calculatePerformanceMetrics(totalSizeGzip, result.breakdown.code, result.breakdown.css, AVERAGE_4G_SPEED_BPS)
      const label = hasMultipleTools ? `${result.app} (${result.buildTool})` : result.app
      return {label, ...metrics}
    })

    const vegaLiteChart = generateVegaLiteChart(slow3GData, avg4GData, variant)
    if (vegaLiteChart !== null && statsDir) {
      const chartsDir = join(statsDir, 'charts')
      const fileName = `performance-${variant}.json`
      const filePath = join(chartsDir, fileName)
      saveVegaLiteFile(vegaLiteChart, filePath)
      incrementExportedChartsCount()

      // Add Vega-Lite chart to markdown
      const chartImportName = `performance${toValidIdentifier(variant)}`
      markdownSections.push(`\n##### Performance Comparison (using gzip sizes)\n\n`)
      markdownSections.push(`import ${chartImportName} from '@site/static/includes/bundle-size/performance-${variant}.json';\n\n`)
      markdownSections.push(`<VegaLite spec={${chartImportName}}/>\n\n`)
    }
  }

  // Detailed Chunk Information
  markdownSections.push('### Detailed Chunk Information\n')

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    markdownSections.push(`#### ${app.toUpperCase()}\n`)

    for (const result of appResults) {
      const variantLabel = hasMultipleTools ? `${result.variant} (${result.buildTool})` : result.variant
      markdownSections.push(`##### Variant: ${variantLabel}\n`)

      // Breakdown section
      const codePct = calculatePercentage(result.breakdown.code, result.totalSize)
      const cssPct = calculatePercentage(result.breakdown.css, result.totalSize)
      markdownSections.push('**Bundle Breakdown:**\n')

      // Generate Vega-Lite pie chart (raw)
      const vegaLitePieChart = generateVegaLitePieChart(result.breakdown, result.totalSize, result.app, result.variant, 'raw')

      // Generate Vega-Lite pie chart (gzip) if available
      const vegaLitePieChartGzip =
        result.breakdownGzip && result.totalSizeGzip
          ? generateVegaLitePieChart(result.breakdownGzip, result.totalSizeGzip, result.app, result.variant, 'gzip')
          : null

      // Collect pie chart imports and components
      const pieChartImports: string[] = []
      const pieChartComponents: string[] = []

      if (vegaLitePieChart !== null && statsDir) {
        const chartsDir = join(statsDir, 'charts')
        const fileName = hasMultipleTools
          ? `pie-${result.app}-${result.variant}-${result.buildTool}.json`
          : `pie-${result.app}-${result.variant}.json`
        const filePath = join(chartsDir, fileName)
        saveVegaLiteFile(vegaLitePieChart, filePath)
        incrementExportedChartsCount()

        const pieChartImportName = `pie${toValidIdentifier(result.app)}${toValidIdentifier(result.variant)}${hasMultipleTools ? toValidIdentifier(result.buildTool) : ''}`
        pieChartImports.push(`import ${pieChartImportName} from '@site/static/includes/bundle-size/${fileName}';`)
        pieChartComponents.push(`<VegaLite spec={${pieChartImportName}}/>`)
      }

      if (vegaLitePieChartGzip !== null && statsDir) {
        const chartsDir = join(statsDir, 'charts')
        const fileName = hasMultipleTools
          ? `pie-${result.app}-${result.variant}-${result.buildTool}-gzip.json`
          : `pie-${result.app}-${result.variant}-gzip.json`
        const filePath = join(chartsDir, fileName)
        saveVegaLiteFile(vegaLitePieChartGzip, filePath)
        incrementExportedChartsCount()

        const pieChartGzipImportName = `pie${toValidIdentifier(result.app)}${toValidIdentifier(result.variant)}${hasMultipleTools ? toValidIdentifier(result.buildTool) : ''}Gzip`
        pieChartImports.push(`import ${pieChartGzipImportName} from '@site/static/includes/bundle-size/${fileName}';`)
        pieChartComponents.push(`<VegaLite spec={${pieChartGzipImportName}}/>`)
      }

      // Add pie charts section with flexbox layout
      if (pieChartImports.length > 0) {
        markdownSections.push(pieChartImports.join('\n'))
        markdownSections.push('\n\n')
        if (pieChartComponents.length > 1) {
          // Multiple charts: display side by side
          markdownSections.push(`<div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>\n`)
          pieChartComponents.forEach(component => {
            markdownSections.push(`  <div style={{flex: '1', minWidth: '300px'}}>${component}</div>\n`)
          })
          markdownSections.push(`</div>\n\n`)
        } else {
          // Single chart: display normally
          markdownSections.push(`${pieChartComponents[0]}\n\n`)
        }
      }

      markdownSections.push('| Category | Size | Percentage |')
      markdownSections.push('| --- | --- | --- |')
      markdownSections.push(
        `| Code | ${escapeMarkdown(formatSizeWithCompression(result.breakdown.code, result.breakdownGzip?.code))} | ${codePct.toFixed(1)}% |`
      )
      markdownSections.push(
        `| CSS | ${escapeMarkdown(formatSizeWithCompression(result.breakdown.css, result.breakdownGzip?.css))} | ${cssPct.toFixed(1)}% |`
      )
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

        markdownSections.push(`| **Total** | **${escapeMarkdown(formatSizeWithCompression(result.totalSize, result.totalSizeGzip))}** |`)
      }

      // Duplicate packages section
      if (result.duplicates.duplicateCount > 0) {
        markdownSections.push(`\n**Duplicate Packages (${result.duplicates.duplicateCount}):**\n`)
        markdownSections.push('| Package Name | Occurrences | Total Size | Wasted Size | Chunks |')
        markdownSections.push('| --- | --- | --- | --- | --- |')

        for (const dup of result.duplicates.packages) {
          const uniqueSize = dup.totalSize / dup.occurrences
          const wastedSize = dup.totalSize - uniqueSize
          const chunksList = dup.chunks.join(', ')
          markdownSections.push(
            `| ${escapeMarkdown(dup.packageName)} | ${dup.occurrences} | ${escapeMarkdown(formatSize(dup.totalSize))} | ${escapeMarkdown(formatSize(wastedSize))} | ${escapeMarkdown(chunksList)} |`
          )
        }

        markdownSections.push(`| **Total Wasted Size** | | | **${escapeMarkdown(formatSize(result.duplicates.totalDuplicateSize))}** | |`)
      } else {
        markdownSections.push('\n✅ **No duplicate packages found**\n')
      }

      markdownSections.push('')
    }
  }

  const markdown = markdownSections.join('\n')
  const markdownPath = join(statsDir, 'bundle-sizes-report.mdx')
  writeFileSync(markdownPath, markdown, 'utf-8')
  console.log(`📄 Markdown report exported to: ${markdownPath}`)
}
