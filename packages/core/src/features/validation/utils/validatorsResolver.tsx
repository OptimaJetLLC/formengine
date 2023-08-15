import {isPromise} from '../../../utils'
import type {BoundValueSchema} from '../types/BoundValueSchema'
import type {SchemaType} from '../types/SchemaType'
import type {ValidationResult} from '../types/ValidationResult'
import type {ValidationRuleSettings} from '../types/ValidationRuleSettings'
import {ValidationRules} from './consts'
import type {ResolvedValidator} from './DataValidator'

/**
 * Returns the function that creates a validator for the value.
 * @param type the value type.
 * @returns the function that creates a validator for the value.
 */
export function typedValidatorsResolver(type: SchemaType) {
  return function (schema?: BoundValueSchema) {
    return validatorsResolver(type, schema)
  }
}

/**
 * Creates a validator for the specified value validation rules.
 * @param type the value type.
 * @param schema the value validation rules.
 * @returns the validation function.
 */
function validatorsResolver(type: SchemaType, schema?: BoundValueSchema): ResolvedValidator {
  const validators = parse(type, schema)

  return async (value, store) => {
    if (!validators) return

    const validationResults: ValidationResult[] = []
    for (const {settings, validator,} of validators) {
      const result = validator(value, store)
      const ruleResult = isPromise(result) ? await result : result
      if (ruleResult !== true) {
        validationResults.push({
          settings: settings,
          message: typeof ruleResult === 'string' ? ruleResult : undefined
        })
      }
    }
    return validationResults
  }
}

function parse(type: SchemaType, schema?: BoundValueSchema) {
  if (!schema || !schema.validations || !schema.validations.length) return

  const rules = [...schema.validations].sort(byPriority)
  const validationRule = ValidationRules[type]

  return rules.map(rule => {
    const definition = validationRule[rule.key]
    const args = rule.args ?? {}
    const validator = definition.validatorFactory(args)
    return {
      settings: rule,
      validator: validator
    }
  })
}

//The 'required' rule must be implemented first, because it is a root for next
//The 'custom' rule (used refine under the hood) must be implemented last
function byPriority(a: ValidationRuleSettings, b: ValidationRuleSettings) {
  if (b.key === 'custom') return -1
  if (b.key === 'required') return 1
  return 0
}
