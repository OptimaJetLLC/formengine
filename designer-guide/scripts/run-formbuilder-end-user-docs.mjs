#!/usr/bin/env node
/**
 * Run a script from the formbuilder-end-user-docs skill in formengine-tools.
 *
 * Usage (from designer-guide/ or repo root):
 *   node scripts/run-formbuilder-end-user-docs.mjs capture-all-guide-screenshots.mjs
 *   node scripts/run-formbuilder-end-user-docs.mjs build-guide-screenshot-catalog.mjs --check
 */
import {spawnSync} from 'node:child_process'
import {join} from 'node:path'

import {
  productRoot,
  resolveFormbuilderEndUserDocsSkillRoot,
  resolveFormengineToolsRoot,
} from './resolve-formengine-tools.mjs'

const [scriptName, ...rest] = process.argv.slice(2)
if (!scriptName) {
  console.error(
    'Usage: node scripts/run-formbuilder-end-user-docs.mjs <script.mjs> [...args]'
  )
  process.exit(1)
}

const toolsRoot = resolveFormengineToolsRoot()
const skillRoot = resolveFormbuilderEndUserDocsSkillRoot()
const scriptPath = join(skillRoot, 'scripts', scriptName)

const result = spawnSync(process.execPath, [scriptPath, ...rest], {
  stdio: 'inherit',
  cwd: productRoot,
  env: {
    ...process.env,
    MAIN_REPO_PATH: process.env.MAIN_REPO_PATH || productRoot,
    FORMENGINE_TOOLS_PATH: process.env.FORMENGINE_TOOLS_PATH || toolsRoot,
  },
})

process.exit(result.status ?? 1)
