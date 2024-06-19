import {z} from 'zod'
import {AsyncFunction} from '../../../utils/AsyncFunction'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'
import {ruleBuilder} from '../utils/ruleBuilder'
import {zodAnyToValidator} from './zodAnyToValidator'

const scheme = z.boolean()

export const ZodBooleanRules: ValidationRuleSet = {
  truthy: ruleBuilder()
    .withValidatorFactory(({message}) => zodAnyToValidator(scheme.refine(arg => arg, message))),

  falsy: ruleBuilder()
    .withValidatorFactory(({message}) => zodAnyToValidator(scheme.refine(arg => !arg, message))),

  code: ruleBuilder()
    .withParameter('code', 'boolean', true, undefined, 'code')
    .withValidatorFactory(({code, message}) => {
      const checker = AsyncFunction('value', code) as (value: Boolean) => Promise<boolean>
      return zodAnyToValidator(scheme.refine(checker, message))
    })
}
