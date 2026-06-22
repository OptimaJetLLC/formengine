import {existsSync, readFileSync, statSync} from 'node:fs'
import {extname, join, resolve as pathResolve} from 'node:path'
import {createLogger} from './util.cjs'

const log = createLogger('import-loader')

/**
 * Default load implementation – passes through to Node's default loader.
 */
export function load(url, context, defaultLoad) {
  return defaultLoad(url, context)
}

/**
 * Creates resolve hook that redirects react-family packages to a suite-local node_modules.
 * @param suiteDir absolute path to the react test host package (e.g. tests/react-17)
 * @returns resolve hook for Node register()
 */
export function createResolve(suiteDir) {
  const localNodeModules = pathResolve(suiteDir, 'node_modules')
  const localReact = join(localNodeModules, 'react')
  const localReactDom = join(localNodeModules, 'react-dom')
  const localScheduler = join(localNodeModules, 'scheduler')
  const localTestingLibrary = join(localNodeModules, '@testing-library')

  return function resolve(url, context, nextResolve) {
    const lowerUrl = url.toLowerCase()

    if ((lowerUrl === 'react' || lowerUrl.startsWith('react/')) && !lowerUrl.startsWith('react-dom/')) {
      const redirected = tryRedirect('react', url, localReact)
      if (redirected) {
        return nextResolve(redirected)
      }
    }

    if (lowerUrl === 'react-dom' || lowerUrl.startsWith('react-dom/')) {
      const redirected = tryRedirect('react-dom', url, localReactDom)
      if (redirected) {
        return nextResolve(redirected)
      }
    }

    if (lowerUrl === 'scheduler' || lowerUrl.startsWith('scheduler/')) {
      const redirected = tryRedirect('scheduler', url, localScheduler)
      if (redirected) {
        return nextResolve(redirected)
      }
    }

    if (lowerUrl.includes('@testing-library/')) {
      const match = url.match(/@testing-library\/([^/]+)(\/.*)?/)
      if (match) {
        const pkg = match[1]
        const sub = match[2] || ''
        const pkgDir = join(localTestingLibrary, pkg)

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

    if (lowerUrl === 'react/jsx-runtime' || lowerUrl === 'react/jsx-dev-runtime') {
      const jsxRuntimePath = join(localReact, 'jsx-runtime.js')
      if (existsSync(jsxRuntimePath)) {
        const fileUrl = new URL(`file://${jsxRuntimePath}`).toString()
        log(`jsx-runtime: ${url} => ${fileUrl}`)
        return nextResolve(fileUrl)
      }

      const pkgPath = join(localReact, 'package.json')
      try {
        const pkgContent = readFileSync(pkgPath, 'utf8')
        const pkg = JSON.parse(pkgContent)
        if (pkg.exports) {
          const main = pkg.main || 'index.js'
          const mainPath = join(localReact, main)
          if (existsSync(mainPath)) {
            const fileUrl = new URL(`file://${mainPath}`).toString()
            log(`jsx-runtime (fallback to main): ${url} => ${fileUrl}`)
            return nextResolve(fileUrl)
          }
        }
      } catch {
        // ignore
      }
    }

    const moduleMatch = url.match(/^(@[^/]+\/[^/]+|[^/@]+)(\/.*)?$/)
    if (moduleMatch) {
      const pkgName = moduleMatch[1]
      const subPath = moduleMatch[2] || ''
      const localPkgPath = join(localNodeModules, pkgName)

      try {
        if (statSync(localPkgPath).isDirectory()) {
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

    return nextResolve(url)
  }
}

function ensureJsExtension(filePath) {
  const ext = extname(filePath)
  if (!ext) {
    return filePath + '.js'
  }
  return filePath
}

function locateFile(fullPath) {
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

function tryRedirect(moduleName, requestedPath, localBaseDir) {
  let subpath = requestedPath.substring(moduleName.length)
  if (subpath.startsWith('/')) {
    subpath = subpath.substring(1)
  }

  if (!subpath) {
    subpath = 'index.js'
  }

  subpath = ensureJsExtension(subpath)

  let candidate = join(localBaseDir, subpath)
  let found = locateFile(candidate)

  if (!found && subpath === 'index.js') {
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

  if (found) {
    const fileUrl = new URL(`file://${found}`).toString()
    log(`${moduleName}: ${requestedPath} => ${fileUrl}`)
    return fileUrl
  }

  log(`Failed to redirect ${moduleName}: ${requestedPath} (candidate: ${candidate})`)
  return null
}
