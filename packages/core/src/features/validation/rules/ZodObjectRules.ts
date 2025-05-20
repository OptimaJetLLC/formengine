import {z} from 'zod'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'
import {ruleBuilder} from '../utils/ruleBuilder'
import {zodAnyToValidator} from './zodAnyToValidator'

const scheme = z.union([z.object({}).passthrough(), z.string()])

export const ZodObjectRules: ValidationRuleSet = {
  nonEmpty: ruleBuilder()
    .withValidatorFactory(({message}) => zodAnyToValidator(scheme.refine(arg => arg, message)))
}
