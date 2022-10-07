import {useComponentData} from '../../../../utils/contexts/ComponenDataContext'
import {ActionEventHandler, EventName, EventTuple} from '../../types'
import {useEffect, useRef, useState} from 'react'
import {useStore} from '../../../../utils/contexts/StoreContext'
import {ActionEvent} from '../../utils/ActionEvent'
import {isFunc} from '../../../annotation/utils'

export const useEventHandlers = (): EventTuple => {
  const store = useStore()
  const {componentStore, model: {properties}} = useComponentData()
  const [handlers, setHandlers] = useState<Record<EventName, Function>>({})
  const actionsMap: Record<EventName, ActionEventHandler[]> = useRef({}).current

  useEffect(setEventHandlers, [])

  return [handlers, actionsMap]


  function setEventHandlers() {
    const eventNames = properties.filter(isFunc).map((value) => value.key)
    eventNames.forEach((name) => [handlers[name], actionsMap[name]] = getEmptyHandler(name))
    setHandlers({...handlers})
  }

  function getEmptyHandler(eventName: string): [handler: Function, actions: ActionEventHandler[]] {
    //TODO use priority queue
    const actions: ActionEventHandler[] = []

    const handler = (...args: any[]) => {
      const actionEvent = new ActionEvent(eventName, componentStore, store, args)

      for (const action of actions) {
        try {
          action(actionEvent)
        } catch (e) {
          //TODO прерываемость
          throw e
        }
      }
    }

    return [handler, actions]
  }
}

