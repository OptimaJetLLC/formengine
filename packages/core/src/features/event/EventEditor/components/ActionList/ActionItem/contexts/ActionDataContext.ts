import {createNamedContext} from 'form-viewer'
import {ActionData} from '../../../../../actionData'

const [useActionData, ActionDataProvider] = createNamedContext<ActionData>('ActionDataContext')

export {useActionData, ActionDataProvider}
