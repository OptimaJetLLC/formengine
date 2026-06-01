import {writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {generateMantineFormJson} from '../tests/common/lib/mantine-form.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __rootDir = join(__dirname, '..')
const outputPath = join(__rootDir, 'packages', 'apps', 'common', 'forms', 'MantineForm-all.json')

function generate(): void {
  const formJson = generateMantineFormJson()
  writeFileSync(outputPath, `${JSON.stringify(formJson, null, 2)}\n`)
  console.info(`Generated Mantine form with ${formJson.form.children.length} components at ${outputPath}`)
}

try {
  generate()
} catch (error) {
  console.error('❌ generate-mantine-form script failed.', error)
  process.exitCode = 1
}
