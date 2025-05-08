import {createNonNullableContext} from '@react-form-builder/core'
import type {BuilderStore} from '../stores/BuilderStore'

const [
  /**
   * **Internal use only.**
   */
  useBuilderStore,
  /**
   * **Internal use only.**
   */
  BuilderStoreProvider,
] = createNonNullableContext<BuilderStore>('BuildStoreContext')

export {useBuilderStore, BuilderStoreProvider}
