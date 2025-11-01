import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {renderForm} from '../util/renderForm'
import {asyncAct} from './asyncAct'
import formDataInValidation from './forms/form-data-in-validation.json'
import loginForm from './forms/login-form.json'
import validationLocalizationChildForm from './forms/validation-localization-child-form.json'
import validationLocalizationParentForm from './forms/validation-localization-parent-form.json'

const enErrors = {
  'child': {
    'input': 'Input is invalid bad',
    'checkbox': 'Checkbox is invalid true',
    'date': 'Date is invalid true bad'
  },
  'repeater': [
    {
      'justInput': 'Min 10 good#0',
      'input': 'Input is invalid bad',
      'checkbox': 'Checkbox is invalid true',
      'date': 'Date is invalid true bad'
    },
    {
      'justInput': 'Min 10 good#1',
      'input': 'Input is invalid bad',
      'checkbox': 'Checkbox is invalid true',
      'date': 'Date is invalid true bad'
    },
    {
      'justInput': 'Min 10 good#2',
      'input': 'Input is invalid bad',
      'checkbox': 'Checkbox is invalid true',
      'date': 'Date is invalid true bad'
    }
  ]
}

// The localizer adds Unicode characters (FSI, PDI)
const deErrors = {
  'child': {
    'input': 'Eingabe ist ungültig bad',
    'checkbox': 'Kontrollkästchen ist ungültig true',
    'date': 'Das Datum ist ungültig true bad'
  },
  'repeater': [
    {
      'justInput': 'DE Min 10 good#0',
      'input': 'Eingabe ist ungültig bad',
      'checkbox': 'Kontrollkästchen ist ungültig true',
      'date': 'Das Datum ist ungültig true bad'
    },
    {
      'justInput': 'DE Min 10 good#1',
      'input': 'Eingabe ist ungültig bad',
      'checkbox': 'Kontrollkästchen ist ungültig true',
      'date': 'Das Datum ist ungültig true bad'
    },
    {
      'justInput': 'DE Min 10 good#2',
      'input': 'Eingabe ist ungültig bad',
      'checkbox': 'Kontrollkästchen ist ungültig true',
      'date': 'Das Datum ist ungültig true bad'
    }
  ]
}

describe('Validation', () => {
  it('validation should returns the error messages', async () => {
    const getForm = () => JSON.stringify(loginForm)
    const initialData = {login: 't1', password: 't2'}
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    render(<FormViewer view={view} getForm={getForm} initialData={initialData} viewerRef={viewerRef}/>)

    const formData = viewerRef.current?.formData
    if (!formData) {
      throw new Error('FormData is not defined')
    }

    await waitFor(() => expect(formData.data.login).toEqual('t1'), {timeout: 5000})
    const returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = JSON.stringify({login: 'Too small: expected string to have >=3 characters'})
    await waitFor(() => expect(JSON.stringify(returnedErrors)).toEqual(expectedErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)
  })

  it('validation should show all error messages if showAllValidationErrors is enabled', async () => {
    const initialData = {login: 't1', password: 't2'}
    const {formData} = renderForm(loginForm, {initialData, showAllValidationErrors: true})

    await waitFor(() => expect(formData.data.login).toEqual('t1'))
    const returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = JSON.stringify({login: 'Too small: expected string to have >=3 characters Should include 2'})
    await waitFor(() => expect(JSON.stringify(returnedErrors)).toEqual(expectedErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)
  })

  it('validation should return the localized error messages', async () => {
    const getForm = () => JSON.stringify(validationLocalizationChildForm)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId, findByLabelText, rerender} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    expect(await findByTestId('child-date')).toBeInTheDocument()
    const formData = viewerRef.current?.formData
    if (!formData) {
      throw new Error('FormData is not defined')
    }

    const returnedErrors = await asyncAct(async () => await formData.validate())

    const expectedErrors = JSON.stringify({
      'input': 'Input is invalid bad',
      'checkbox': 'Checkbox is invalid true',
      'date': 'Date is invalid true bad'
    })
    await waitFor(() => expect(JSON.stringify(returnedErrors)).toEqual(expectedErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)

    rerender(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} language="de-DE"/>)
    expect(await findByLabelText('Current_lang_DE')).toBeInTheDocument()

    const returnedDeErrors = await asyncAct(async () => await formData.validate())
    const expectedDeErrors = JSON.stringify({
      'input': 'Eingabe ist ungültig bad',
      'checkbox': 'Kontrollkästchen ist ungültig true',
      'date': 'Das Datum ist ungültig true bad'
    })
    await waitFor(() => expect(JSON.stringify(returnedDeErrors)).toEqual(expectedDeErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedDeErrors)
  })

  it('validation should return the localized error messages on all levels', async () => {
    const getForm = (name?: string) => {
      if (name === 'child') return JSON.stringify(validationLocalizationChildForm)
      return JSON.stringify(validationLocalizationParentForm)
    }
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findAllByTestId, findAllByLabelText, rerender} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    expect(await findAllByTestId('child-date')).toHaveLength(4)

    const formData = viewerRef.current?.formData
    if (!formData) {
      throw new Error('FormData is not defined')
    }

    const returnedErrors = await asyncAct(async () => await formData.validate())

    const expectedErrors = JSON.stringify(enErrors)
    await waitFor(() => expect(JSON.stringify(returnedErrors)).toEqual(expectedErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)

    rerender(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} language="de-DE"/>)
    expect(await findAllByLabelText('Current_lang_DE')).not.toHaveLength(0)

    const returnedDeErrors = await asyncAct(async () => await formData.validate())
    const expectedDeErrors = JSON.stringify(deErrors)
    await waitFor(() => expect(JSON.stringify(returnedDeErrors)).toEqual(expectedDeErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedDeErrors)
  })

  it('should provide the current form data in the code validation function', async () => {
    const getForm = () => JSON.stringify(formDataInValidation)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    const formData = viewerRef.current?.formData
    if (!formData) throw new Error('FormData is not defined')

    await asyncAct(async () => await formData.validate())
    expect(JSON.stringify(formData.errors)).toEqual('{}')

    const checkbox = await findByTestId('checkbox')
    fireEvent.click(checkbox)
    expect(formData.data.checkbox).toEqual(false)

    await asyncAct(async () => await formData.validate())
    const expectedErrors = JSON.stringify({input: 'Validation failed'})
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)
  })
})
