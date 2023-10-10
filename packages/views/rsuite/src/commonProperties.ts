import {array, boolean, color, event, number, oneOf, string, toLabeledValues} from '@react-form-builder/core'
import type {TypeAttributes} from 'rsuite/esm/@types/common'

type Placement = TypeAttributes.Placement;

export const placement = oneOf<Placement>(
  'bottomStart',
  'bottomEnd',
  'topStart',
  'topEnd',
  'leftStart',
  'rightStart',
  'leftEnd',
  'rightEnd'
)

export const size = oneOf(
  'xs',
  'sm',
  'md',
  'lg'
).labeled(
  'Extra small',
  'Small',
  'Medium',
  'Large'
).default('md')

export const backgroundColor = color.named('Background')

export const textStyles = {
  textAlign: oneOf('start', 'center', 'end')
    .default('start')
    .radio()
    .hinted('Text alignment'),
  fontSize: number.default(14).hinted('Font size'),
  fontWeight: oneOf('lighter', 'normal', 'bold').default('normal'),
  color: color,
}

export const readOnly = boolean.hinted('Read only component')
export const inputProps = {
  placeholder: string.hinted('Input placeholder'),
  size,
  disabled: boolean.hinted('Disabled component'),
  readOnly,
  onChange: event,
}

export const headerSize = oneOf('h1', 'h2', 'h3', 'h4', 'h5', 'h6')
  .default('h4')
  .hinted('Header level')

export const navProps = {
  activeKey: string.hinted('Active key, corresponding to one of items value').default('Item1'),
  appearance: oneOf('default', 'tabs', 'subtle')
    .default('default')
    .hinted('A navigation can have different appearances'),
  items: array.default(toLabeledValues(['Item1', 'Item2', 'Item3'])),
  justified: boolean.hinted('Justified navigation'),
  onSelect: event,
  pullRight: boolean.hinted('Appears on the right'),
  reversed: boolean.hinted('Reverse direction of tabs/subtle'),
  vertical: boolean.hinted('Stacked navigation')
}

export const pickerProps = {
  label: string,
  value: string.valued,
  placeholder: string,
  placement,
  size,
  data: array,
  block: boolean.default(true),
  cleanable: boolean.default(false),
  creatable: boolean.default(false),
  disabled: boolean,
  readOnly,
  groupBy: string.default(''),
  onLoadData: event,
  onSelect: event,
  onClean: event,
  onClose: event,
  onCreate: event,
  onChange: event,
  onSearch: event,
}
