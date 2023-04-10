import {ArraySchema, BooleanSchema, NumberSchema, ObjectSchema, StringSchema} from 'yup'
import DateSchema from 'yup/lib/date'
import {exhaustiveCheck} from '../../../utils/exhaustiveCheck'
import {ArrayRules} from '../rules/ArrayRules'
import {BooleanRules} from '../rules/BooleanRules'
import {DateRules} from '../rules/DateRules'
import {NumberRules} from '../rules/NumberRules'
import {ObjectRules} from '../rules/ObjectRules'
import {StringRules} from '../rules/StringRules'
import {Rules, SchemaCtor, SchemaType} from '../types'

export const getSchemaRules = (ctr?: Function): Rules<any> | undefined => {
  switch (ctr) {
    case StringSchema:
      return StringRules
    case NumberSchema:
      return NumberRules
    case BooleanSchema:
      return BooleanRules
    case DateSchema:
      return DateRules
    case ObjectSchema:
      return ObjectRules
    case ArraySchema:
      return ArrayRules
  }
}

export function getSchemaCtor(type: SchemaType): SchemaCtor {
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
