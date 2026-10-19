import {writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {BuilderView} from '@react-form-builder/core'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {sortableListComponent, sortableListComponentsDescriptions} from '../src'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function generateJsonFormSchema() {
  const builderView = new BuilderView([sortableListComponent.build()])
  const schema = createSchema(builderView.builderComponents, [sortableListComponentsDescriptions['en-US']])
  return JSON.stringify(schema, undefined, 2)
}

const outputPath = join(__dirname, '..', 'public', 'schemas', 'sortable-list-components.schema.json')
const schemaString = generateJsonFormSchema()
writeFileSync(outputPath, `${schemaString}\n`)
console.log(`JSON schema generated at ${outputPath}`)
