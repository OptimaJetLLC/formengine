import {z} from 'zod'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'
import {ruleBuilder} from '../utils/ruleBuilder'
import {zodAnyToValidator} from './zodAnyToValidator'

const scheme = z.boolean()

export const ZodBooleanRules: ValidationRuleSet = {
  truthy: ruleBuilder()
    .withValidatorFactory(({message}) => zodAnyToValidator(scheme.refine(arg => arg, message))),

  falsy: ruleBuilder()
    .withValidatorFactory(({message}) => zodAnyToValidator(scheme.refine(arg => !arg, message)))
}
