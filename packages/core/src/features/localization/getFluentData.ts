import type {FluentVariable} from '@fluent/bundle/esm/bundle'
import {getFluentCompatibleId} from './getFluentCompatibleId'
import {isFluentVariable} from './isFluentVariable'

/**
 * Converts the form data to a Fluent compatible.
 * @param data the form data.
 * @returns all the form data that is of the FluentVariable type.
 * Additionally, the keys of the returned object are converted to the snake case.
 */
export const getFluentData = (data: Record<string, unknown>) => {
  const fluentData: Record<string, FluentVariable> = {}
  for (const [key, value] of Object.entries(data)) {
    if (isFluentVariable(value)) {
      fluentData[getFluentCompatibleId(key)] = value
    }
  }
  return fluentData
}
