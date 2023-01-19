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

type RgbColor = { r: number; g: number; b: number; a: number } | undefined

export const rgbToString = (value?: RgbColor | string) => {
  if (isUndefined(value) || isString(value)) return value
  const {r, g, b, a} = value
  return `rgb(${r}, ${g}, ${b}, ${a})`
}

export const rgbFromString = (value: string) => {
  const matchColors = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  const [, r, g, b, a] = matchColors.exec(value) || []
  return [r, g, b].some(isUndefined) ? undefined : {r, g, b, a}
}

export const pick = (object: any, keys: string[]) => {
  const result: any = {}
  keys.forEach(key => {
    if (object[key]) result[key] = object[key]
  })
  return result
}
