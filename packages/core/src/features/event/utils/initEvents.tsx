import {Store} from '../../../stores/Store'
import {ComponentData} from '../../../utils/contexts/ComponenDataContext'
import {isFunc} from '../../annotation'
import {EventName} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

export const initEvents = (data: ComponentData, store: Store) => {
  const events = {} as Record<EventName, Function>

  const eventNames = new Set<string>(data.model.properties.filter(isFunc).map((value) => value.key))
  eventNames.add('onChange').add('onBlur')
  eventNames.forEach((name) => events[name] = getNotifyEventHandler(name, data, store))

  return events
}

function getNotifyEventHandler(eventName: string, data: ComponentData, store: Store) {
  return (...args: any[]) => {
    const actionEventArgs = new ActionEventArgs(eventName, data.componentStore, store, args)
    store.eventBus.notify({type: eventName, target: data.componentStore.key}, actionEventArgs)
  }
}
