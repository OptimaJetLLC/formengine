import {isString, isUndefined} from 'lodash'
import {OtherUnit} from '../annotation/components/SizeInput'
import {Measured} from './types'

export function inPX(cssName: string) {
  return {cssName, measure: 'px'}
}

export function size(cssName: string) {
  const measure = ({value, measure}: Measured) => {
    return (!measure || measure !== OtherUnit) ? `${value}${measure}` : value
  }
  return {cssName, measure}
}

type CssColor = { r: number; g: number; b: number; a: number } | string | undefined

export function rgb(cssName: string) {
  return {
    cssName,
    measure: (rgb: CssColor) => {
      if (isUndefined(rgb) || isString(rgb)) return rgb
      return rgb && `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
    }
  }
}

export const pick = (object: any, keys: string[]) => {
  const result: any = {}
  keys.forEach(key => {
    if (object[key]) result[key] = object[key]
  })
  return result
}
