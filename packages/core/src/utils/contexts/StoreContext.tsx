import {Store} from '../../stores/Store'
import {createNonNullableContext} from '../createNonNullableContext'

export const [useStore, StoreProvider, StoreContext] = createNonNullableContext<Store>('StoreContext')
