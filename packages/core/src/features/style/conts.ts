import {StandardStyleItem} from './types'

function inPX(cssName: string) {
  return {cssName, measure: 'px'}
}

const pick = (object: any, keys: string[]) => {
  const result: any = {}
  keys.forEach(key => {
    if (object[key]) result[key] = object[key]
  })
  return result
}

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
