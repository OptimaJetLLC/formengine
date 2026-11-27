import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {clickItemInMainMenu} from '../util/controls'
import form from './forms/designer-form.json'

const getFormFn = () => JSON.stringify(form)

const App = () => <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} />

describe('Designer print', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('is available in the main menu and prints the viewer', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {container, findByText} = render(<App />)

    expect(await findByText('Preview')).toBeInTheDocument()
    await clickItemInMainMenu(container, 'Print')

    await waitFor(() => expect(print).toHaveBeenCalledOnce())
    expect(await findByText('Edit')).toBeInTheDocument()

    fireEvent(window, new Event('afterprint'))
    expect(await findByText('Preview')).toBeInTheDocument()
  })

  const openMainMenu = async (container: HTMLElement) => {
    const mainMenuDropdown = container.querySelector('.FE_MainMenu_Dropdown') as HTMLElement
    const mainMenuButton = mainMenuDropdown.querySelector('.FE_MainMenu_Button > button') as HTMLElement
    fireEvent.click(mainMenuButton)
  }

  it('shows the print hotkey hint in the main menu', async () => {
    const {container, findByText} = render(<App />)
    const isMac = navigator.userAgent.includes('Mac')

    expect(await findByText('Preview')).toBeInTheDocument()
    await openMainMenu(container)

    expect(await findByText(isMac ? '⌘P' : 'Ctrl+P')).toBeInTheDocument()
  })

  it('omits the print shortcut hint when hotkeys are disabled', async () => {
    const {container, findByText, queryByText} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} hotkeys={false} />
    )
    const isMac = navigator.userAgent.includes('Mac')

    expect(await findByText('Preview')).toBeInTheDocument()
    await openMainMenu(container)

    expect(await findByText('Print')).toBeInTheDocument()
    expect(queryByText(isMac ? '⌘P' : 'Ctrl+P')).not.toBeInTheDocument()
  })

  it('omits the print shortcut hint when the print binding is disabled', async () => {
    const {container, findByText, queryByText} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} hotkeys={{bindings: {print: false}}} />
    )
    const isMac = navigator.userAgent.includes('Mac')

    expect(await findByText('Preview')).toBeInTheDocument()
    await openMainMenu(container)

    expect(await findByText('Print')).toBeInTheDocument()
    expect(queryByText(isMac ? '⌘P' : 'Ctrl+P')).not.toBeInTheDocument()
  })

  it('shows the remapped print shortcut hint', async () => {
    const {container, findByText, queryByText} = render(
      <FormBuilder
        licenseKey={generatedLicenseKey}
        getForm={getFormFn}
        view={builderViewWithCss}
        hotkeys={{bindings: {print: {key: 'F8'}}}}
      />
    )
    const isMac = navigator.userAgent.includes('Mac')

    expect(await findByText('Preview')).toBeInTheDocument()
    await openMainMenu(container)

    expect(await findByText('F8')).toBeInTheDocument()
    expect(queryByText(isMac ? '⌘P' : 'Ctrl+P')).not.toBeInTheDocument()
  })

  it('intercepts Ctrl/Cmd+P and prints through viewer mode', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {findByText} = render(<App />)

    expect(await findByText('Preview')).toBeInTheDocument()

    const isMac = navigator.userAgent.includes('Mac')
    fireEvent.keyDown(document, {
      key: 'p',
      ctrlKey: !isMac,
      metaKey: isMac,
    })

    await waitFor(() => expect(print).toHaveBeenCalledOnce())
    expect(await findByText('Edit')).toBeInTheDocument()

    fireEvent(window, new Event('afterprint'))
    expect(await findByText('Preview')).toBeInTheDocument()
  })
})
