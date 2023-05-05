import {boolean, color, event, number, oneOf, string} from 'form-builder/view'
import {TypeAttributes} from 'rsuite/esm/@types/common'

type Placement = TypeAttributes.Placement;

export const placement = oneOf<Placement, [Placement, ...Placement[]]>(
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
  color: color.default('var(--rs-text-primary)'),
}

export const readOnly = boolean.hinted('Read only component')

export const inputProps = {
  placeholder: string.hinted('Input placeholder'),
  size,
  disabled: boolean.hinted('Disabled component'),
  readOnly,
  onChange: event,
}
