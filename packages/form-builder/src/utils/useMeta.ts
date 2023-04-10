import {useComponentData} from 'fb-core'
import {useState} from 'react'
import {useBuilderStore} from './BuilderStoreContext'

export function useMeta() {
  const store = useBuilderStore()
  const {key} = useComponentData()
  return useState(() => store.findNode(key)?.meta)[0]
}
