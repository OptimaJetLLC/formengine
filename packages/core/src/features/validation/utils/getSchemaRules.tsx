import {ArraySchema, BooleanSchema, NumberSchema, ObjectSchema, StringSchema} from 'yup'
import DateSchema from 'yup/lib/date'
import {ArrayRules} from '../rules/ArrayRules'
import {BooleanRules} from '../rules/BooleanRules'
import {DateRules} from '../rules/DateRules'
import {NumberRules} from '../rules/NumberRules'
import {ObjectRules} from '../rules/ObjectRules'
import {StringRules} from '../rules/StringRules'
import {Rules} from '../types'

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
