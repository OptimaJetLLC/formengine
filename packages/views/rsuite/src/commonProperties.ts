import {color, number, oneOf} from 'fb-core'
import {TypeAttributes} from 'rsuite/cjs/@types/common'

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
