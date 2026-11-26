import {fireEvent, waitFor, within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {clickAddButton} from '../util/clickAddButton'
import {openToolbarActions} from '../util/openToolbarActions'
import {renderBuilder} from '../util/renderBuilder'
import emptyForm from './forms/empty-form.json'

describe('Accordion builder interaction', () => {
  it('shows the auto-created panel and checkbox when adding through the central add button', async () => {
    const {findByRole, findByTestId, queryByRole} = await renderBuilder(emptyForm)
    const screen = await findByTestId('mainScreen')

    clickAddButton(within(screen).getByTestId('add-button'))
    const accordionModal = await findByRole('dialog')
    fireEvent.click(within(accordionModal).getByTestId('RsAccordion-palette-component'))
    await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())

    const accordion = await findByTestId('rsAccordion1-editable-wrapper')
    clickAddButton(within(accordion).getByTestId('add-button'))
    const checkboxModal = await findByRole('dialog')
    fireEvent.click(within(checkboxModal).getByTestId('RsCheckbox-palette-component'))
    await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())

    // RSuite hides the native input and renders a separate visual control.
    expect(await within(accordion).findByRole('checkbox', {name: 'Checkbox'})).toBeInTheDocument()
    expect(within(accordion).getByText('Checkbox')).toBeVisible()
    expect(within(accordion).getByText('Panel')).toBeVisible()
  })

  it('allows switching panels in preview after adding and cloning a panel with default keys', async () => {
    const {findAllByRole, findByRole, findByTestId, queryByRole} = await renderBuilder(emptyForm)
    await findByTestId('mainScreen')
    fireEvent.doubleClick(await findByTestId('RsAccordion-palette-component'))

    const accordion = await findByTestId('rsAccordion1-editable-wrapper')
    clickAddButton(within(accordion).getByTestId('add-button'))
    const panelModal = await findByRole('dialog')
    fireEvent.click(within(panelModal).getByTestId('RsAccordionPanel-palette-component'))
    await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())

    fireEvent.click(await findByTestId('rsAccordionPanel1-editable-wrapper'))
    await openToolbarActions()
    fireEvent.click(await findByRole('button', {name: 'Clone component'}))
    await findByTestId('rsAccordionPanel2-editable-wrapper')

    fireEvent.click(await findByRole('button', {name: 'Preview'}))
    const [firstPanel, secondPanel] = await findAllByRole('button', {name: 'Panel'})
    expect(firstPanel).toHaveAttribute('aria-expanded', 'true')
    expect(secondPanel).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(secondPanel)

    await waitFor(() => {
      expect(secondPanel).toHaveAttribute('aria-expanded', 'true')
      expect(firstPanel).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
