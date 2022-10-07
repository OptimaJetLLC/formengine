import {forIn} from 'lodash'
import {useEffect} from 'react'
import {useComponentData} from '../../../../utils/contexts/ComponenDataContext'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {ActionEventHandler, EventName, NotifyTarget} from '../../types'


export const useNotifies = (actionsMap: Record<EventName, ActionEventHandler[]>) => {
  const store = useStore()
  const {componentStore} = useComponentData()

  useEffect(() => {
    forIn(actionsMap, (actions, eventName) => {
      const target: NotifyTarget = {eventName: eventName, target: componentStore.key}
      const notify = store.eventBus.notify.bind(store.eventBus, target)
      actions.push(notify)
    })
  }, [])
}
