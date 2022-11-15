import {oneOf} from 'fb-core'
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
