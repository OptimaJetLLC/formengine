import type {ActionData} from '@react-form-builder/core'
import {createNonNullableContext} from '@react-form-builder/core'

const [
  /**
   * **Internal use only.**
   */
  useActionData,
  /**
   * **Internal use only.**
   */
  ActionDataProvider,
] = createNonNullableContext<ActionData>('ActionDataContext')

export {ActionDataProvider, useActionData}
