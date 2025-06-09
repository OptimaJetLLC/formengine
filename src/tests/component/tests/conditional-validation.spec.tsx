import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {asyncAct} from './asyncAct'
import withRepeater from './forms/conditional-validation/repeater.json'
import form from './forms/conditional-validation/simple.json'

const renderForm = (form: object, initialData?: Record<string, any>) => {
  const getForm = () => JSON.stringify(form)
  const viewerRef: FormViewerProps['viewerRef'] = {current: null}

  const {findByText, getAllByText} = render(
    <FormViewer view={view} getForm={getForm} viewerRef={viewerRef} initialData={initialData}/>
  )

  const formData = viewerRef.current?.formData
  if (!formData) {
    throw new Error('FormData is not defined')
  }

  return {findByText, formData, getAllByText}
}

describe('Conditional validation', () => {
  it('should return the error messages if the condition is met', async () => {
    const {formData} = renderForm(form)

    const returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {
      'email': 'Email is required',
      'address': 'Address is required'
    }
    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)
  })

  it('should not return the error messages if the condition is not met', async () => {
    const {formData, findByText} = renderForm(form)

    fireEvent.click(await findByText('Turn on validation'))
    const returnedErrors = await asyncAct(async () => await formData.validate())
    expect(returnedErrors).toStrictEqual({})
    expect(formData.errors).toStrictEqual({})
  })

  it('should have access to row data in repeater field', async () => {
    const {formData, getAllByText} = renderForm(withRepeater, {
      repeater1: [
        {},
        {address: 'address'}
      ]
    })

    let returnedErrors = await asyncAct(async () => await formData.validate())
    expect(returnedErrors).toStrictEqual({})
    expect(formData.errors).toStrictEqual({})

    fireEvent.click(getAllByText('Turn on validation in repeater')[0])
    returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {
      repeater1: [
        {address: 'Address is required'},
        {}
      ]
    }
    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)
  })

  it('should have access to form data in repeater field', async () => {
    const {formData, findByText} = renderForm(withRepeater, {
      repeater1: [{}]
    })

    let returnedErrors = await asyncAct(async () => await formData.validate())
    expect(returnedErrors).toStrictEqual({})
    expect(formData.errors).toStrictEqual({})

    fireEvent.click(await findByText('Turn on validation'))
    returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {
      repeater1: [
        {email: 'Email is required'}
      ]
    }
    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)
  })
})
