/* eslint-disable import/no-nodejs-modules,no-console */

import {readFileSync, existsSync} from 'fs'
import {join} from 'path'

/**
 * Analyzes a bundle file and returns analysis results.
 * @param bundlePath path to the bundle file
 * @returns analysis results
 */
export function analyzeBundle(bundlePath: string) {
  const content = readFileSync(bundlePath, 'utf8')
  const size = content.length
  const sizeKB = (size / 1024).toFixed(2)

  const hasFluentBundleImport = content.includes('@fluent/bundle')
  const hasFluentBundleCode = Boolean(
    content.match(/class\s+\w+.*\{[^}]*FluentBundle|new FluentBundle\(/g)
  )
  const hasFluentLocalizationEngine = content.includes('FluentLocalizationEngine') || 
    content.match(/class\s+\w+.*FluentLocalizationEngine|new FluentLocalizationEngine\(/g) !== null
  const hasFormViewerLite = content.includes('FormViewerLite')
  const hasFormViewer = content.includes('FormViewer') && !content.includes('FormViewerLite')

  return {
    size,
    sizeKB,
    hasFluentBundleImport,
    hasFluentBundleCode,
    hasFluentLocalizationEngine,
    hasFormViewerLite,
    hasFormViewer,
  }
}

/**
 * Prints bundle analysis results.
 * @param results analysis results
 * @param expectedComponent expected component name ('FormViewerLite' or 'FormViewer')
 */
export function printAnalysis({results, expectedComponent}: {
  results: ReturnType<typeof analyzeBundle>,
  expectedComponent: "FormViewerLite" | "FormViewer"
}) {
  console.log('Bundle size:', results.sizeKB, 'KB')
}

/**
 * Gets the dist directory path.
 * @param baseDir package directory
 * @returns dist directory path
 */
export function getDistTestDir(baseDir: string): string {
  return join(baseDir, 'dist')
}

/**
 * Reads vite-bundle-analyzer stats from JSON file.
 * @param statsPath path to stats JSON file
 * @returns parsed stats object or null if file doesn't exist
 */
function readViteStats(statsPath: string): unknown | null {
  if (!existsSync(statsPath)) {
    return null
  }
  try {
    const content = readFileSync(statsPath, 'utf8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

/**
 * Recursively extracts module information from vite-bundle-analyzer format.
 * Format: { filename, label, parsedSize/statSize, groups: [...] }
 * @param node stats node (can be chunk or module)
 * @param modules array to collect modules
 * @param useStatSize whether to use statSize instead of parsedSize
 * @returns total size of the node
 */
function extractModulesRecursive(
  node: unknown,
  modules: Array<{path: string; size: number; sizeKB: string}>,
  useStatSize = false
): number {
  if (!node || typeof node !== 'object') {
    return 0
  }

  const nodeObj = node as Record<string, unknown>
  
  // Get node size - vite-bundle-analyzer uses parsedSize or statSize
  let nodeSize = 0
  if (useStatSize && typeof nodeObj.statSize === 'number') {
    nodeSize = nodeObj.statSize
  } else if (typeof nodeObj.parsedSize === 'number') {
    nodeSize = nodeObj.parsedSize
  } else if (typeof nodeObj.size === 'number') {
    nodeSize = nodeObj.size
  }

  const nodeFilename = typeof nodeObj.filename === 'string' ? nodeObj.filename : ''
  const nodeLabel = typeof nodeObj.label === 'string' ? nodeObj.label : ''
  const nodePath = nodeFilename || nodeLabel

  // Check if this node has groups (children) - vite-bundle-analyzer uses 'groups'
  const hasGroups = Array.isArray(nodeObj.groups) && nodeObj.groups.length > 0
  
  // Process children first to get accurate sizes
  let childrenSize = 0
  if (hasGroups) {
    for (const child of nodeObj.groups) {
      childrenSize += extractModulesRecursive(child, modules, useStatSize)
    }
    // If node size wasn't set, use sum of children
    if (nodeSize === 0 && childrenSize > 0) {
      nodeSize = childrenSize
    }
  }

  // If this is a leaf node (module) with a filename and size, add it
  if (nodePath && !hasGroups && nodeSize > 0) {
    // Check if we haven't already added this module (avoid duplicates)
    const existingModule = modules.find(m => m.path === nodePath)
    if (!existingModule) {
      modules.push({
        path: nodePath,
        size: nodeSize,
        sizeKB: (nodeSize / 1024).toFixed(2),
      })
    } else {
      // If module exists, add to its size
      existingModule.size += nodeSize
      existingModule.sizeKB = (existingModule.size / 1024).toFixed(2)
    }
  }

  return nodeSize
}

/**
 * Converts KiB to bytes.
 * @param value value in KiB
 * @returns value in bytes
 */
function KiBToBytes(value: number): number {
  return value * 1024
}

/**
 * Extracts size information from vite-bundle-analyzer stats.
 * vite-bundle-analyzer outputs a summary format with bundle, assets, extensions, etc.
 * @param stats vite-bundle-analyzer stats object
 * @returns size information object
 */
function extractSizeInfo(stats: unknown): {
  totalSize: number
  totalSizeKB: string
  chunks: Array<{name: string; size: number; sizeKB: string}>
  modules: Array<{path: string; size: number; sizeKB: string}>
} {
  if (!stats || typeof stats !== 'object') {
    return {
      totalSize: 0,
      totalSizeKB: '0.00',
      chunks: [],
      modules: [],
    }
  }

  const chunks: Array<{name: string; size: number; sizeKB: string}> = []
  const modules: Array<{path: string; size: number; sizeKB: string}> = []
  let totalSize = 0

  // vite-bundle-analyzer outputs an array of chunks
  // Each chunk has: filename, label, parsedSize, statSize, source[], stats[]
  if (Array.isArray(stats)) {
    for (const chunk of stats) {
      if (chunk && typeof chunk === 'object') {
        const chunkObj = chunk as Record<string, unknown>
        const chunkName = typeof chunkObj.filename === 'string' ? chunkObj.filename : 
                         typeof chunkObj.label === 'string' ? chunkObj.label : 'unknown'
        
        // Get chunk size
        let chunkSize = 0
        if (typeof chunkObj.parsedSize === 'number') {
          chunkSize = chunkObj.parsedSize
        } else if (typeof chunkObj.statSize === 'number') {
          chunkSize = chunkObj.statSize
        }

        chunks.push({
          name: chunkName,
          size: chunkSize,
          sizeKB: (chunkSize / 1024).toFixed(2),
        })
        totalSize += chunkSize

        // Extract modules from source array (uses parsedSize)
        if (Array.isArray(chunkObj.source)) {
          for (const sourceItem of chunkObj.source) {
            extractModulesRecursive(sourceItem, modules, false)
          }
        }

        // Also extract from stats array (uses statSize) if source didn't yield modules
        if (modules.length === 0 && Array.isArray(chunkObj.stats)) {
          for (const statItem of chunkObj.stats) {
            extractModulesRecursive(statItem, modules, true)
          }
        }
      }
    }
  } else if (stats && typeof stats === 'object') {
    const statsObj = stats as Record<string, unknown>
    
    // Handle summary format as fallback
    if (statsObj.bundle && typeof statsObj.bundle === 'object') {
      const bundle = statsObj.bundle as Record<string, unknown>
      if (typeof bundle.value === 'number') {
        const unit = typeof bundle.unit === 'string' ? bundle.unit : 'KiB'
        if (unit === 'KiB' || unit === 'KB') {
          totalSize = KiBToBytes(bundle.value)
        } else if (unit === 'bytes' || unit === 'B') {
          totalSize = bundle.value
        } else {
          totalSize = KiBToBytes(bundle.value)
        }
      }
    }
  }

  // Fallback: use totalSize if available and no chunks found
  if (totalSize === 0 && stats && typeof stats === 'object' && !Array.isArray(stats)) {
    const statsObj = stats as Record<string, unknown>
    if (typeof statsObj.totalSize === 'number') {
      totalSize = statsObj.totalSize
    }
  }

  // Calculate total from modules if still zero
  if (totalSize === 0 && modules.length > 0) {
    totalSize = modules.reduce((sum, m) => sum + m.size, 0)
  }

  return {
    totalSize,
    totalSizeKB: (totalSize / 1024).toFixed(2),
    chunks,
    modules,
  }
}

/**
 * Calculates diff between lite and full bundle stats.
 * @param liteSizeInfo lite bundle size information
 * @param fullSizeInfo full bundle size information
 * @returns diff object
 */
function calculateDiff(
  liteSizeInfo: ReturnType<typeof extractSizeInfo>,
  fullSizeInfo: ReturnType<typeof extractSizeInfo>
) {

  const sizeDiff = fullSizeInfo.totalSize - liteSizeInfo.totalSize
  const sizeDiffKB = (sizeDiff / 1024).toFixed(2)
  const sizeDiffPercent = liteSizeInfo.totalSize > 0
    ? ((sizeDiff / liteSizeInfo.totalSize) * 100).toFixed(2)
    : '0.00'

  // Compare modules
  const liteModuleMap = new Map<string, number>()
  const fullModuleMap = new Map<string, number>()

  for (const module of liteSizeInfo.modules) {
    liteModuleMap.set(module.path, module.size)
  }

  for (const module of fullSizeInfo.modules) {
    fullModuleMap.set(module.path, module.size)
  }

  const onlyInFull: Array<{path: string; size: number; sizeKB: string}> = []
  const onlyInLite: Array<{path: string; size: number; sizeKB: string}> = []
  const inBoth: Array<{
    path: string
    liteSize: number
    fullSize: number
    diff: number
    diffKB: string
    diffPercent: string
  }> = []

  // Find modules only in full
  for (const [path, size] of fullModuleMap.entries()) {
    if (!liteModuleMap.has(path)) {
      onlyInFull.push({
        path,
        size,
        sizeKB: (size / 1024).toFixed(2),
      })
    }
  }

  // Find modules only in lite
  for (const [path, size] of liteModuleMap.entries()) {
    if (!fullModuleMap.has(path)) {
      onlyInLite.push({
        path,
        size,
        sizeKB: (size / 1024).toFixed(2),
      })
    }
  }

  // Find modules in both and calculate diff
  for (const [path, liteSize] of liteModuleMap.entries()) {
    const fullSize = fullModuleMap.get(path)
    if (fullSize !== undefined) {
      const diff = fullSize - liteSize
      const diffPercent = liteSize > 0 ? ((diff / liteSize) * 100).toFixed(2) : '0.00'
      inBoth.push({
        path,
        liteSize,
        fullSize,
        diff,
        diffKB: (diff / 1024).toFixed(2),
        diffPercent,
      })
    }
  }

  // Sort by absolute diff size (descending)
  inBoth.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
  onlyInFull.sort((a, b) => b.size - a.size)
  onlyInLite.sort((a, b) => b.size - a.size)

  return {
    bundleSize: {
      lite: {
        bytes: liteSizeInfo.totalSize,
        kb: liteSizeInfo.totalSizeKB,
      },
      full: {
        bytes: fullSizeInfo.totalSize,
        kb: fullSizeInfo.totalSizeKB,
      },
      diff: {
        bytes: sizeDiff,
        kb: sizeDiffKB,
        percent: sizeDiffPercent,
      },
    },
    chunks: {
      lite: liteSizeInfo.chunks.length,
      full: fullSizeInfo.chunks.length,
      diff: fullSizeInfo.chunks.length - liteSizeInfo.chunks.length,
    },
    modules: {
      lite: liteSizeInfo.modules.length,
      full: fullSizeInfo.modules.length,
      diff: fullSizeInfo.modules.length - liteSizeInfo.modules.length,
      onlyInFull: onlyInFull.length,
      onlyInLite: onlyInLite.length,
      inBoth: inBoth.length,
    },
    moduleDetails: {
      onlyInFull: onlyInFull.slice(0, 20), // Top 20
      onlyInLite: onlyInLite.slice(0, 20), // Top 20
      largestDiffs: inBoth.slice(0, 20), // Top 20 largest differences
    },
  }
}

/**
 * Generates combined statistics object from vite-bundle-analyzer output.
 * @param distDir dist directory path
 * @param liteResults lite bundle analysis results (for component detection)
 * @param fullResults full bundle analysis results (for component detection)
 * @returns statistics object
 */
export function generateStats(
  distDir: string,
  liteResults: ReturnType<typeof analyzeBundle>,
  fullResults: ReturnType<typeof analyzeBundle>
) {
  // TODO do not write custom stat
  const liteStatsPath = join(distDir, 'stats-lite.json')
  const fullStatsPath = join(distDir, 'stats-full.json')
  
  const liteStats = readViteStats(liteStatsPath)
  const fullStats = readViteStats(fullStatsPath)

  let liteSizeInfo = extractSizeInfo(liteStats)
  let fullSizeInfo = extractSizeInfo(fullStats)

  // Fallback to actual bundle file sizes if stats extraction returned zeros
  if (liteSizeInfo.totalSize === 0 && liteResults.size > 0) {
    liteSizeInfo = {
      totalSize: liteResults.size,
      totalSizeKB: liteResults.sizeKB,
      chunks: [{
        name: 'lite.js',
        size: liteResults.size,
        sizeKB: liteResults.sizeKB,
      }],
      modules: [],
    }
  }

  if (fullSizeInfo.totalSize === 0 && fullResults.size > 0) {
    fullSizeInfo = {
      totalSize: fullResults.size,
      totalSizeKB: fullResults.sizeKB,
      chunks: [{
        name: 'full.js',
        size: fullResults.size,
        sizeKB: fullResults.sizeKB,
      }],
      modules: [],
    }
  }

  const diff = calculateDiff(liteSizeInfo, fullSizeInfo)

  return {
    timestamp: new Date().toISOString(),
    bundles: {
      lite: {
        stats: liteStats,
        size: {
          bytes: liteSizeInfo.totalSize,
          kb: liteSizeInfo.totalSizeKB,
          chunks: liteSizeInfo.chunks.length,
          modules: liteSizeInfo.modules.length,
        },
        analysis: {
          hasFluentBundleImport: liteResults.hasFluentBundleImport,
          hasFluentBundleCode: liteResults.hasFluentBundleCode,
          hasFluentLocalizationEngine: liteResults.hasFluentLocalizationEngine,
          hasFormViewer: liteResults.hasFormViewer,
          hasFormViewerLite: liteResults.hasFormViewerLite,
        },
      },
      full: {
        stats: fullStats,
        size: {
          bytes: fullSizeInfo.totalSize,
          kb: fullSizeInfo.totalSizeKB,
          chunks: fullSizeInfo.chunks.length,
          modules: fullSizeInfo.modules.length,
        },
        analysis: {
          hasFluentBundleImport: fullResults.hasFluentBundleImport,
          hasFluentBundleCode: fullResults.hasFluentBundleCode,
          hasFluentLocalizationEngine: fullResults.hasFluentLocalizationEngine,
          hasFormViewer: fullResults.hasFormViewer,
          hasFormViewerLite: fullResults.hasFormViewerLite,
        },
      },
    },
    diff,
    treeShaking: {
      liteExcludesFluent: !liteResults.hasFluentLocalizationEngine && !liteResults.hasFluentBundleCode,
      fullIncludesFluent: fullResults.hasFluentLocalizationEngine || fullResults.hasFluentBundleCode,
      liteHasOnlyLite: liteResults.hasFormViewerLite && !liteResults.hasFormViewer,
      fullHasOnlyFull: fullResults.hasFormViewer && !fullResults.hasFormViewerLite,
    },
  }
}

/**
 * Saves statistics to a JSON file.
 * @param stats statistics object
 * @param outputPath path to save the stats file
 */
// Custom stats writing removed per requirements.
