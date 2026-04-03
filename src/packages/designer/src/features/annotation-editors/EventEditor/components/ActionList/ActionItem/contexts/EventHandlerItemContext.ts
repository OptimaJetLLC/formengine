import {createNonNullableContext} from '@react-form-builder/core'

/**
 * The event handler (action) item.
 */
type EventHandlerItem = {
  /**
   * The index in the array of event handlers.
   */
  index: number
  /**
   * The event name.
   */
  eventName: string
}

const [
  /**
   * **Internal use only.**
   */
  useEventHandlerItem,
  /**
   * **Internal use only.**
   */
  EventHandlerItemProvider] = createNonNullableContext<EventHandlerItem>('EventHandlerItemContext')

export {useEventHandlerItem, EventHandlerItemProvider}
