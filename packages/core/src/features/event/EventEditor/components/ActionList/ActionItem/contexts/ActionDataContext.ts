import {createNamedContext} from 'form-viewer'
import {ActionData} from '../../../../../types'

const [useActionData, ActionDataProvider] = createNamedContext<ActionData>('ActionDataContext')

export {useActionData, ActionDataProvider}
