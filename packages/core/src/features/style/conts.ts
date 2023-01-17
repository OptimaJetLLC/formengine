import {StandardStyleItem} from './types'
import {inPX, pick, rgb} from './utils'

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
  },
  'alignment': {cssName: 'text-align'},
  'fontSize': inPX('font-size'),
  'fontWeight': {cssName: 'font-weight'},
  'color': rgb('color'),
  'backgroundColor': rgb('background-color'),
  'fit': {cssName: 'object-fit'},
  'position': {cssName: 'object-position'},
  'justifyContent': {cssName: 'justify-content'},
}

export const SizeStyles = pick(StandardStylesDefinitions, ['width', 'height'])
export const IndentStyles = pick(StandardStylesDefinitions, ['left', 'right', 'top', 'bottom'])
export const OtherStyles = pick(StandardStylesDefinitions, ['corner radius', 'rotation'])
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
  'justifyContent',
])
