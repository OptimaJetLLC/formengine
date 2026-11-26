import {fireEvent} from '@testing-library/react'

/**
 * Opens the components modal via the canvas add control.
 * The control listens for pointerdown (not click) so drag sources cannot cancel the gesture.
 */
export const clickAddButton = (element: Element): void => {
  fireEvent.pointerDown(element, {button: 0})
}
