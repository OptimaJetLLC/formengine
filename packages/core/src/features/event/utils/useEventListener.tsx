import {DependencyList, useEffect} from 'react'
import {filter} from 'rxjs'
import {useStore} from '../../../utils/contexts/StoreContext'
import {ActionEventHandler} from '../types'

export const useEventListener = (sender: string, type: string, listener: ActionEventHandler, deps?: DependencyList) => {
  const {eventSubject} = useStore()
  useEffect(() => {
    const subscription = eventSubject
      .pipe(filter(e => e.type === type && e.sender.key === sender))
      .subscribe(listener)
    return () => subscription.unsubscribe()
  }, deps)
}
