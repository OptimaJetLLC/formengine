import {Store} from '../../stores/Store'
import {createContext} from '../createContextHook'

export const [useStore, StoreProvider, StoreContext] = createContext<Store>('StoreContext')
