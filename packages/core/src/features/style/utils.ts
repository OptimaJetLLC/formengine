import {OtherMeasure} from '../annotation/components/SizeInput'
import {StandardStylesDefinitions} from './conts'
import {Measured, StyleItem} from './types'

export const styleToString = ({name, value}: StyleItem) =>
  (name && value) ? `${name}:${value};` : ''

export const transformStylesToCSS = (styles?: Record<string, string>) => {
  if (!styles) return []
  let CSSStyles: StyleItem[] = []
  Object.entries(styles).forEach(([key, val]) => {
    const definition = StandardStylesDefinitions[key]
    if (!definition) return

    const value = (typeof definition.measure == 'string')
      ? `${val}${definition.measure}`
      : definition.measure?.(val) ?? val
    CSSStyles.push({
      name: definition.cssName,
      value
    })
  })
  return CSSStyles
}

export function inPX(cssName: string) {
  return {cssName, measure: 'px'}
}

export function size(cssName: string) {
  const measure = ({value, measure}: Measured) => {
    return (!measure || measure !== OtherMeasure) ? `${value}${measure}` : value
  }
  return {cssName, measure}
}

export function rgb(cssName: string) {
  return {cssName, measure: (rgb?: { r: number; g: number; b: number; a: number }) => rgb && `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`}
}

export const pick = (object: any, keys: string[]) => {
  const result: any = {}
  keys.forEach(key => {
    if (object[key]) result[key] = object[key]
  })
  return result
}
