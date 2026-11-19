import {BuilderView} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import {clickItemInMainMenu} from '../util/controls'
import {MockFormStorage} from '../util/mockFormStorage'

const defaultFormName = 'default-form'
const secondFormName = 'second-form'
const newFormName = 'new-form'

const view = new BuilderView(allComponentsBuilder)

describe('The form action', function () {
  it('"Save" - should save the current form', async () => {
    const onLoadForm = vi.fn()
    const onSaveForm = vi.fn()
    const formStorage = new MockFormStorage({onLoadForm, onSaveForm, formNames: [defaultFormName, secondFormName]})

    const {findByTestId} = render(
      <FormBuilder formName={defaultFormName} view={view} formStorage={formStorage} getForm={formStorage.getForm} persistFormName={false} />
    )
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(defaultFormName))

    fireEvent.click(await findByTestId('Forms_Tab'))
    const defaultFormItem = await findByTestId(`form-list-item-${defaultFormName}`)
    await waitFor(async () => expect(defaultFormItem.getAttribute('data-active')).toBeTruthy())

    fireEvent.click(await findByTestId(`form-list-open-item-${secondFormName}`))
    const secondFormItem = await findByTestId(`form-list-item-${secondFormName}`)
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(secondFormName))
    await waitFor(async () => expect(secondFormItem.getAttribute('data-active')).toBeTruthy())

    fireEvent.click(await findByTestId('header-save-form-button'))
    await waitFor(() => expect(onSaveForm).toHaveBeenLastCalledWith(secondFormName))
  })

  it('"Save as" - should save the form with a new name and select it in the Forms tab', async () => {
    const onLoadForm = vi.fn()
    const onSaveForm = vi.fn()
    const formStorage = new MockFormStorage({onLoadForm, onSaveForm, formNames: [defaultFormName]})

    const {findByTestId, container} = render(
      <FormBuilder formName={defaultFormName} view={view} formStorage={formStorage} getForm={formStorage.getForm} persistFormName={false} />
    )
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(defaultFormName))

    fireEvent.click(await findByTestId('Forms_Tab'))
    const defaultFormItem = await findByTestId(`form-list-item-${defaultFormName}`)
    await waitFor(async () => expect(defaultFormItem.getAttribute('data-active')).toBeTruthy())
    await clickItemInMainMenu(container, 'Save as...')

    fireEvent.change(await findByTestId('modal-name-input'), {target: {value: newFormName}})
    fireEvent.click(await findByTestId('modal-ok-button'))

    await waitFor(() => expect(onSaveForm).toHaveBeenCalledWith(newFormName))

    const newFormItem = await findByTestId(`form-list-item-${newFormName}`)
    await waitFor(async () => expect(newFormItem.getAttribute('data-active')).toBeTruthy())
  })

  it('"Add new form" - should create a new form and select it in the Forms tab', async () => {
    const onLoadForm = vi.fn()
    const onSaveForm = vi.fn()
    const formStorage = new MockFormStorage({onLoadForm, onSaveForm, formNames: [defaultFormName]})

    const {findByTestId} = render(
      <FormBuilder formName={defaultFormName} view={view} formStorage={formStorage} getForm={formStorage.getForm} persistFormName={false} />
    )
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(defaultFormName))

    fireEvent.click(await findByTestId('Forms_Tab'))
    const defaultFormItem = await findByTestId(`form-list-item-${defaultFormName}`)
    await waitFor(async () => expect(defaultFormItem.getAttribute('data-active')).toBeTruthy())
    fireEvent.click(await findByTestId('add-new-form-button'))

    fireEvent.change(await findByTestId('modal-name-input'), {target: {value: newFormName}})
    fireEvent.click(await findByTestId('modal-ok-button'))

    await waitFor(() => expect(onSaveForm).toHaveBeenCalledWith(newFormName))

    const newFormItem = await findByTestId(`form-list-item-${newFormName}`)
    await waitFor(async () => expect(newFormItem.getAttribute('data-active')).toBeTruthy())
  })
})
