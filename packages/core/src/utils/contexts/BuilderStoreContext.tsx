import {BuilderStore} from '../../stores/BuilderStore'
import {createContext} from '../createContextHook'

const [useBuilderStore, BuilderStoreProvider] = createContext<BuilderStore>('BuildStoreContext')

export {useBuilderStore, BuilderStoreProvider}
