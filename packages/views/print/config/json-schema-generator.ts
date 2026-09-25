import {BuilderView} from '@react-form-builder/core'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {printComponents, printComponentsDescriptions} from '../src'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function generateJsonFormSchema() {
  const builderView = new BuilderView(printComponents.map(def => def.build()))
  const schema = createSchema(builderView.builderComponents, [printComponentsDescriptions['en-US']])
  return JSON.stringify(schema, undefined, 2)
}

const outputPath = join(__dirname, '..', 'public', 'schemas', 'print-components.schema.json')
const schemaString = generateJsonFormSchema()
writeFileSync(outputPath, `${schemaString}\n`)
console.log(`JSON schema generated at ${outputPath}`)
