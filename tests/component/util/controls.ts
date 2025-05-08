import {fireEvent, RenderResult, waitFor, within} from '@testing-library/react'

export const selectDropDownOption = async <T extends HTMLElement>(rendered: RenderResult, dropdown: T, byValue: string): Promise<void> => {
  fireEvent.click(dropdown)
  const option = await rendered.findByRole('option', {name: byValue})
  fireEvent.click(option)
  fireEvent.mouseDown(document)
  await waitFor(() => expect(rendered.queryAllByRole('option', {name: byValue})).toHaveLength(0))
}

export const changeFormLanguage = async (rendered: RenderResult, language: string) => {
  const formLanguageDropdown = await rendered.findByTestId('designer-form-language')

  expect(formLanguageDropdown).toBeInTheDocument()

  fireEvent.click(formLanguageDropdown)

  const picker = await waitFor(async () => await rendered.findByTestId('picker-popup'))
  const option = await within(picker).findByText(language)

  fireEvent.click(option)
  fireEvent.mouseDown(document)

  await waitFor(() => expect(formLanguageDropdown).toHaveTextContent(language))
}
