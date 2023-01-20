import {createNamedContext} from 'form-viewer'
import {BuilderStore} from '../../stores/BuilderStore'

const [useBuilderStore, BuilderStoreProvider] = createNamedContext<BuilderStore>('BuildStoreContext')

export {useBuilderStore, BuilderStoreProvider}
