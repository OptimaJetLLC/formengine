import {Store} from '../../stores/Store'
import {createNamedContext} from '../createNamedContext'

export const [useStore, StoreProvider, StoreContext] = createNamedContext<Store>('StoreContext')
