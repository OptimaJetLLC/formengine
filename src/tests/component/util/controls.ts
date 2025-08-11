import {fireEvent, RenderResult, waitFor, within} from '@testing-library/react'
import {expect} from 'vitest'

export const selectDropDownOption = async <T extends HTMLElement>(rendered: RenderResult, dropdown: T, byValue: string): Promise<void> => {
  fireEvent.click(dropdown)
  const option = await rendered.findByRole('option', {name: byValue})
  fireEvent.click(option)
  fireEvent.mouseDown(document)
  await waitFor(() => expect(rendered.queryAllByRole('option', {name: byValue})).toHaveLength(0))
}

/*
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
*/

export const clickItemInMainMenu = async (container: HTMLElement, itemName: string, subItemName?: string) => {
  const mainMenuDropdown = container.querySelector('.FE_MainMenu_Dropdown') as HTMLElement
  const mainMenuButton = mainMenuDropdown.querySelector('.FE_MainMenu_Button > button') as HTMLElement

  expect(mainMenuDropdown).toBeInTheDocument()
  expect(mainMenuButton).toBeInTheDocument()

  fireEvent.click(mainMenuButton)

  const item = await within(mainMenuDropdown).findByText(itemName)

  expect(item).not.toBeNull()
  expect(item).toBeVisible()

  fireEvent.click(item)

  if (!subItemName) return

  const subItemOption = within(mainMenuDropdown).getByText(subItemName)

  expect(subItemOption).not.toBeNull()

  fireEvent.click(subItemOption)
  fireEvent.mouseDown(document)
}
