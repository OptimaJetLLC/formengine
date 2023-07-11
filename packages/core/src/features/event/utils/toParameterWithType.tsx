import {Parameter, ParameterName, ParameterType} from '../types'

/**
 * Converts the parameter to the parameter with the type.
 * @param value the parameter.
 * @returns the parameter with the type.
 */
export function toParameterWithType(value: Parameter): [ParameterName, ParameterType] {
  return typeof value === 'string' ? [value, 'string'] : value
}
