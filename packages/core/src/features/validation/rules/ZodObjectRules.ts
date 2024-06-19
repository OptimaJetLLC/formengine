import {z} from 'zod'
import {AsyncFunction} from '../../../utils/AsyncFunction'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'
import {ruleBuilder} from '../utils/ruleBuilder'
import {zodAnyToValidator} from './zodAnyToValidator'

const scheme = z.object({})

export const ZodObjectRules: ValidationRuleSet = {
  code: ruleBuilder()
    .withParameter('code', 'number', true, undefined, 'code')
    .withValidatorFactory(({code, message}) => {
      const checker = AsyncFunction('value', code) as (value: object) => Promise<boolean>
      return zodAnyToValidator(scheme.refine(checker, message))
    })
}
