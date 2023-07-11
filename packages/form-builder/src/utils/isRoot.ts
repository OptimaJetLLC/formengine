import {ComponentStore} from '@react-form-builder/core'

/**
 * Returns true if the specified component settings is the root component settings, false otherwise.
 * @param store a component settings.
 * @returns true if the specified component settings is the root component settings, false otherwise.
 * @internal
 */
export function isRootType(store: ComponentStore) {
  return store.type === 'Screen'
}
