import {Store} from '../../../stores/Store'
import {ComponentData} from '../../../utils/contexts/ComponenDataContext'
import {isFunc} from '../../annotation/utils'
import {EventName} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

export const initEvents = (data: ComponentData, store: Store) => {
  const events = {} as Record<EventName, Function>

  const eventNames = new Set<string>(data.model.properties.filter(isFunc).map((value) => value.key))
  eventNames.add('onChange').add('onBlur')
  eventNames.forEach((name) => events[name] = getEmptyHandler(name))

  return events

  function getEmptyHandler(eventName: string) {
    const handler = (...args: any[]) => {
      const actionEventArgs = new ActionEventArgs(eventName, data.componentStore, store, args)
      store.eventBus.notify({type: eventName, target: data.componentStore.key}, actionEventArgs)
    }

    return handler
  }
}
