import {ActionEventHandler} from '../features/event/types'
import {DependencyList, useEffect} from 'react'
import {useStore} from './contexts/StoreContext'
export const useListener = (target: string, type: string, listener: ActionEventHandler, deps?: DependencyList) => {
  const {eventBus} = useStore()
  useEffect(() => eventBus.listen(listener, {target, type}), deps)
}
