import {ZodArrayRules} from '../rules/ZodArrayRules'
import {ZodBooleanRules} from '../rules/ZodBooleanRules'
import {ZodDateRules} from '../rules/ZodDateRules'
import {ZodNumberRules} from '../rules/ZodNumberRules'
import {ZodObjectRules} from '../rules/ZodObjectRules'
import {ZodStringRules} from '../rules/ZodStringRules'
import type {SchemaType} from '../types/SchemaType'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'

export const ValidationRules: Record<SchemaType, ValidationRuleSet> = {
  'string': ZodStringRules,
  'number': ZodNumberRules,
  'boolean': ZodBooleanRules,
  'date': ZodDateRules,
  'object': ZodObjectRules,
  'array': ZodArrayRules,
  'enum': {}
}
