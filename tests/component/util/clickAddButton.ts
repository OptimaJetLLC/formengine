import {fireEvent} from '@testing-library/react'

/**
 * Opens the components modal via the canvas add control.
 */
export const clickAddButton = (element: Element): void => {
  fireEvent.click(element)
}
