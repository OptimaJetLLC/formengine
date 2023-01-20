import {boolean, define, event, string} from 'form-builder'
import {Checkbox} from 'rsuite'

export const rsCheckbox = define(Checkbox)
  .typed('RsCheckbox')
  .props({
    children: string.named('Label').default('Checkbox'),
    checked: boolean.valued.default(true),
    indeterminate: boolean,
    disabled: boolean,
    onChange: event,
  })
