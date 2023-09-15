import {boolean, define, event, string} from '@react-form-builder/core'
import {Checkbox} from 'rsuite'
import {readOnly} from '../commonProperties'

export const rsCheckbox = define(Checkbox)
  .type('RsCheckbox')
  .name('Checkbox')
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
