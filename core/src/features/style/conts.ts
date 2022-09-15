import {StandardStyleItem} from './types'
import {inPX, pick} from './utils'

export const StandardStylesDefinitions: StandardStyleItem = {
  'Width': inPX('width'),
  'Height': inPX('height'),
  'Left': inPX('margin-left'),
  'Right': inPX('margin-right'),
  'Top': inPX('margin-top'),
  'Bottom': inPX('margin-bottom'),
  'Corner radius': inPX('border-radius'),
  'Rotation': {
    cssName: 'transform',
    measure: (val: string) => `rotate(${val}deg)`
  }
}
export const SizeStyles = pick(StandardStylesDefinitions, ['Width', 'Height'])
export const IndentStyles = pick(StandardStylesDefinitions, ['Left', 'Right', 'Top', 'Bottom'])
export const OtherStyles = pick(StandardStylesDefinitions, ['Corner radius', 'Rotation'])
