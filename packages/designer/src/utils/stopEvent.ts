import {EventHandler} from 'react'

/**
 * Cancels the event if it is cancelable. **Internal use only.**
 * @param e the event object.
 */
export const stopEvent: EventHandler<any> = e => {
  e.preventDefault()
  e.stopPropagation()
}
