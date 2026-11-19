import {buildForm} from '@react-form-builder/core'
import {BuilderView, FormBuilder, IFormStorage} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import {expectDropDownToHaveTextContent, selectDropDownOption} from '../util/controls'
import {parseForm} from '../util/parseForm'
import {renderBuilder} from '../util/renderBuilder'

const builderView = new BuilderView(allComponentsBuilder)

describe('Form settings test', () => {
  it('renders repeated form names from an external storage without duplicate-key errors', async () => {
    const form = {form: {key: 'Screen', type: 'Screen'}}
    const formStorage: IFormStorage = {
      getForm: vi.fn().mockResolvedValue(JSON.stringify(form)),
      getFormNames: vi.fn().mockResolvedValue(['Shared', 'Shared']),
      removeForm: vi.fn().mockResolvedValue(undefined),
      saveForm: vi.fn().mockResolvedValue(undefined),
    }
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const {findByTestId, findAllByTestId} = await renderBuilder(form, {formStorage, formName: 'Shared'})
      fireEvent.click(await findByTestId('Forms_Tab'))

      expect(await findAllByTestId('form-list-item-Shared')).toHaveLength(2)
      expect(consoleError).not.toHaveBeenCalled()
    } finally {
      consoleError.mockRestore()
    }
  })

  it('The tooltip dropdown should contain the tooltip components', async () => {
    const renderResult = render(<FormBuilder view={builderView} />)
    const {findByTestId} = renderResult

    const settingsTabButton = await findByTestId('Settings_Tab')
    fireEvent.click(settingsTabButton)

    const tooltipTypePicker = await findByTestId('tooltipType-property-input')
    expect(tooltipTypePicker).toBeInTheDocument()

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Rs Tooltip')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Rs Tooltip')

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Ant Tooltip')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Ant Tooltip')
  })

  it('The error dropdown should contain the error components', async () => {
    const renderResult = render(<FormBuilder view={builderView} />)
    const {findByTestId} = renderResult

    const settingsTabButton = await findByTestId('Settings_Tab')
    fireEvent.click(settingsTabButton)

    const tooltipTypePicker = await findByTestId('errorType-property-input')
    expect(tooltipTypePicker).toBeInTheDocument()

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Rs Error Message')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Rs Error Message')

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Default Error Message')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Default Error Message')
  })

  it('The default form should have the default tooltip type and modal type', async () => {
    const builderView = new BuilderView(allComponentsBuilder)
    const props = {view: builderView, getForm: undefined}

    const {getFormBuilder, findByTestId} = await renderBuilder({}, props)

    const settingsTabButton = await findByTestId('Settings_Tab')
    fireEvent.click(settingsTabButton)

    const tooltipTypePicker = await findByTestId('tooltipType-property-input')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Rs Tooltip')

    const modalTypePicker = await findByTestId('modalType-property-input')
    await expectDropDownToHaveTextContent(modalTypePicker, 'Rs Modal')

    const form = parseForm(getFormBuilder()?.formAsString)
    expect(form?.tooltipType).toEqual('RsTooltip')
    expect(form?.modalType).toEqual('RsModal')
  })

  it('The form cleanup should set the default tooltip type and modal window type', async () => {
    const emptyForm = JSON.parse(buildForm().json())
    const {getFormBuilder, findByTestId} = await renderBuilder(emptyForm)

    const settingsTabButton = await findByTestId('Settings_Tab')
    fireEvent.click(settingsTabButton)

    const tooltipTypePicker = await findByTestId('tooltipType-property-input')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Select')

    const modalTypePicker = await findByTestId('modalType-property-input')
    await expectDropDownToHaveTextContent(modalTypePicker, 'Select')

    const menuClear = await findByTestId('main-menu-clear')
    fireEvent.click(menuClear)

    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Rs Tooltip')
    await expectDropDownToHaveTextContent(modalTypePicker, 'Rs Modal')

    const form = parseForm(getFormBuilder()?.formAsString)
    expect(form?.tooltipType).toEqual('RsTooltip')
    expect(form?.modalType).toEqual('RsModal')
  })

  it('The new form should have a default tooltip type and modal window type set', async () => {
    const formNames = ['default']
    const forms: Record<string, string> = {
      default: buildForm().json(),
    }
    const formStorage: IFormStorage = {
      getForm(formName?: string) {
        return Promise.resolve(forms[formName ?? 'default'])
      },
      getFormNames() {
        return Promise.resolve(formNames)
      },
      removeForm(formName: string) {
        delete forms[formName]
        return Promise.resolve()
      },
      saveForm(formName: string, formValue: string) {
        forms[formName] = formValue
        return Promise.resolve()
      },
    }

    const emptyForm = JSON.parse(buildForm().json())
    const {findByTestId, queryByTestId} = await renderBuilder(emptyForm, {formStorage, formName: 'default'})

    const settingsTabButton = await findByTestId('Settings_Tab')
    fireEvent.click(settingsTabButton)

    const tooltipTypePicker = await findByTestId('tooltipType-property-input')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Select')

    const modalTypePicker = await findByTestId('modalType-property-input')
    await expectDropDownToHaveTextContent(modalTypePicker, 'Select')

    const formsTabButton = await findByTestId('Forms_Tab')
    fireEvent.click(formsTabButton)

    const addNewFormButton = await findByTestId('add-new-form-button')
    fireEvent.click(addNewFormButton)

    const modalNameInput = await findByTestId('modal-name-input')
    fireEvent.change(modalNameInput, {target: {value: 'myNewForm'}})

    const modalOkButton = await findByTestId('modal-ok-button')
    fireEvent.click(modalOkButton)

    await waitFor(() => expect(queryByTestId('modal-ok-button')).not.toBeInTheDocument())
    await waitFor(() => expect(forms.myNewForm).toBeDefined())

    const form = parseForm(forms.myNewForm)
    expect(form?.tooltipType).toEqual('RsTooltip')
    expect(form?.modalType).toEqual('RsModal')

    fireEvent.click(settingsTabButton)
    await expectDropDownToHaveTextContent(await findByTestId('tooltipType-property-input'), 'Rs Tooltip')
    await expectDropDownToHaveTextContent(await findByTestId('modalType-property-input'), 'Rs Modal')
  })
})
