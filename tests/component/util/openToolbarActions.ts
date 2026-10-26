import type {RenderResult} from '@testing-library/react'
import {fireEvent, waitFor, within} from '@testing-library/react'
import {expect} from 'vitest'

/**
 * Opens the selected component toolbar actions when they do not fit on the canvas.
 * In a real browser, the actions can already be expanded based on the measured component width.
 */
export const openToolbarActions = async (): Promise<void> => {
  const toolbar = await waitFor(() => {
    const visibleToolbar = Array.from(document.querySelectorAll<HTMLElement>('[data-fe-toolbar]:not(.compact)')).find(
      element => element.getAttribute('aria-hidden') === 'false'
    )
    if (!visibleToolbar) throw new Error('Expected a visible canvas toolbar')
    return visibleToolbar
  })

  const actionsButton = toolbar.querySelector<HTMLElement>('[data-testid="toolbar-actions-button"]')
  if (actionsButton) fireEvent.click(actionsButton)
}

/**
 * Adds a Label after the selected component through the canvas toolbar Add menu.
 * @param queries the Testing Library queries from the rendered builder
 */
export const addSiblingLabelFromToolbar = async ({
  findByRole,
  findByTestId,
}: Pick<RenderResult, 'findByRole' | 'findByTestId'>): Promise<void> => {
  await openToolbarActions()
  fireEvent.click(document.querySelector('[data-fe-toolbar] .add-button')!)
  fireEvent.click(await findByRole('button', {name: 'After'}))

  const dialog = await findByRole('dialog')
  fireEvent.click(await within(dialog).findByText('Label'))

  await waitFor(async () => expect(await findByTestId('rsLabel1-editable-wrapper')).toBeInTheDocument())
}
