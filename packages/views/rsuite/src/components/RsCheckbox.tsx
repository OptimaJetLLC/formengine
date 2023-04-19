import {boolean, define, event, string} from 'form-builder/view'
import {Checkbox} from 'rsuite'
import {readOnly} from '../commonProperties'

export const rsCheckbox = define(Checkbox)
  .type('RsCheckbox')
  .props({
    children: string.named('Label').default('Checkbox'),
    checked: boolean.hinted('Specifies whether the checkbox is selected').valued.default(true),
    disabled: boolean.hinted('Whether disabled'),
    readOnly,
    indeterminate: boolean.hinted('When being a checkbox, setting styles after the child part is selected'),
    inline: boolean.hinted('Inline layout'),
    title: string.hinted('HTML title'),
    onChange: event,
  })
