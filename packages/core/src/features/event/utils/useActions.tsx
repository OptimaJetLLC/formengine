import {forIn, transform} from 'lodash'
import {useEffect} from 'react'
import {filter, Subscription} from 'rxjs'
import {Store} from '../../../stores/Store'
import {useComponentData} from '../../../utils/contexts/ComponentDataContext'
import {useStore} from '../../../utils/contexts/StoreContext'
import {denoteBinds} from '../../substitution'
import {DidMountEvent, WillUnmountEvent} from '../consts'
import {ActionData, Arguments, Func} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

export const useActions = () => {
  const store = useStore()
  const componentData = useComponentData()

  //Init actions
  useEffect(() => {
    const subscriptions: Subscription[] = []

    forIn(componentData.componentStore.events, (actionDataList: ActionData[], eventName) => {
      actionDataList.forEach((data) => {
        const {params, func} = store.findAction(data)
        const action = params ? getActionHandler(store, func, data.args) : func
        const subscription = store.eventSubject
          .pipe(filter(e => e.type === eventName && e.sender.key === componentData.componentStore.key))
          .subscribe(action)
        subscriptions.push(subscription)
      })
    })

    return () => subscriptions.forEach(s => s.unsubscribe())
  }, [componentData.componentStore.events])

  useEffect(() => {
    store.eventSubject.next(new ActionEventArgs(DidMountEvent, componentData, store, []))
    return () => store.eventSubject.next(new ActionEventArgs(WillUnmountEvent, componentData, store, []))
  }, [])
}


function getActionHandler(store: Store, func: Func, args?: Arguments) {
  //TODO init in default value for arguments?
  return function (e: ActionEventArgs) {
    const actionArgs = !args ? {} :
      transform(args, (result: Record<string, any>, value, argumentName) =>
        result[argumentName] = denoteBinds(value, store))
    func(actionArgs, e)
  }
}
