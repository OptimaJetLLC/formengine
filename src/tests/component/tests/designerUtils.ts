import type {LanguageFullCode} from '@react-form-builder/core'
import type {RenderResult} from '@testing-library/react'
import {fireEvent, waitFor} from '@testing-library/react'

const previewButtonText = 'Preview'
const editButtonText = 'Edit'

/**
 * Switches to viewer mode by clicking the preview button.
 * @param findByText the function to find elements by text
 */
export const switchToViewerMode = async (findByText: RenderResult['findByText']) => {
  // ensure that the form is rendered
  const previewButton = await findByText(previewButtonText)
  expect(previewButton).toBeInTheDocument()

  fireEvent.click(previewButton)

  expect(await findByText(editButtonText)).toBeInTheDocument()
}

/**
 * Switches to designer mode by clicking the edit button.
 * @param findByText the function to find elements by text.
 */
export const switchToDesignerMode = async (findByText: RenderResult['findByText']) => {
  // ensure that the form is rendered
  const editButton = await findByText(editButtonText)
  expect(editButton).toBeInTheDocument()

  fireEvent.click(editButton)

  expect(await findByText(previewButtonText)).toBeInTheDocument()
}

/**
 * Switches the designer language.
 * @param code the full language code.
 * @param container the root HTML element.
 */
export const switchLanguage = async (code: LanguageFullCode, container: HTMLElement) => {
  const langSelector = `li[data-event-key="${code}"]`
  await waitFor(() => expect(container.querySelector(langSelector)).toBeInTheDocument())

  const langItem = container.querySelector(langSelector)
  if (!langItem) throw new Error(`Language "${code}" not found`)
  fireEvent.click(langItem)
}

/**
 * Switches the form language.
 * @param code the full language code.
 * @param findByTestId the function to find elements by test id.
 */
export const switchFormLanguage = async (code: LanguageFullCode, findByTestId: RenderResult['findByTestId']) => {
  const formLangSwitch = await findByTestId('designer-form-language')
  fireEvent.click(formLangSwitch)

  const pickerPopup = await findByTestId('picker-popup')
  const langItem = pickerPopup.querySelector(`div[data-key="${code}"]`)
  if (!langItem) throw new Error(`Form language "${code}" not found`)
  fireEvent.click(langItem)

  const displayValue = code.split('-')[1]
  await waitFor(async () => expect(await findByTestId('picker-describe')).toHaveTextContent(displayValue))
}
