import {dirname, extname, join, resolve as pathResolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {existsSync, readFileSync, statSync} from 'node:fs'
import {createLogger} from '@react-form-builder/tests-common/lib/loader/util.cjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Paths to local node_modules for this test suite
const LOCAL_NODE_MODULES = pathResolve(__dirname, 'node_modules')
const LOCAL_REACT = join(LOCAL_NODE_MODULES, 'react')
const LOCAL_REACT_DOM = join(LOCAL_NODE_MODULES, 'react-dom')
const LOCAL_SCHEDULER = join(LOCAL_NODE_MODULES, 'scheduler')
const LOCAL_TESTING_LIBRARY = join(LOCAL_NODE_MODULES, '@testing-library')

const log = createLogger('import-loader')

/**
 * Default load implementation – passes through to Node's default loader.
 */
export function load(url, context, defaultLoad) {
  return defaultLoad(url, context)
}

/**
 * Ensure a file path ends with .js if it has no extension.
 */
function ensureJsExtension(filePath) {
  const ext = extname(filePath)
  if (!ext) {
    return filePath + '.js'
  }
  return filePath
}

/**
 * Check if a file exists, and if it's a directory, try index.js inside it.
 * Returns the resolved absolute path or null if not found.
 */
function locateFile(fullPath) {
  // Try exact path first
  try {
    const stat = statSync(fullPath)
    if (stat.isFile()) {
      return fullPath
    }
    if (stat.isDirectory()) {
      const indexPath = join(fullPath, 'index.js')
      if (existsSync(indexPath)) {
        return indexPath
      }
    }
  } catch {
    // File doesn't exist, try with extensions
  }

  // If no extension, try with .js, .cjs, .mjs
  const ext = extname(fullPath)
  if (!ext) {
    for (const extension of ['.js', '.cjs', '.mjs']) {
      const withExt = fullPath + extension
      try {
        if (statSync(withExt).isFile()) {
          return withExt
        }
      } catch {
        // continue
      }
    }
  }

  return null
}

/**
 * Attempt to redirect a module request to a local copy.
 * Returns a file:// URL if successful, otherwise null.
 */
function tryRedirect(moduleName, requestedPath, localBaseDir) {
  // Strip the module name prefix and any leading slash
  let subpath = requestedPath.substring(moduleName.length)
  if (subpath.startsWith('/')) {
    subpath = subpath.substring(1)
  }

  // Default to index.js if no subpath
  if (!subpath) {
    subpath = 'index.js'
  }

  // Ensure .js extension for files without extension
  subpath = ensureJsExtension(subpath)

  // Try candidate with subpath
  let candidate = join(localBaseDir, subpath)
  let found = locateFile(candidate)

  // If not found, try to read package.json exports
  if (!found) {
    // For react/jsx-runtime, try jsx-runtime.js, jsx-runtime.cjs, etc.
    // Also try to find the actual file via package.json resolution (simplified)
    // Just try alternative extensions via locateFile already covers.
    // Additional fallback: try to find the main entry point
    if (subpath === 'index.js') {
      // Read package.json to get main field
      const pkgPath = join(localBaseDir, 'package.json')
      try {
        const pkgContent = readFileSync(pkgPath, 'utf8')
        const pkg = JSON.parse(pkgContent)
        const main = pkg.main || 'index.js'
        const mainPath = join(localBaseDir, main)
        if (existsSync(mainPath)) {
          found = mainPath
        }
      } catch {
        // ignore
      }
    }
  }

  if (found) {
    const fileUrl = new URL(`file://${found}`).toString()
    log(`${moduleName}: ${requestedPath} => ${fileUrl}`)
    return fileUrl
  }

  // Debug: log that redirection failed
  log(`Failed to redirect ${moduleName}: ${requestedPath} (candidate: ${candidate})`)
  return null
}

/**
 * Resolve hook – redirects specific packages to local copies.
 */
export function resolve(url, context, nextResolve) {
  const lowerUrl = url.toLowerCase()

  // React (but not react-dom)
  if ((lowerUrl === 'react' || lowerUrl.startsWith('react/')) && !lowerUrl.startsWith('react-dom/')) {
    const redirected = tryRedirect('react', url, LOCAL_REACT)
    if (redirected) {
      return nextResolve(redirected)
    }
  }

  // React DOM
  if (lowerUrl === 'react-dom' || lowerUrl.startsWith('react-dom/')) {
    const redirected = tryRedirect('react-dom', url, LOCAL_REACT_DOM)
    if (redirected) {
      return nextResolve(redirected)
    }
  }

  // Scheduler
  if (lowerUrl === 'scheduler' || lowerUrl.startsWith('scheduler/')) {
    const redirected = tryRedirect('scheduler', url, LOCAL_SCHEDULER)
    if (redirected) {
      return nextResolve(redirected)
    }
  }

  // @testing-library packages (dom, react, jest-dom, etc.)
  if (lowerUrl.includes('@testing-library/')) {
    const match = url.match(/@testing-library\/([^/]+)(\/.*)?/)
    if (match) {
      const pkg = match[1]
      const sub = match[2] || ''
      const pkgDir = join(LOCAL_TESTING_LIBRARY, pkg)

      let candidate = pkgDir
      if (sub) {
        candidate = join(pkgDir, sub.startsWith('/') ? sub.substring(1) : sub)
        candidate = ensureJsExtension(candidate)
      } else {
        candidate = join(pkgDir, 'index.js')
      }

      const found = locateFile(candidate)
      if (found) {
        const fileUrl = new URL(`file://${found}`).toString()
        log(`@testing-library: ${url} => ${fileUrl}`)
        return nextResolve(fileUrl)
      }
    }
  }

  // Special handling for react/jsx-runtime and react/jsx-dev-runtime
  // These might be virtual exports that point to the main React bundle
  if (lowerUrl === 'react/jsx-runtime' || lowerUrl === 'react/jsx-dev-runtime') {
    // Try to find the actual file in the local react package
    // First check for explicit file
    const jsxRuntimePath = join(LOCAL_REACT, 'jsx-runtime.js')
    if (existsSync(jsxRuntimePath)) {
      const fileUrl = new URL(`file://${jsxRuntimePath}`).toString()
      log(`jsx-runtime: ${url} => ${fileUrl}`)
      return nextResolve(fileUrl)
    }
    // If not found, try to use the main export
    // Read package.json to see if there's an export map
    const pkgPath = join(LOCAL_REACT, 'package.json')
    try {
      const pkgContent = readFileSync(pkgPath, 'utf8')
      const pkg = JSON.parse(pkgContent)
      // Check for exports field
      if (pkg.exports) {
        // Try to resolve via exports - simplified: just use main
        const main = pkg.main || 'index.js'
        const mainPath = join(LOCAL_REACT, main)
        if (existsSync(mainPath)) {
          const fileUrl = new URL(`file://${mainPath}`).toString()
          log(`jsx-runtime (fallback to main): ${url} => ${fileUrl}`)
          return nextResolve(fileUrl)
        }
      }
    } catch (error) {
      // ignore
    }
  }

  // Try to redirect any remaining module that might be in our local node_modules
  // This is a fallback for modules we haven't explicitly handled
  // Check if the module path starts with a known package name that exists locally
  const moduleMatch = url.match(/^(@[^/]+\/[^/]+|[^/@]+)(\/.*)?$/)
  if (moduleMatch) {
    const pkgName = moduleMatch[1]
    const subPath = moduleMatch[2] || ''
    const localPkgPath = join(LOCAL_NODE_MODULES, pkgName)

    // Only try redirection if the package exists locally
    try {
      if (statSync(localPkgPath).isDirectory()) {
        // Try to resolve the full path
        let candidate = localPkgPath
        if (subPath) {
          candidate = join(localPkgPath, subPath.startsWith('/') ? subPath.substring(1) : subPath)
          candidate = ensureJsExtension(candidate)
        } else {
          candidate = join(localPkgPath, 'index.js')
        }

        const found = locateFile(candidate)
        if (found) {
          const fileUrl = new URL(`file://${found}`).toString()
          log(`generic redirect: ${url} => ${fileUrl}`)
          return nextResolve(fileUrl)
        }
      }
    } catch {
      // Package doesn't exist locally, continue
    }
  }

  // Let Node.js handle all other requests
  return nextResolve(url)
}
