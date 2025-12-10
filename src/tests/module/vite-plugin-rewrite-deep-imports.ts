import {existsSync} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import type {Plugin} from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Vite plugin that automatically resolves deep imports from @react-form-builder packages
 * to their actual source file paths, bypassing package.json export restrictions.
 *
 * This allows tests to use convenient deep imports like:
 *   import {defaultComponentStateFactory} from '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider'
 *   import {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
 *
 * Without requiring symbols to be exported from the main package index.
 *
 * The plugin automatically handles all imports matching the pattern:
 *   @react-form-builder/{package}/src/{path}
 *
 * And resolves them to:
 *   ../../packages/{package}/src/{path}
 */
export function rewriteDeepImports(): Plugin {
  return {
    name: 'rewrite-deep-imports',
    enforce: 'pre',
    resolveId(id) {
      // Match deep imports: @react-form-builder/{package}/src/{path}
      const deepImportPattern = /^@react-form-builder\/([^/]+)\/src\/(.+)$/
      const match = id.match(deepImportPattern)

      if (!match) {
        return null
      }

      const [, packageName, importPath] = match

      // Resolve to the packages directory
      const packagesDir = path.resolve(__dirname, '../../packages')
      const packageDir = path.join(packagesDir, packageName, 'src')

      // Build the potential file path
      let filePath = path.join(packageDir, importPath)

      // If the path doesn't have an extension, try to resolve it
      if (!path.extname(filePath)) {
        // First, check if it's a directory with an index file
        if (existsSync(filePath) && !path.extname(filePath)) {
          const indexExtensions = ['index.tsx', 'index.ts', 'index.jsx', 'index.js']
          for (const indexFile of indexExtensions) {
            const indexPath = path.join(filePath, indexFile)
            if (existsSync(indexPath)) {
              return indexPath
            }
          }
        }

        // Try common extensions
        const extensions = ['.tsx', '.ts', '.jsx', '.js']
        let foundPath: string | null = null

        for (const ext of extensions) {
          const candidatePath = filePath + ext
          if (existsSync(candidatePath)) {
            foundPath = candidatePath
            break
          }
        }

        if (foundPath) {
          filePath = foundPath
        } else {
          // If no file found, try with .tsx as default
          // Vite will handle the error if the file doesn't exist
          filePath = filePath + '.tsx'
        }
      } else {
        // Path has extension, check if file exists
        if (!existsSync(filePath)) {
          // If file doesn't exist with the specified extension, return null to let Vite handle it
          return null
        }
      }

      // Return the resolved absolute path
      return filePath
    }
  }
}
