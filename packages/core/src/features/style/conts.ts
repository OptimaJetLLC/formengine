import {StandardStyleItem} from './types'
import {inPX, pick} from './utils'

export const StandardStylesDefinitions: StandardStyleItem = {
  'width': inPX('width'),
  'height': inPX('height'),
  'left': inPX('margin-left'),
  'right': inPX('margin-right'),
  'top': inPX('margin-top'),
  'bottom': inPX('margin-bottom'),
  'corner radius': inPX('border-radius'),
  'rotation': {
    cssName: 'transform',
    measure: val => `rotate(${val}deg)`
  }
}

export const SizeStyles = pick(StandardStylesDefinitions, ['width', 'height'])
export const IndentStyles = pick(StandardStylesDefinitions, ['left', 'right', 'top', 'bottom'])
export const OtherStyles = pick(StandardStylesDefinitions, ['corner radius', 'rotation'])
