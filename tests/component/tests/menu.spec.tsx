import {buildForm} from '@react-form-builder/core'
import {IFormStorage} from '@react-form-builder/designer'
import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'

const createFakeFormStorage = (forms: Record<string, string>): IFormStorage => {
  return {
    getForm(formName?: string) {
      return Promise.resolve(forms[formName ?? 'empty'])
    },
    getFormNames() {
      return Promise.resolve(Object.keys(forms))
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
}

describe('Menu tests', () => {
  it('The menu item "Add a new form" should add a new form', async () => {
    const forms: Record<string, string> = {
      empty: buildForm().json(),
    }
    const fakeFormStorage = createFakeFormStorage(forms)
    const emptyForm = JSON.parse(forms.empty)
    const {findByTestId, queryByTestId} = await renderBuilder(emptyForm, {formStorage: fakeFormStorage, formName: 'empty'})

    const addNewFormButton = await findByTestId('menu-add-new-form-button')
    fireEvent.click(addNewFormButton)

    const modalNameInput = await findByTestId('modal-name-input')
    fireEvent.change(modalNameInput, {target: {value: 'testForm'}})

    const modalOkButton = await findByTestId('modal-ok-button')
    fireEvent.click(modalOkButton)

    await waitFor(() => expect(queryByTestId('modal-ok-button')).not.toBeInTheDocument())
    await waitFor(() => expect(forms.testForm).toBeDefined())
  })

  it('should hide menu items when customization hidden is true', async () => {
    const forms: Record<string, string> = {
      empty: buildForm().json(),
    }
    const fakeFormStorage = createFakeFormStorage(forms)
    const emptyForm = JSON.parse(forms.empty)

    // Hide the Clear button via customization
    const customization = {
      MainMenu_Item_SaveAs: {
        hidden: true,
      },
    }

    const {findByTestId, queryByTestId} = await renderBuilder(emptyForm, {
      formStorage: fakeFormStorage,
      formName: 'empty',
      customization,
    })

    expect(await findByTestId('main-menu-clear')).toBeInTheDocument()
    expect(queryByTestId('queryByTestId')).not.toBeInTheDocument()
  })
})
