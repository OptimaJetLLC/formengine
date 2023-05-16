import {ComponentStore} from '@react-form-builder/core'

export function isRootType(store: ComponentStore) {
  return store.type === 'Screen'
}
