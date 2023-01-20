import {createNamedContext} from 'form-viewer'
import {Store} from '../../stores/Store'

export const [useStore, StoreProvider, StoreContext] = createNamedContext<Store>('StoreContext')
