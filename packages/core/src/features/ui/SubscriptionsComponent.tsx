import {forIn} from 'lodash-es'
import {useCallback, useRef} from 'react'
import type {Subscription} from 'rxjs'
import {catchError, filter, map} from 'rxjs'
import type {Store} from '../../stores/Store'
import {isPromise} from '../../utils'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import type {ActionData, ActionEventArgs} from '../event'
import {useMountUnmount} from './useMountUnmount'

/**
 * Special component that binds action handlers to events.
 * @returns null
 */
export const SubscriptionsComponent = () => {
  const store = useStore()
  const componentData = useComponentData()
  const subsRef = useRef<Subscription[]>([])

  const unsubscribe = useCallback(() => {
    subsRef.current.forEach((s) => s.unsubscribe())
  }, [])

  const createSubscriptions = useCallback(() => {
    const result: Subscription[] = []

    forIn(componentData.store.events, (actionDataList: ActionData[], eventName) => {
      const chain = getActionHandlersChain(store, actionDataList)

      const subscription = store.eventSubject
        .pipe(
          filter(e => e.type === eventName && e.sender.id === componentData.id),
          map(chain),
          catchError((err, caught) => {
            console.error(err)
            return caught
          }),
        )
        .subscribe()

      result.push(subscription)
    })

    subsRef.current = result
  }, [componentData.store.events, componentData.id, store])

  useMountUnmount(() => {
    createSubscriptions()
  }, () => {
    unsubscribe()
  })

  return null
}

function getActionHandlersChain(store: Store, actionDataList: ActionData[]) {
  const actions = actionDataList.map(data => ({
    func: store.findAction(data).func,
    args: data.args ? {...data.args} : {}
  }))

  return async (e: ActionEventArgs) => {
    for (const {func, args} of actions) {
      const result = func(e, args)
      if (isPromise(result)) await result
    }
  }
}
