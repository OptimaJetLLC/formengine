import {ComponentStore} from 'fb-core'

export function isRootType(store: ComponentStore) {
  return store.type === 'Screen'
}
