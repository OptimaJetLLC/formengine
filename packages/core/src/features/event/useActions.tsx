import {forIn, transform} from 'lodash'
import {useEffect} from 'react'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {denoteBinds} from '../substitution'
import {Func, WeakActionData, WeakArgs} from './types'
import {ActionEventArgs} from './utils/ActionEventArgs'

export const useActions = () => {
  const store = useStore()
  const {componentStore} = useComponentData()


  useEffect(() => {
    const un = [] as Function[]

    forIn(componentStore.events, (weakActions: WeakActionData[], eventName) => {
      weakActions.forEach((data) => {
        const {args, func} = store.findAction(data.actionName, data.targetKey)
        const action = args ? getActionHandler(func, data.weakArgs) : func
        un.push(store.eventBus.listen(action, {target: componentStore.key, type: eventName}))
      })
    })

    return () => un.forEach(value => value())

    function getActionHandler(func: Func, weakArgs?: WeakArgs) {
      //TODO init in default value for arguments?
      return function (e: ActionEventArgs) {
        const actionArgs = !weakArgs ? {} :
          transform(weakArgs, (result: Record<string, any>, value, argumentName) =>
            result[argumentName] = denoteBinds(value, store))
        func(actionArgs, e)
      }
    }

  }, [componentStore.events])
}
