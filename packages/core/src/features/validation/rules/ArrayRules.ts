import {ArraySchema} from 'yup'
import {Rule, RuleParam, Rules} from '../types'

export const ArrayRules: Rules<ArraySchema<any>> = {
  length: new Rule('Length',
    (scheme, length: number, message?: string) => scheme.length(length, message), [
      new RuleParam('length', 'number', true),
      new RuleParam('message', 'string')
    ]),
  min: new Rule('Min',
    (scheme, limit: number, message?: string) => scheme.min(limit, message), [
      new RuleParam('limit', 'number', true),
      new RuleParam('message', 'string')
    ]),
  max: new Rule('Max',
    (scheme, limit: number, message?: string) => scheme.max(limit, message), [
      new RuleParam('limit', 'number', true),
      new RuleParam('message', 'string')
    ]),
}
