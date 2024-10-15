import {boolean, define, event, oneOf, string} from '@react-form-builder/core'
import {Toggle} from 'rsuite'
import {controlColor, readOnly} from '../commonProperties'

export const rsToggle = define(Toggle, 'RsToggle')
  .name('Toggle')
  .props({
    children: string.named('Label'),
    checked: boolean.valued.default(true),
    checkedChildren: string.named('Checked text'),
    unCheckedChildren: string.named('Unchecked text'),
    disabled: boolean.hinted('Whether disabled').default(false),
    readOnly,
    size: oneOf('sm', 'md', 'lg')
      .labeled('Small', 'Medium', 'Large')
      .default('md'),
    color: controlColor,
    loading: boolean.default(false),
    onChange: event,
  })
