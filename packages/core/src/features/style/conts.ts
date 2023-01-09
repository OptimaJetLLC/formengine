import {StandardStyleItem} from './types'
import {inPX, pick, rgb, size} from './utils'

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
    measure: val => `rotate(${val}deg)`
  },
  'alignment': {cssName: 'text-align'},
  'fontSize': inPX('font-size'),
  'fontWeight': {cssName: 'font-weight'},
  'color': rgb('color'),
  'backgroundColor': rgb('background-color'),
  'width': size('width'),
  'height': size('height'),
  'fit': {cssName: 'object-fit'},
  'position': {cssName: 'object-position'},
  'justifyContent': {cssName: 'justify-content'},
}

export const SizeStyles = pick(StandardStylesDefinitions, ['Width', 'Height'])
export const IndentStyles = pick(StandardStylesDefinitions, ['Left', 'Right', 'Top', 'Bottom'])
export const OtherStyles = pick(StandardStylesDefinitions, ['Corner radius', 'Rotation'])
export const StylesFromProps = pick(StandardStylesDefinitions, [
  'alignment',
  'fontSize',
  'fontWeight',
  'color',
  'backgroundColor',
  'width',
  'height',
  'fit',
  'position',
  'justifyContent'
])
