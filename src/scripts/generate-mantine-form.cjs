const {writeFileSync} = require('node:fs')
const {join} = require('node:path')
const {generateMantineFormJson} = require('../tests/common/lib/mantine-form.ts')

const __rootDir = join(__dirname, '..')
const outputPath = join(__rootDir, 'packages', 'apps', 'common', 'forms', 'MantineForm-all.json')

const formJson = generateMantineFormJson()
writeFileSync(outputPath, `${JSON.stringify(formJson, null, 2)}\n`)
console.info(`Generated Mantine form with ${formJson.form.children.length} components at ${outputPath}`)
