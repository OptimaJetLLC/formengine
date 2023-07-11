import {ArraySchema, BooleanSchema, DateSchema, NumberSchema, ObjectSchema, StringSchema} from 'yup'
import {SchemaCtor, SchemaType, ValidationSchema} from '../types'
import {getSchemaRules} from './consts'

/**
 * Parses the validation scheme into a yup scheme.
 * @param schema the validation scheme
 * @returns the yup scheme or undefined.
 */
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

function exhaustiveCheck(param: never): never {
  throw new Error(`Unprocessed value: ${param}`)
}

function getSchemaCtor(type: SchemaType): SchemaCtor {
  switch (type) {
    case 'string':
      return StringSchema
    case 'number':
      return NumberSchema
    case 'boolean':
      return BooleanSchema
    case 'date':
      return DateSchema
    case 'object':
      return ObjectSchema
    case 'array':
      return ArraySchema
    default:
      exhaustiveCheck(type)
  }
}
