import {BooleanSchema} from 'yup'
import {Rule, RuleParam, Rules} from '../types'

export const BooleanRules: Rules<BooleanSchema> = {
  isTrue: new Rule('Is True',
    (scheme, message?: string) => scheme.isTrue(message), [
      new RuleParam('message', 'string')
    ]),
  isFalse: new Rule('Is False',
    (scheme, message?: string) => scheme.isFalse(message), [
      new RuleParam('message', 'string')
    ]),
}
