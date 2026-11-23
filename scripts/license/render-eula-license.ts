import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {EULA_REPO_RELATIVE_PATH} from './eula-config.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..', '..')

/**
 * Renders the FormEngine EULA text for a package LICENSE file.
 * Source of truth is the repository root EULA.md (published at https://formengine.io/eula/).
 */
export function renderEulaLicense(): string {
  const eulaPath = join(REPO_ROOT, EULA_REPO_RELATIVE_PATH)
  const content = readFileSync(eulaPath, 'utf8')
  return content.endsWith('\n') ? content : `${content}\n`
}
