import {useComponentData} from '@react-form-builder/core'
import {useBuilderStore} from './BuilderStoreContext'

export function useMeta(type?: string) {
  const store = useBuilderStore()
  type ??= useComponentData().model.type
  return store.view.getMeta(type)
}
