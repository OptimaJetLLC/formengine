import {StandardStylesDefinitions} from './conts'
import {StyleItem} from './types'

export const styleToString = (name?: string, value?: string) => {
  return (name?.length && value?.length)
    ? `${name}:${value};`
    : ''
}
export const transformStylesToCSS = (styles?: Record<string, string>) => {
  if (!styles) return []
  let CSSStyles: StyleItem[] = []
  Object.entries(styles).forEach((style) => {
    const definition = StandardStylesDefinitions[style[0]]
    if (!definition) return

    const value = (typeof definition.measure == 'string')
      ? `${style[1]}${definition.measure}`
      : definition.measure(style[1])
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

export const pick = (object: any, keys: string[]) => {
  const result: any = {}
  keys.forEach(key => {
    if (object[key]) result[key] = object[key]
  })
  return result
}
