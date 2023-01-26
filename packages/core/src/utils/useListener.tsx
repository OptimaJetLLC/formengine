import {DependencyList, useEffect} from 'react'
import {ActionEventHandler} from '../features/event/actionEventHandler'
import {useEventBus} from './contexts/EventBusContext'

export const useListener = (target: string, type: string, listener: ActionEventHandler, deps?: DependencyList) => {
  const eventBus = useEventBus()
  useEffect(() => eventBus.listen(listener, {target, type}), deps)
}
