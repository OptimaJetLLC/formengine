import {ActionData, createNonNullableContext} from '@react-form-builder/core'

const [useActionData, ActionDataProvider] = createNonNullableContext<ActionData>('ActionDataContext')

export {useActionData, ActionDataProvider}
