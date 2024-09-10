import type {objectOutputType, ZodTypeAny} from 'zod'
import {z} from 'zod'
import {AsyncFunction} from '../../../utils/AsyncFunction'
import type {ValidationRuleSet} from '../types/ValidationRuleSet'
import {ruleBuilder} from '../utils/ruleBuilder'
import {zodAnyToValidator} from './zodAnyToValidator'

const scheme = z.union([z.object({}).passthrough(), z.string()])

export const ZodObjectRules: ValidationRuleSet = {
  nonEmpty: ruleBuilder()
    .withValidatorFactory(({message}) => zodAnyToValidator(scheme.refine(arg => arg, message))),
  code: ruleBuilder()
    .withParameter('code', 'object', true, undefined, 'code')
    .withValidatorFactory(({code, message}) => {
      const checker = AsyncFunction('value', code) as (value: objectOutputType<{}, ZodTypeAny, 'passthrough'> | string) => Promise<unknown>
      return zodAnyToValidator(scheme.refine(checker, message))
    })
}
