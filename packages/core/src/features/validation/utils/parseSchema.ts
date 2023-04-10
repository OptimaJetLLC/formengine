import {ValidationSchema} from '../types'
import {getSchemaCtor, getSchemaRules} from './consts'

export function parseSchema(schema?: ValidationSchema) {
  if (!schema) return

  const schemaCtor = getSchemaCtor(schema.type)
  const rules = getSchemaRules(schemaCtor)
  let schemaIns = new schemaCtor()

  schema.rules.forEach((key: string) => {
    const desc = rules?.[key]
    const args = schema.data?.[key] ?? []
    if (!desc) return

    schemaIns = desc.apply.call(null, schemaIns, ...args)
  })

  return schemaIns
}
