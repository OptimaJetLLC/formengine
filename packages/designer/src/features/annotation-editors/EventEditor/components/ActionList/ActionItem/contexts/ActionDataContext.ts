import {ActionData, createNonNullableContext} from '@react-form-builder/core'

const [
  /**
   * **Internal use only.**
   */
  useActionData,
  /**
   * **Internal use only.**
   */
  ActionDataProvider] = createNonNullableContext<ActionData>('ActionDataContext')

export {useActionData, ActionDataProvider}
