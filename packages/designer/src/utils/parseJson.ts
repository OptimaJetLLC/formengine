import {isUndefined} from 'lodash-es'

/**
 * Parses the JSON string into a JavaScript object.
 * @param value the JSON string.
 * @returns the JSON object or null if JSON parsing failed.
 */
export const parseJson = (value?: string) => {
  if (isUndefined(value)) return undefined

  try {
    return JSON.parse(value)
  } catch (objError) {
    if (objError instanceof SyntaxError) {
      console.error(objError.name)
    }
    return null
  }
}

/**
 * Prepares data for JSON.stringify.
 * @param data the data for preparing.
 * @returns the object prepared for JSON.stringify.
 */
export const prepareForJson = (data: any) => {
  if (typeof data !== 'object' || data === null) return data

  const filtered: any = {}
  Object.entries(data).forEach(([key, value]) => {
    const typeIs = (valueType: string) => typeof value == valueType

    if (value instanceof Date) {
      filtered[key] = value.toISOString()
      return
    }

    if (typeIs('object')) {
      filtered[key] = prepareForJson(value)
      return
    }

    if (!(typeIs('string') || typeIs('number') || typeIs('boolean'))) {
      return
    }

    filtered[key] = value
  })

  return filtered
}
