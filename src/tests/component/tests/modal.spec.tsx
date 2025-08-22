import {builderViewWithCss, viewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {addCustomEventHandler, togglePreview} from '../util/controls'
import beforeHideDataShowModalForm from './forms/modal/before-hide-show-modal.json'
import beforeShowShowModalForm from './forms/modal/before-show-show-modal-form.json'
import confirmationModal from './forms/modal/confirmation-modal-form.json'
import modalLayoutForm from './forms/modal/modal-layout-form.json'
import modalLayoutWithConfirmationForm from './forms/modal/modal-layout-with-confirmation-form.json'
import simpleShowModalForm from './forms/modal/simple-show-modal-form.json'
import useFormDataShowModalForm from './forms/modal/use-form-data-show-modal-form.json'

describe('Modal tests', () => {
  it('Should display a modal window only with the modalKey argument', async () => {
    const getForm = (name?: string) => {
      const form = name === 'modal-layout' ? modalLayoutForm : simpleShowModalForm
      return JSON.stringify(form)
    }

    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const okButton = await findByTestId('okButton')
    fireEvent.click(okButton)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())

    fireEvent.click(showModalButton)

    const cancelButton = await findByTestId('cancelButton')
    fireEvent.click(cancelButton)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
  })

  it('The ModalLayout close button closes the modal window', async () => {
    const getForm = (name?: string) => {
      const form = name === 'modal-layout' ? modalLayoutForm : simpleShowModalForm
      return JSON.stringify(form)
    }

    const {findByTestId, findByRole, queryByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const closeButton = await findByRole('button', {name: 'Close'})
    fireEvent.click(closeButton)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
  })

  it('Added modal window event handlers should be called', async () => {
    const eventHandlersData: Record<string, any> = {}
    const customActions = {
      onOpenEventHandler: () => {
        eventHandlersData.onOpen ??= []
        eventHandlersData.onOpen.push(new Date())
      },
      onCloseEventHandler: () => {
        eventHandlersData.onClose ??= []
        eventHandlersData.onClose.push(new Date())
      }
    }

    const getForm = (name?: string) => {
      const form = name === 'modal-layout' ? modalLayoutForm : simpleShowModalForm
      return JSON.stringify(form)
    }

    const renderResult = render(<FormBuilder view={builderViewWithCss} getForm={getForm} actions={customActions}/>)
    const {findByTestId, findByRole} = renderResult

    fireEvent.click(await findByTestId('Tree_Tab'))
    fireEvent.click(await findByTestId('modal1'))

    await addCustomEventHandler(renderResult, 'onOpen', 'onOpenEventHandler')
    await addCustomEventHandler(renderResult, 'onOpen', 'onOpenEventHandler')

    await addCustomEventHandler(renderResult, 'onClose', 'onCloseEventHandler')
    await addCustomEventHandler(renderResult, 'onClose', 'onCloseEventHandler')
    await addCustomEventHandler(renderResult, 'onClose', 'onCloseEventHandler')

    await togglePreview(renderResult)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    expect(Array.isArray(eventHandlersData.onOpen)).toBe(true)
    expect(eventHandlersData.onOpen.length).toEqual(2)

    const closeButton = await findByRole('button', {name: 'Close'})
    fireEvent.click(closeButton)

    expect(Array.isArray(eventHandlersData.onClose)).toBe(true)
    expect(eventHandlersData.onClose.length).toEqual(3)
  })

  it('openModal.useFormData should pass form data', async () => {
    const getForm = (name?: string) => {
      const form = name === 'modal-layout' ? modalLayoutForm : useFormDataShowModalForm
      return JSON.stringify(form)
    }

    const {findByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)

    const formInput = await findByTestId('formModalInput')
    const randomString = `${new Date().getTime()}`
    fireEvent.change(formInput, {target: {value: randomString}})

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = await findByTestId('modalInput')
    expect(modalInput).toHaveValue(randomString)
  })

  it('openModal.beforeShow returning false should prevent opening the modal window', async () => {
    const getForm = (name?: string) => {
      const form = name === 'modal-layout' ? modalLayoutForm : useFormDataShowModalForm
      return JSON.stringify(form)
    }

    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)

    const formInput = await findByTestId('formModalInput')
    fireEvent.change(formInput, {target: {value: 'no'}})

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    expect(queryByTestId('modalInput')).not.toBeInTheDocument()

    fireEvent.change(formInput, {target: {value: 'yes'}})
    fireEvent.click(showModalButton)
    const modalInput = await findByTestId('modalInput')
    expect(modalInput).toHaveValue('yes')
  })

  it('openModal.beforeShow should pass form data', async () => {
    const getForm = (name?: string) => {
      const form = name === 'modal-layout' ? modalLayoutForm : beforeShowShowModalForm
      return JSON.stringify(form)
    }

    const {findByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)

    const formInput = await findByTestId('formModalInput')
    fireEvent.change(formInput, {target: {value: 'some data'}})

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = await findByTestId('modalInput')
    expect(modalInput).toHaveValue('modal input data from beforeShow')
  })

  it('openModal.beforeHide should pass form data back', async () => {
    const getForm = (name?: string) => {
      const form = name === 'modal-layout' ? modalLayoutForm : beforeHideDataShowModalForm
      return JSON.stringify(form)
    }

    const initialData = {modalInput: 'one'}
    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss} initialData={initialData}/>)

    const formInput = await findByTestId('formModalInput')
    expect(formInput).toHaveValue('one')

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = await findByTestId('modalInput')
    expect(modalInput).toHaveValue('')

    fireEvent.change(modalInput, {target: {value: 'two'}})

    const cancelButton = await findByTestId('cancelButton')
    fireEvent.click(cancelButton)
    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
    expect(formInput).toHaveValue('one')

    fireEvent.click(showModalButton)
    const modalInput2 = await findByTestId('modalInput')
    expect(modalInput2).toHaveValue('')
    fireEvent.change(modalInput2, {target: {value: 'three'}})

    const okButton = await findByTestId('okButton')
    fireEvent.click(okButton)

    expect(await findByTestId('formModalInput')).toHaveValue('three')
  })

  it.skip('Confirmation should close the parent modal', async () => {
    // todo requires actions that return a value and interrupt the chain of actions
    const getForm = (name?: string) => {
      let form: any = beforeHideDataShowModalForm
      if (name === 'modal-layout') form = modalLayoutWithConfirmationForm
      if (name === 'confirmation-modal') form = confirmationModal
      return JSON.stringify(form)
    }

    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = await findByTestId('modalInput')
    expect(modalInput).toHaveValue('')
    fireEvent.change(modalInput, {target: {value: 'donut'}})

    const okButton = await findByTestId('okButton')
    fireEvent.click(okButton)

    const confirmationModalInput = await findByTestId('confirmationModalInput')
    expect(confirmationModalInput).toHaveValue('donut')

    const confirmOk = await findByTestId('confirmOk')
    fireEvent.click(confirmOk)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
  })
})
