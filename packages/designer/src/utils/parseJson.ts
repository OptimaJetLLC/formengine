import {isDate, isNull, isNumber, isObject, isUndefined} from '@react-form-builder/core'
import {humanizeFileSize} from './formatters'

const isValidDate = (value: any) => isDate(value) && !Number.isNaN(value.getTime())

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

const createFilePreview = ({lastModified, name, type, webkitRelativePath, size}: File): object => ({
  lastModified: new Date(lastModified).toISOString(),
  name,
  type,
  webkitRelativePath,
  size: humanizeFileSize(size),
})

/**
 * Prepares data for JSON.stringify.
 * @param data the data for preparing.
 * @param options serialize options
 * @param options.previewNativeObjects create human-readable value for non-serializable objects
 * @returns the object prepared for JSON.stringify.
 */
export const prepareForJson = (
  data: any,
  options?: {
    previewNativeObjects: boolean
  }
) => {
  if (!isObject(data) || isNull(data)) return data

  const {previewNativeObjects} = options || {}

  const filtered: any = {}
  Object.entries(data).forEach(([key, value]) => {
    const typeIs = (valueType: string) => typeof value == valueType

    if (Array.isArray(value)) {
      filtered[key] = value.map(item => prepareForJson(item, options))
      return
    }

    if (previewNativeObjects && value instanceof File) {
      filtered[key] = createFilePreview(value)
      return
    }

    if (isDate(value)) {
      filtered[key] = isValidDate(value) ? value.toISOString() : 'Invalid date'
      return
    }

    if (isObject(value)) {
      filtered[key] = prepareForJson(value, options)
      return
    }

    if (isNumber(value)) {
      // displays NaN, Infinity, -Infinity
      filtered[key] = Number.isFinite(value) ? value : String(value)
      return
    }

    if (!(typeIs('string') || typeIs('boolean'))) {
      return
    }

    filtered[key] = value
  })

  return filtered
}
