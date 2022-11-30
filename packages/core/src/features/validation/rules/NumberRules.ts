import {NumberSchema} from 'yup'
import {Rule, RuleParam, Rules} from '../types'

export const NumberRules: Rules<NumberSchema> = {
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
  lessThan: new Rule('Less Than',
    (scheme, max: number, message?: string) => scheme.lessThan(max, message), [
      new RuleParam('max', 'number', true),
      new RuleParam('message', 'string')
    ]),
  moreThan: new Rule('More Than',
    (scheme, min: number, message?: string) => scheme.moreThan(min, message), [
      new RuleParam('min', 'number', true),
      new RuleParam('message', 'string')
    ]),
  positive: new Rule('Positive',
    (scheme, message?: string) => scheme.positive(message), [
      new RuleParam('message', 'string')
    ]),
  negative: new Rule('Negative',
    (scheme, message?: string) => scheme.negative(message), [
      new RuleParam('message', 'string')
    ]),
  integer: new Rule('Integer',
    (scheme, message?: string) => scheme.integer(message), [
      new RuleParam('message', 'string')
    ]),
  truncate: new Rule('Truncate',
    (scheme) => scheme.truncate(), []),
  /*
  //TODO type is one of "round" | "ceil" | "floor" | "trunc"
  round: new Rule('Round',
    (scheme, type: string) => scheme.round(type), [
      new RuleParam('max', 'number', true),
      new RuleParam('message', 'string')
    ]),
  */
}
