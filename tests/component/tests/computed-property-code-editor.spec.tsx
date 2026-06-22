import {fireEvent, waitFor, within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import functionForm from './forms/computed-property-function.json'
import localizationMultilineForm from './forms/computed-property-localization-multiline.json'
import localizationForm from './forms/computed-property-localization.json'

async function openContentPropertyCodeEditor(
  findByTestId: (id: string) => Promise<HTMLElement>,
  componentTestId: string
) {
  fireEvent.click(await findByTestId(componentTestId))
  fireEvent.click(await findByTestId('Main_Tab'))

  const wrapper = await findByTestId('content-labeled-wrapper')
  const buttons = within(wrapper).getAllByRole('button')

  expect(buttons.length).toBeGreaterThan(0)
  fireEvent.click(buttons[0])
}

describe('Computed property code editors', () => {
  it('shows the localization editor for single-line localized content', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(localizationForm)

    await openContentPropertyCodeEditor(findByTestId, 'locStaticContent')

    await waitFor(() => {
      expect(document.body.textContent).toContain('Edit property: locStatic.Content')
    })
    await waitFor(() => {
      expect(document.body.textContent).toContain('Hello from fluent')
    })

    expect(document.body.textContent).toContain('Localization')
    expect(document.body.textContent).toContain('Calculable value')
    expect(queryByTestId('save-code-action-button')).toBeInTheDocument()
  })

  it('shows the localization editor with multiline fluent body', async () => {
    const {findByTestId} = await renderBuilder(localizationMultilineForm)

    await openContentPropertyCodeEditor(findByTestId, 'locMultiStaticContent')

    await waitFor(() => {
      expect(document.body.textContent).toContain('Edit property: locMulti.Content')
    })
    await waitFor(() => {
      expect(document.body.textContent).toContain('Line one')
    })

    expect(document.body.textContent).toContain('Localization')
  })

  it('shows the calculable function editor with save control', async () => {
    const {findByTestId} = await renderBuilder(functionForm)

    await openContentPropertyCodeEditor(findByTestId, 'calcStaticContent')

    await waitFor(() => {
      expect(document.body.textContent).toContain('Edit property: calcStatic.Content')
    })
    await waitFor(() => {
      expect(document.body.textContent).toContain('Calculable value')
    })

    expect(document.body.textContent).toContain('Localization')
    expect(await findByTestId('save-code-action-button')).toBeInTheDocument()
  })
})
