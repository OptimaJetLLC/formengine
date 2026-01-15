import {fireEvent, RenderResult, waitFor, within} from '@testing-library/react'
import {expect} from 'vitest'

const checkIsElementFound = (name: string, element: Element | null) => {
  if (!element) throw new Error(`Unable to find ${name} element`)
}

export const selectDropDownOption = async <T extends HTMLElement>(rendered: RenderResult, dropdown: T, byValue: string): Promise<void> => {
  fireEvent.click(dropdown)
  const option = await rendered.findByRole('option', {name: byValue})
  fireEvent.click(option)
  fireEvent.mouseDown(document)
  await waitFor(() => expect(rendered.queryAllByRole('option', {name: byValue})).toHaveLength(0))
}

export const expectDropDownToHaveTextContent = async <T extends HTMLElement>(dropdown: T, value: string) => {
  const pickerDescribe = await within(dropdown).findByTestId('picker-describe')
  expect(pickerDescribe).toHaveTextContent(value)
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

export const getPropertyInput = async (findByTestId: RenderResult['findByTestId'],
                                       fieldKey: string,
                                       propertyKey: string,
                                       tabName = 'Main') => {
  fireEvent.click(await findByTestId(fieldKey))
  fireEvent.click(await findByTestId(`${tabName}_Tab`))
  const property = await findByTestId(`${propertyKey}-labeled-wrapper`)
  const propertyInput = property.querySelector('input')
  expect(propertyInput).not.toBeNull()

  if (!propertyInput) {
    throw new Error('Input not found')
  }

  return propertyInput
}

export const addCustomEventHandler = async (renderResult: RenderResult, eventName: string, actionName: string) => {
  const {findByTestId, findByRole} = renderResult
  fireEvent.click(await findByTestId('Actions_Tab'))

  const addButton = await findByTestId(`${eventName}-add-button`)
  fireEvent.click(addButton)

  const menu = await findByRole('menubar')
  const menuItems = await within(menu).findAllByRole('menuitem')

  const customActionsItem = menuItems.find(menuItem => menuItem.getAttribute('data-event-key') === 'custom')
  if (!customActionsItem) {
    throw new Error(`Unable to find custom event key`)
  }

  fireEvent.click(customActionsItem)

  const actions = await within(menu).findAllByRole('menuitem')
  const actionDataEventKey = `custom-${actionName}`
  const action = actions.find(action => action.getAttribute('data-event-key') === actionDataEventKey)
  if (!action) {
    throw new Error(`Unable to find action with data-event-key: '${actionDataEventKey}'`)
  }

  fireEvent.click(action)
}

export const togglePreview = async (app: RenderResult) => {
  const {container} = app

  await waitFor(() => expect(container.querySelector('.FE_Header:not(.FE_Palette_Component)')).toBeInTheDocument())

  const header = container.querySelector('.FE_Header:not(.FE_Palette_Component)')
  checkIsElementFound('header', header)

  const button = await within(header as HTMLElement).findByText('Preview')

  fireEvent.click(button)
}

export const toggleTheme = async (container: HTMLElement) => {
  const getButton = () => container.querySelector('.FE_Header .FE_ToggleThemeButton')
  await waitFor(() => expect(getButton()).toBeInTheDocument())
  const button = getButton()
  checkIsElementFound('ToggleThemeButton', button)

  fireEvent.click(button as Element)
}
