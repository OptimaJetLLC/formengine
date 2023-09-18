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
