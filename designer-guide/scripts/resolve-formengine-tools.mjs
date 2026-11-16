/**
 * Locate the formengine-tools checkout (sibling of the product repo, or FORMENGINE_TOOLS_PATH).
 */
import {existsSync} from 'node:fs'
import {dirname, isAbsolute, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
/** Product monorepo root (parent of `designer-guide/`). */
const productRoot = resolve(__dirname, '../..')

/**
 * @param {string} dir
 * @returns {boolean}
 */
function looksLikeToolsRepo(dir) {
  return (
    existsSync(join(dir, 'skills/formbuilder-end-user-docs/SKILL.md')) &&
    existsSync(join(dir, 'scripts/install-skills.sh'))
  )
}

/**
 * @returns {string} absolute formengine-tools root
 */
export function resolveFormengineToolsRoot() {
  const fromEnv = process.env.FORMENGINE_TOOLS_PATH?.trim()
  if (fromEnv) {
    const resolved = isAbsolute(fromEnv) ? fromEnv : resolve(productRoot, fromEnv)
    if (looksLikeToolsRepo(resolved)) {
      return resolved
    }
    throw new Error(
      `FORMENGINE_TOOLS_PATH=${fromEnv} does not look like formengine-tools ` +
        '(missing skills/formbuilder-end-user-docs/SKILL.md).'
    )
  }

  const sibling = resolve(productRoot, '../formengine-tools')
  if (looksLikeToolsRepo(sibling)) {
    return sibling
  }

  throw new Error(
    'formengine-tools not found. Clone it beside this repo as ../formengine-tools, ' +
      'or set FORMENGINE_TOOLS_PATH to that checkout. Then run: ' +
      'npm run skills:install (from formengine-tools).'
  )
}

/**
 * Absolute path to the formbuilder-end-user-docs skill directory.
 * @returns {string}
 */
export function resolveFormbuilderEndUserDocsSkillRoot() {
  return join(resolveFormengineToolsRoot(), 'skills/formbuilder-end-user-docs')
}

export {productRoot}
