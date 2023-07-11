import {useComponentData} from '@react-form-builder/core'
import {useBuilderStore} from './BuilderStoreContext'

// todo rename to useComponentMetadata
/**
 * Returns component metadata for the specified component type.
 * @param type a component type.
 * @returns the component metadata.
 * @internal
 */
export function useMeta(type?: string) {
  const store = useBuilderStore()
  type ??= useComponentData().model.type
  return store.view.getMeta(type)
}
