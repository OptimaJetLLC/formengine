import {Measured} from './types'

export function inPX(cssName: string) {
  return {cssName, measure: 'px'}
}

const OtherUnit = 'other'

export function size(cssName: string) {
  const measure = ({value, measure}: Measured) => {
    return (!measure || measure !== OtherUnit) ? `${value}${measure}` : value
  }
  return {cssName, measure}
}

export const pick = (object: any, keys: string[]) => {
  const result: any = {}
  keys.forEach(key => {
    if (object[key]) result[key] = object[key]
  })
  return result
}
