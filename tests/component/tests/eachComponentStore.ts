import type {ComponentStore} from '@react-form-builder/core'

/**
 * Recursively iterate over the component store and call the callback function when the key matches.
 * @param componentStore the component store.
 * @param key the key to find.
 * @param callback the callback function.
 */
export function eachComponentStore(componentStore: ComponentStore, key: string, callback: (componentStore: ComponentStore) => void) {
  if (componentStore.key === key) {
    callback(componentStore)
    return
  }

  componentStore.children?.forEach(child => {
    if (child.key === key) {
      callback(child)
      return
    }
    eachComponentStore(child, key, callback)
  })
}
