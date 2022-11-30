import {DateSchema} from 'yup'
import {Rule, RuleParam, Rules} from '../types'

export const DateRules: Rules<DateSchema> = {
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
