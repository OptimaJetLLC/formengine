import {ActionData, createNamedContext} from 'fb-core'

const [useActionData, ActionDataProvider] = createNamedContext<ActionData>('ActionDataContext')

export {useActionData, ActionDataProvider}
