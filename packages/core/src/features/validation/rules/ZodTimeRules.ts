import {z} from 'zod'
import {AsyncFunction} from '../../../utils/AsyncFunction'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'
import {ruleBuilder} from '../utils/ruleBuilder'
import {zodAnyToValidator} from './zodAnyToValidator'

const scheme = z.string()

export const ZodTimeRules: ValidationRuleSet = {
  required: ruleBuilder()
    .withValidatorFactory(({message}) => zodAnyToValidator(z.string({required_error: message}).nonempty(message))),
  code: ruleBuilder()
    .withParameter('code', 'string', true, undefined, 'code')
    .withValidatorFactory(({code, message}) => {
      const checker = AsyncFunction('value', code) as (value: string) => Promise<boolean>
      return zodAnyToValidator(scheme.refine(checker, message))
    })
}
