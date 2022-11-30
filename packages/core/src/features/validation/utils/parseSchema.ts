import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {SchemaCtor, ValidationSchema} from '../types'
import {getSchemaRules} from './getSchemaRules'

export function parseSchema(validationSchema?: ValidationSchema, valuedAn?: Annotation) {
  if (!validationSchema || !valuedAn?.schema?.constructor) return

  const Schema = valuedAn?.schema?.constructor as SchemaCtor
  const rules = getSchemaRules(Schema)
  let schema = new Schema()

  validationSchema.rules.forEach((key: string) => {
    const desc = rules?.[key]
    const args = validationSchema.data?.[key] ?? []
    if (!desc) return

    schema = desc.apply.call(undefined, schema, ...args)
  })

  return schema
}

