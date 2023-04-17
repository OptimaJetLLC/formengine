import {ActionData, createNonNullableContext} from 'fb-core'

const [useActionData, ActionDataProvider] = createNonNullableContext<ActionData>('ActionDataContext')

export {useActionData, ActionDataProvider}
