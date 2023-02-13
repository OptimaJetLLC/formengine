import {isUndefined} from 'lodash'

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
