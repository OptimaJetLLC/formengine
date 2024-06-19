import {z} from 'zod'
import {AsyncFunction} from '../../../utils/AsyncFunction'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'
import {ruleBuilder} from '../utils/ruleBuilder'
import {zodAnyToValidator} from './zodAnyToValidator'

const scheme = z.date()

export const ZodDateRules: ValidationRuleSet = {

  min: ruleBuilder()
    .withParameter('value', 'date', true)
    .withValidatorFactory(({value, message}) => zodAnyToValidator(scheme.min(new Date(value), message))),

  max: ruleBuilder()
    .withParameter('value', 'date', true)
    .withValidatorFactory(({value, message}) => zodAnyToValidator(scheme.max(new Date(value), message))),

  code: ruleBuilder()
    .withParameter('code', 'date', true, undefined, 'code')
    .withValidatorFactory(({code, message}) => {
      const checker = AsyncFunction('value', code) as (value: Date) => Promise<boolean>
      return zodAnyToValidator(scheme.refine(checker, message))
    })
}
