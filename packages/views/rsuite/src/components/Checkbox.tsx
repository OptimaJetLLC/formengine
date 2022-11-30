import {boolean, define, event, string} from 'fb-core'
import {Checkbox} from 'rsuite'

export const checkbox = define(Checkbox)
  .props({
    children: string.named('Label').default('Checkbox'),
    checked: boolean.valued.default(true),
    indeterminate: boolean,
    disabled: boolean,
    onChange: event,
  })
