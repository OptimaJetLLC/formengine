import {createNamedContext} from 'fb-core'
import {BuilderStore} from '../stores/BuilderStore'

const [useBuilderStore, BuilderStoreProvider] = createNamedContext<BuilderStore>('BuildStoreContext')

export {useBuilderStore, BuilderStoreProvider}
