/* eslint-disable no-console */

import {writeFileSync} from 'fs'
import {join} from 'path'
import {AVERAGE_4G_SPEED_BPS, SLOW_3G_SPEED_BPS} from './performance-constants.ts'
import {
  calculateColumnMins,
  calculatePerformanceMetrics,
  formatDiffKB,
  generatePieChart,
  generateVegaLiteChart,
  generateVegaLitePieChart,
  getExportedChartsCount,
  incrementExportedChartsCount,
  resetExportedChartsCount,
  saveSVGFile,
  saveVegaLiteFile,
} from './report-common.ts'
import type {BundleInfo} from './tool.ts'
import {calculatePercentage} from './tool.ts'
import {formatSize, formatSizeWithCompressionHTML} from './utils.ts'

/**
 * Exports bundle size results to HTML format.
 * @param allResults bundle info results
 * @param apps list of app names
 * @param variants list of variant names
 * @param activeBuildTools list of active build tools
 * @param statsDir directory to save HTML file
 */
export function exportToHTML(
  allResults: BundleInfo[],
  apps: readonly string[],
  variants: readonly string[],
  activeBuildTools: readonly string[],
  statsDir: string
): void {
  if (allResults.length === 0) {
    return
  }

  const escapeHtml = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

  /**
   * Generates a performance comparison chart SVG showing all variants with both 3G and 4G data.
   * @param slow3GData array of {label, lcp, tti, parseTime} objects for Slow 3G
   * @param avg4GData array of {label, lcp, tti, parseTime} objects for Average 4G
   * @param variant variant name for file naming
   * @param statsDir directory to save chart files (optional)
   * @returns SVG string
   */
  const generatePerformanceChart = (
    slow3GData: Array<{label: string; lcp: number; tti: number; parseTime: number}>,
    avg4GData: Array<{label: string; lcp: number; tti: number; parseTime: number}>,
    variant: string,
    statsDir?: string
  ): string => {
    if (slow3GData.length === 0 && avg4GData.length === 0) return ''

    const width = 1000
    const height = 500
    const padding = {top: 40, right: 150, bottom: 120, left: 80}
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Find max value for scaling (across both datasets)
    const allData = [...slow3GData, ...avg4GData]
    const maxValue = Math.max(...allData.map(d => Math.max(d.lcp, d.tti, d.parseTime)))

    // Scale to fit chart (add 20% padding)
    const scale = (chartHeight * 0.8) / maxValue
    const dataLength = Math.max(slow3GData.length, avg4GData.length)
    const groupWidth = chartWidth / dataLength
    const barWidth = groupWidth * 0.08 // 5 bars per group (2 for 3G, 2 for 4G, 1 combined Parse) - smaller to prevent overlap

    const bars: string[] = []
    const labels: string[] = []

    // Draw bars for each variant
    for (let index = 0; index < dataLength; index++) {
      const groupX = padding.left + index * groupWidth + groupWidth / 2
      const yBase = padding.top + chartHeight

      const slow3GItem = slow3GData[index]
      const avg4GItem = avg4GData[index]

      // Slow 3G bars (darker, left side)
      if (slow3GItem) {
        const lcp3GHeight = slow3GItem.lcp * scale
        const lcp3GX = groupX - barWidth * 3.5
        bars.push(
          `<rect x="${lcp3GX}" y="${yBase - lcp3GHeight}" width="${barWidth}" height="${lcp3GHeight}" fill="#2E7D32" opacity="0.8"><title>3G LCP: ${slow3GItem.lcp.toFixed(0)}ms</title></rect>`
        )

        const tti3GHeight = slow3GItem.tti * scale
        const tti3GX = groupX - barWidth * 2.0
        bars.push(
          `<rect x="${tti3GX}" y="${yBase - tti3GHeight}" width="${barWidth}" height="${tti3GHeight}" fill="#1565C0" opacity="0.8"><title>3G TTI: ${slow3GItem.tti.toFixed(0)}ms</title></rect>`
        )
      }

      // Combined Parse bar (average of 3G and 4G parse times, centered)
      const parse3G = slow3GItem?.parseTime || 0
      const parse4G = avg4GItem?.parseTime || 0
      const avgParse = parse3G > 0 && parse4G > 0 ? (parse3G + parse4G) / 2 : parse3G || parse4G
      if (avgParse > 0) {
        const parseHeight = avgParse * scale
        const parseX = groupX - barWidth * 0.5
        bars.push(
          `<rect x="${parseX}" y="${yBase - parseHeight}" width="${barWidth}" height="${parseHeight}" fill="#FF9800" opacity="0.8"><title>Parse: ${avgParse.toFixed(0)}ms (3G: ${parse3G.toFixed(0)}ms, 4G: ${parse4G.toFixed(0)}ms)</title></rect>`
        )
      }

      // Average 4G bars (lighter, right side)
      if (avg4GItem) {
        const lcp4GHeight = avg4GItem.lcp * scale
        const lcp4GX = groupX + barWidth * 1.0
        bars.push(
          `<rect x="${lcp4GX}" y="${yBase - lcp4GHeight}" width="${barWidth}" height="${lcp4GHeight}" fill="#4CAF50" opacity="0.8"><title>4G LCP: ${avg4GItem.lcp.toFixed(0)}ms</title></rect>`
        )

        const tti4GHeight = avg4GItem.tti * scale
        const tti4GX = groupX + barWidth * 2.5
        bars.push(
          `<rect x="${tti4GX}" y="${yBase - tti4GHeight}" width="${barWidth}" height="${tti4GHeight}" fill="#2196F3" opacity="0.8"><title>4G TTI: ${avg4GItem.tti.toFixed(0)}ms</title></rect>`
        )
      }

      // Label (use label from either dataset)
      const label = slow3GItem?.label || avg4GItem?.label || ''
      if (label) {
        const labelParts = label.split(' ')
        labelParts.forEach((part, partIndex) => {
          labels.push(
            `<text x="${groupX}" y="${yBase + 35 + partIndex * 12}" text-anchor="middle" font-size="10" fill="#333" transform="rotate(-45 ${groupX} ${yBase + 35 + partIndex * 12})">${escapeHtml(part)}</text>`
          )
        })
      }
    }

    // Y-axis labels
    const yAxisLabels: string[] = []
    const ySteps = 5
    for (let i = 0; i <= ySteps; i++) {
      const value = (maxValue / ySteps) * i
      const y = padding.top + chartHeight - value * scale
      yAxisLabels.push(
        `<text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#666">${value.toFixed(0)}ms</text>`
      )
    }

    // Grid lines
    const gridLines: string[] = []
    for (let i = 0; i <= ySteps; i++) {
      const y = padding.top + chartHeight - (maxValue / ySteps) * i * scale
      gridLines.push(`<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e0e0e0" stroke-width="1"/>`)
    }

    const svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="white"/>
      ${gridLines.join('')}
      ${bars.join('')}
      ${yAxisLabels.join('')}
      ${labels.join('')}
      <text x="${width / 2}" y="${height - 15}" text-anchor="middle" font-size="14" font-weight="600" fill="#333">Performance Comparison: Slow 3G vs Average 4G</text>
      <g transform="translate(${width - padding.right + 10}, ${padding.top + 10})">
        <text x="0" y="0" font-size="12" font-weight="600" fill="#333">Legend:</text>
      </g>
      <g transform="translate(${width - padding.right + 10}, ${padding.top + 30})">
        <rect width="14" height="14" fill="#2E7D32" opacity="0.8"/>
        <text x="18" y="12" font-size="11" fill="#333">3G LCP</text>
      </g>
      <g transform="translate(${width - padding.right + 10}, ${padding.top + 50})">
        <rect width="14" height="14" fill="#4CAF50" opacity="0.8"/>
        <text x="18" y="12" font-size="11" fill="#333">4G LCP</text>
      </g>
      <g transform="translate(${width - padding.right + 10}, ${padding.top + 70})">
        <rect width="14" height="14" fill="#1565C0" opacity="0.8"/>
        <text x="18" y="12" font-size="11" fill="#333">3G TTI</text>
      </g>
      <g transform="translate(${width - padding.right + 10}, ${padding.top + 90})">
        <rect width="14" height="14" fill="#2196F3" opacity="0.8"/>
        <text x="18" y="12" font-size="11" fill="#333">4G TTI</text>
      </g>
      <g transform="translate(${width - padding.right + 10}, ${padding.top + 110})">
        <rect width="14" height="14" fill="#FF9800" opacity="0.8"/>
        <text x="18" y="12" font-size="11" fill="#333">Parse</text>
      </g>
    </svg>`

    // Export SVG to file if statsDir is provided
    if (statsDir) {
      const chartsDir = join(statsDir, 'charts')
      const fileName = `performance-${variant}.svg`
      const filePath = join(chartsDir, fileName)
      saveSVGFile(svgContent, filePath)
      incrementExportedChartsCount()
    }

    return svgContent
  }

  const hasMultipleTools = activeBuildTools.length > 1

  const summaryByAppSections: string[] = []

  for (const app of apps) {
    const appResults = allResults.filter(r => r.app === app)
    if (appResults.length === 0) continue

    appResults.sort((a, b) => a.variant.localeCompare(b.variant))

    const rows = appResults
      .map(result => {
        const chunkCount = Object.keys(result.chunks).length
        const detailId = hasMultipleTools
          ? `detail-${result.app}-${result.variant}-${result.buildTool}`
          : `detail-${result.app}-${result.variant}`
        const variantLink = `<a href="#${detailId}">${escapeHtml(result.variant)}</a>`
        if (hasMultipleTools) {
          return `<tr>
            <td>${variantLink}</td>
            <td>${escapeHtml(result.buildTool)}</td>
            <td>${formatSizeWithCompressionHTML(result.totalSize, result.totalSizeGzip)}</td>
            <td>${chunkCount}</td>
            <td>${formatSizeWithCompressionHTML(result.breakdown.code, result.breakdownGzip?.code)}</td>
            <td>${formatSizeWithCompressionHTML(result.breakdown.css, result.breakdownGzip?.css)}</td>
            <td>${result.duplicates.duplicateCount}</td>
            <td>${escapeHtml(formatSize(result.duplicates.totalDuplicateSize))}</td>
          </tr>`
        } else {
          return `<tr>
            <td>${variantLink}</td>
            <td>${formatSizeWithCompressionHTML(result.totalSize, result.totalSizeGzip)}</td>
            <td>${chunkCount}</td>
            <td>${formatSizeWithCompressionHTML(result.breakdown.code, result.breakdownGzip?.code)}</td>
            <td>${formatSizeWithCompressionHTML(result.breakdown.css, result.breakdownGzip?.css)}</td>
            <td>${result.duplicates.duplicateCount}</td>
            <td>${escapeHtml(formatSize(result.duplicates.totalDuplicateSize))}</td>
          </tr>`
        }
      })
      .join('')

    const headerRow = hasMultipleTools
      ? `<tr><th>Variant</th><th>Build Tool</th><th>Total Size<sub>(raw/gzip)</sub></th><th>Chunks</th><th>Code<sub>(raw/gzip)</sub></th><th>CSS<sub>(raw/gzip)</sub></th><th>Duplicates</th><th>Wasted Size</th></tr>`
      : `<tr><th>Variant</th><th>Total Size<sub>(raw/gzip)</sub></th><th>Chunks</th><th>Code<sub>(raw/gzip)</sub></th><th>CSS<sub>(raw/gzip)</sub></th><th>Duplicates</th><th>Wasted Size</th></tr>`
    const appSectionId = `app-${app}`
    summaryByAppSections.push(
      `<section id="${appSectionId}"><h2>${escapeHtml(app.toUpperCase())}</h2><table><thead>${headerRow}</thead><tbody>${rows}</tbody></table></section>`
    )
  }

  const summaryByVariantSections: string[] = []

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

    const rows = variantResults
      .map(result => {
        const chunkCount = Object.keys(result.chunks).length
        const totalSizeClass = result.totalSize === minTotalSize ? ' class="smallest"' : ''
        const codeClass = result.breakdown.code === minCode ? ' class="smallest"' : ''
        const cssClass = result.breakdown.css === minCSS ? ' class="smallest"' : ''
        const wastedClass = result.duplicates.totalDuplicateSize === minWasted && minWasted > 0 ? ' class="smallest"' : ''
        const diffToMin = result.totalSize - minTotalSize
        const diffGzipToMin = result.totalSizeGzip !== undefined ? result.totalSizeGzip - minTotalGzipSize : undefined
        const diffHint =
          diffToMin === 0 && (!diffGzipToMin || diffGzipToMin === 0)
            ? ''
            : `<br/><span class="diff-hint" title="Difference to smallest variant: ${formatDiffKB(diffToMin, diffGzipToMin)}">(${formatDiffKB(diffToMin, diffGzipToMin)})</span><br/>`
        if (hasMultipleTools) {
          return `<tr>
            <td>${escapeHtml(result.app)}</td>
            <td>${escapeHtml(result.buildTool)}</td>
            <td${totalSizeClass}>${formatSizeWithCompressionHTML(result.totalSize, result.totalSizeGzip)}${diffHint}</td>
            <td>${chunkCount}</td>
            <td${codeClass}>${formatSizeWithCompressionHTML(result.breakdown.code, result.breakdownGzip?.code)}</td>
            <td${cssClass}>${formatSizeWithCompressionHTML(result.breakdown.css, result.breakdownGzip?.css)}</td>
            <td>${result.duplicates.duplicateCount}</td>
            <td${wastedClass}>${escapeHtml(formatSize(result.duplicates.totalDuplicateSize))}</td>
          </tr>`
        } else {
          return `<tr>
            <td>${escapeHtml(result.app)}</td>
            <td${totalSizeClass}>${formatSizeWithCompressionHTML(result.totalSize, result.totalSizeGzip)}${diffHint}</td>
            <td>${chunkCount}</td>
            <td${codeClass}>${formatSizeWithCompressionHTML(result.breakdown.code, result.breakdownGzip?.code)}</td>
            <td${cssClass}>${formatSizeWithCompressionHTML(result.breakdown.css, result.breakdownGzip?.css)}</td>
            <td>${result.duplicates.duplicateCount}</td>
            <td${wastedClass}>${escapeHtml(formatSize(result.duplicates.totalDuplicateSize))}</td>
          </tr>`
        }
      })
      .join('')

    const variantHeaderRow = hasMultipleTools
      ? `<tr><th>App</th><th>Build Tool</th><th>Total Size<sub>(raw/gzip)</sub></th><th>Chunks</th><th>Code<sub>(raw/gzip)</sub></th><th>CSS<sub>(raw/gzip)</sub></th><th>Duplicates</th><th>Wasted Size</th></tr>`
      : `<tr><th>App</th><th>Total Size<sub>(raw/gzip)</sup></th><th>Chunks</th><th>Code<sub>(raw/gzip)</sub></th><th>CSS<sub>(raw/gzip)</sub></th><th>Duplicates</th><th>Wasted Size</th></tr>`

    // Generate performance charts for all variants together
    // Calculate metrics for slow 3G
    const slow3GData = variantResults.map(result => {
      const totalSizeGzip = result.totalSizeGzip || result.totalSize
      const metrics = calculatePerformanceMetrics(totalSizeGzip, result.breakdown.code, result.breakdown.css, SLOW_3G_SPEED_BPS)
      const label = hasMultipleTools ? `${result.app} (${result.buildTool})` : result.app
      return {label, ...metrics}
    })

    // Calculate metrics for average 4G
    const avg4GData = variantResults.map(result => {
      const totalSizeGzip = result.totalSizeGzip || result.totalSize
      const metrics = calculatePerformanceMetrics(totalSizeGzip, result.breakdown.code, result.breakdown.css, AVERAGE_4G_SPEED_BPS)
      const label = hasMultipleTools ? `${result.app} (${result.buildTool})` : result.app
      return {label, ...metrics}
    })

    const combinedChart = generatePerformanceChart(slow3GData, avg4GData, variant, statsDir)

    // Generate Vega-Lite chart
    const vegaLiteChart = generateVegaLiteChart(slow3GData, avg4GData, variant)
    if (vegaLiteChart && statsDir) {
      const chartsDir = join(statsDir, 'charts')
      const fileName = `performance-${variant}.json`
      const filePath = join(chartsDir, fileName)
      saveVegaLiteFile(vegaLiteChart, filePath)
      incrementExportedChartsCount()
    }

    // Hidden Vega-Lite chart code for copy functionality
    const hiddenVegaLiteCode = vegaLiteChart
      ? `<div class="hidden-vega-lite-code" data-chart-id="performance-${variant}" style="display: none;">${escapeHtml(JSON.stringify(vegaLiteChart, null, 2))}</div>`
      : ''

    summaryByVariantSections.push(
      `<section><h2>${escapeHtml(variant.toUpperCase())}</h2><table><thead>${variantHeaderRow}</thead><tbody>${rows}</tbody></table><div class="legend">📊 <strong>Legend:</strong> Highlighted cells indicate the smallest value in each comparison. Smaller is better.</div>
      <div class="performance-charts-section">
        <h3>Performance Comparison (using gzip sizes)</h3>
        <div class="performance-charts-container">
          <div class="performance-chart-wrapper">
<!--            <button class="copy-vega-lite-btn" data-chart-id="performance-${variant}" data-chart-type="vega-lite" title="Copy Vega-Lite chart JSON to clipboard">📋 Vega</button>-->
            <div class="performance-chart">${combinedChart}</div>
          </div>
        </div>
      </div>${hiddenVegaLiteCode}</section>`
    )
  }

  const matrixHeaderCells = variants.map(v => `<th>${escapeHtml(v)}<sub>(raw/gzip)</sub></th>`).join('')

  // Find minimum value for each column (variant) and track which row to highlight
  const columnMins = calculateColumnMins(allResults, apps, variants)

  const matrixRows = apps
    .map((app, rowIndex) => {
      const cells = variants
        .map((variant, colIndex) => {
          const info = allResults.find(r => r.app === app && r.variant === variant)
          if (!info) {
            return '<td>N/A</td>'
          }
          // Highlight only if this is the first row with the minimum value for this column
          const isSmallest =
            colIndex < columnMins.length && columnMins[colIndex].rowIndex === rowIndex && info.totalSize === columnMins[colIndex].value
          const value = formatSizeWithCompressionHTML(info.totalSize, info.totalSizeGzip)
          const cellClass = isSmallest ? ' class="smallest"' : ''
          const minValue = colIndex < columnMins.length ? columnMins[colIndex].value : info.totalSize
          const minGzipValue = colIndex < columnMins.length ? columnMins[colIndex].gzipValue : (info.totalSizeGzip ?? info.totalSize)
          const diffToMin = info.totalSize - minValue
          const diffGzipToMin = info.totalSizeGzip !== undefined ? info.totalSizeGzip - minGzipValue : undefined
          const diffHint = `<br/><span class="diff-hint" title="Difference to smallest variant: ${formatDiffKB(
            diffToMin,
            diffGzipToMin
          )}">(${formatDiffKB(diffToMin, diffGzipToMin)})</span>`
          return `<td${cellClass}>${value}${diffHint}</td>`
        })
        .join('')
      const appLink = `<a href="#app-${app}">${escapeHtml(app)}</a>`
      return `<tr><td>${appLink}</td>${cells}</tr>`
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

        const totalRow = `<tr class="total-row"><td>Total<sub>(raw/gzip)</sub></td><td>${formatSizeWithCompressionHTML(result.totalSize, result.totalSizeGzip)}</td></tr>`

        // Breakdown table
        const codePct = calculatePercentage(result.breakdown.code, result.totalSize)
        const cssPct = calculatePercentage(result.breakdown.css, result.totalSize)
        const breakdownTable = `<table class="breakdown-table">
          <thead><tr><th>Category</th><th>Size<sub>(raw/gzip)</sub></th><th>Percentage</th></tr></thead>
          <tbody>
            <tr><td>Code</td><td>${formatSizeWithCompressionHTML(result.breakdown.code, result.breakdownGzip?.code)}</td><td>${codePct.toFixed(1)}%</td></tr>
            <tr><td>CSS</td><td>${formatSizeWithCompressionHTML(result.breakdown.css, result.breakdownGzip?.css)}</td><td>${cssPct.toFixed(1)}%</td></tr>
          </tbody>
        </table>`

        // Pure SVG pie charts with integrated legend (raw and gzip)
        const rawPieChart = generatePieChart(
          result.breakdown,
          result.totalSize,
          `${result.app} (raw)`,
          result.variant,
          result.buildTool,
          statsDir
        )
        const gzipPieChart =
          result.breakdownGzip && result.totalSizeGzip
            ? generatePieChart(
                result.breakdownGzip,
                result.totalSizeGzip,
                `${result.app} (gzip)`,
                result.variant,
                result.buildTool,
                statsDir
              )
            : ''

        // Generate Vega-Lite pie chart
        const vegaLitePieChart = generateVegaLitePieChart(result.breakdown, result.totalSize, result.app, result.variant)
        const pieChartId = hasMultipleTools
          ? `pie-${result.app}-${result.variant}-${result.buildTool}`
          : `pie-${result.app}-${result.variant}`
        if (vegaLitePieChart && statsDir) {
          const chartsDir = join(statsDir, 'charts')
          const fileName = hasMultipleTools
            ? `pie-${result.app}-${result.variant}-${result.buildTool}.json`
            : `pie-${result.app}-${result.variant}.json`
          const filePath = join(chartsDir, fileName)
          saveVegaLiteFile(vegaLitePieChart, filePath)
          incrementExportedChartsCount()
        }

        // Hidden Vega-Lite pie chart code for copy functionality
        const hiddenVegaLitePieCode = vegaLitePieChart
          ? `<div class="hidden-vega-lite-code" data-chart-id="${pieChartId}" style="display: none;">${escapeHtml(JSON.stringify(vegaLitePieChart, null, 2))}</div>`
          : ''

        // Duplicate packages table
        let duplicatesTable = ''
        if (result.duplicates.duplicateCount > 0) {
          const duplicateRows = result.duplicates.packages
            .map(dup => {
              const uniqueSize = dup.totalSize / dup.occurrences
              const wastedSize = dup.totalSize - uniqueSize
              const chunksList = dup.chunks.join(', ')
              return `<tr>
                <td>${escapeHtml(dup.packageName)}</td>
                <td>${dup.occurrences}</td>
                <td>${escapeHtml(formatSize(dup.totalSize))}</td>
                <td>${escapeHtml(formatSize(wastedSize))}</td>
                <td>${escapeHtml(chunksList)}</td>
              </tr>`
            })
            .join('')
          duplicatesTable = `<h4>Duplicate Packages (${result.duplicates.duplicateCount})</h4>
            <table>
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Occurrences</th>
                  <th>Total Size</th>
                  <th>Wasted Size</th>
                  <th>Chunks</th>
                </tr>
              </thead>
              <tbody>
                ${duplicateRows}
                <tr class="total-row">
                  <td colspan="3"><strong>Total Wasted Size</strong></td>
                  <td colspan="2"><strong>${escapeHtml(formatSize(result.duplicates.totalDuplicateSize))}</strong></td>
                </tr>
              </tbody>
            </table>`
        } else {
          duplicatesTable = '<p>✅ No duplicate packages found</p>'
        }

        const variantLabel = hasMultipleTools
          ? `${escapeHtml(result.variant)} (${escapeHtml(result.buildTool)})`
          : escapeHtml(result.variant)
        const detailId = hasMultipleTools
          ? `detail-${result.app}-${result.variant}-${result.buildTool}`
          : `detail-${result.app}-${result.variant}`

        return `<section id="${detailId}">
          <h3>Variant: ${variantLabel}</h3>
          <div class="breakdown-container">
            <div class="pie-charts-row">
              <div class="pie-chart-wrapper">
<!--              <button class="copy-vega-lite-pie-btn" data-chart-id="${pieChartId}" data-chart-type="vega-lite" title="Copy Vega-Lite chart JSON to clipboard">📋 Vega</button>-->
                <div class="pie-chart">${rawPieChart}</div>
              </div>
              ${
                gzipPieChart
                  ? `<div class="pie-chart-wrapper">
                <div class="pie-chart">${gzipPieChart}</div>
              </div>`
                  : ''
              }
            </div>
            <div class="breakdown-table-container">
              ${breakdownTable}
            </div>
          </div>
          <table><thead><tr><th>Chunk</th><th>Size</th></tr></thead><tbody>${chunkRows}${totalRow}</tbody></table>
          ${duplicatesTable}${hiddenVegaLitePieCode}
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
    h4 { margin-top: 12px; margin-bottom: 4px; font-size: 14px; }
    section { margin-bottom: 24px; }
    table { border-collapse: collapse; width: 100%; margin-top: 8px; }
    th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; font-size: 13px; }
    th { background-color: #f4f4f4; }
    tr:nth-child(even) { background-color: #fafafa; }
    .total-row { font-weight: 600; background-color: #f0f7ff; }
    .matrix-table th, .matrix-table td { text-align: center; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    section[id] { scroll-margin-top: 20px; }
    sub { vertical-align: baseline; margin-left: 0.5ch }
    .diff-hint { color: #666; font-size: 11px; font-weight: normal; }
    .performance-charts-section { margin: 32px 0; padding: 20px; background-color: #f9f9f9; border-radius: 4px; }
    .performance-charts-section h3 { margin-top: 0; margin-bottom: 20px; }
    .performance-charts-container { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; }
    .performance-chart-wrapper { position: relative; flex: 1; min-width: 400px; max-width: 100%; }
    .performance-chart { width: 100%; }
    .performance-chart svg { width: 100%; height: auto; border: 1px solid #e0e0e0; border-radius: 4px; background-color: white; }
    .copy-vega-lite-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 6px 12px;
      background-color: #FF9800;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      z-index: 10;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: background-color 0.2s, opacity 0.2s;
      opacity: 0;
      pointer-events: none;
    }
    .performance-chart-wrapper:hover .copy-vega-lite-btn {
      opacity: 1;
      pointer-events: auto;
    }
    .copy-vega-lite-btn:hover {
      background-color: #F57C00;
    }
    .copy-vega-lite-btn:active {
      background-color: #E65100;
    }
    .copy-vega-lite-btn.copied {
      background-color: #2196F3;
      opacity: 1;
      pointer-events: auto;
    }
    .hidden-vega-lite-code { display: none; }
    .muted { color: #666; font-size: 12px; }
    .smallest { background-color: #e8f5e9; font-weight: 600; }
    .legend { margin: 16px 0; padding: 12px; background-color: #f5f5f5; border-left: 4px solid #4CAF50; font-size: 13px; }
    .breakdown-container { display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; margin: 16px 0; align-items: flex-start; }
    .pie-charts-row { display: flex; flex-wrap: wrap; gap: 24px; width: 100%; }
    .breakdown-container svg { flex-shrink: 0; }
    .breakdown-table-container { flex: 1; width: 100%; }
    .breakdown-table { width: auto; min-width: 300px; }
    .pie-chart-wrapper { position: relative; }
    .copy-vega-lite-pie-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 6px 12px;
      background-color: #FF9800;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      z-index: 10;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: background-color 0.2s, opacity 0.2s;
      opacity: 0;
      pointer-events: none;
    }
    .pie-chart-wrapper:hover .copy-vega-lite-pie-btn {
      opacity: 1;
      pointer-events: auto;
    }
    .copy-vega-lite-pie-btn:hover {
      background-color: #F57C00;
    }
    .copy-vega-lite-pie-btn:active {
      background-color: #E65100;
    }
    .copy-vega-lite-pie-btn.copied {
      background-color: #2196F3;
      opacity: 1;
      pointer-events: auto;
    }
    @media (max-width: 768px) {
      .breakdown-container { flex-direction: column; }
    }
  </style>
</head>
<body>
  <h1>Bundle Size Report</h1>
<!--  <p class="muted">Generated at ${escapeHtml(new Date().toISOString())}</p>-->
  ${activeBuildTools.length > 1 ? `<p class="muted">Build Tools: ${activeBuildTools.map(t => escapeHtml(t.toUpperCase())).join(', ')}</p>` : ''}

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
  <script>
    // Copy chart code to clipboard (Vega-Lite)
    document.addEventListener('DOMContentLoaded', function() {
      const copyButtons = document.querySelectorAll('.copy-vega-lite-btn, .copy-vega-lite-pie-btn');
      copyButtons.forEach(button => {
        button.addEventListener('click', function() {
          const chartId = this.getAttribute('data-chart-id');
          const chartType = this.getAttribute('data-chart-type');
          const selector = \`.hidden-vega-lite-code[data-chart-id="\${chartId}"]\`;
          const hiddenCode = document.querySelector(selector);
          
          if (hiddenCode) {
            const chartCode = hiddenCode.textContent || hiddenCode.innerText;
            
            // Copy to clipboard
            navigator.clipboard.writeText(chartCode).then(function() {
              // Visual feedback
              const originalText = button.textContent;
              button.textContent = '✓ Copied!';
              button.classList.add('copied');
              
              setTimeout(function() {
                button.textContent = originalText;
                button.classList.remove('copied');
              }, 2000);
            }).catch(function(err) {
              console.error('Failed to copy: ', err);
              const defaultText = '📋 Vega';
              button.textContent = '✗ Failed';
              setTimeout(function() {
                button.textContent = defaultText;
              }, 2000);
            });
          }
        });
      });
    });
  </script>
  </body>
</html>
`

  const htmlPath = join(statsDir, 'bundle-sizes-report.html')
  writeFileSync(htmlPath, html, 'utf-8')
  console.log(`📄 HTML report exported to: ${htmlPath}`)
  if (getExportedChartsCount() > 0) {
    const chartsDir = join(statsDir, 'charts')
    console.log(`📊 ${getExportedChartsCount()} SVG chart(s) exported to: ${chartsDir}`)
    resetExportedChartsCount() // Reset for next export
  }
}
