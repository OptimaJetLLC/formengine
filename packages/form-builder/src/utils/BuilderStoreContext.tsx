import {createNonNullableContext} from 'fb-core'
import {BuilderStore} from '../stores/BuilderStore'

const [useBuilderStore, BuilderStoreProvider] = createNonNullableContext<BuilderStore>('BuildStoreContext')

export {useBuilderStore, BuilderStoreProvider}
