import {Parameter, ParameterName, ParameterType} from '../types'

export function toParameterWithType(value: Parameter): [ParameterName, ParameterType] {
  return typeof value === 'string' ? [value, 'string'] : value
}
