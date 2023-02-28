import {keysIn} from 'lodash'
import {Store} from '../../../stores/Store'
import {ComponentData} from '../../../utils/contexts/ComponenDataContext'
import {DidMountEvent, WillUnmountEvent} from '../consts'
import {EventName} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

export const computeEvents = (data: ComponentData, store: Store) => {
  const events = {} as Record<EventName, Function>

  const eventNames = new Set(keysIn(data.componentStore.events))
  eventNames.add('onChange').add('onBlur')
  eventNames.delete(DidMountEvent)
  eventNames.delete(WillUnmountEvent)
  eventNames.forEach((name) =>
    events[name] = (...args: any[]) => store.eventSubject.next(new ActionEventArgs(name, data, store, args)))

  return events
}
