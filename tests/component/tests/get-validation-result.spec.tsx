import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderForm} from '../util/renderForm'
import formDataInValidation from './forms/form-data-in-validation.json'
import loginForm from './forms/login-form.json'
import validationCustomLocalizationForm from './forms/validation-custom-localization-form.json'
import validationLocalizationChildForm from './forms/validation-localization-child-form.json'
import validationLocalizationParentForm from './forms/validation-localization-parent-form.json'

const enErrors = {
  'child': {
    'input': ['Input is invalid bad'],
    'checkbox': ['Checkbox is invalid true'],
    'date': ['Date is invalid true bad']
  },
  'repeater': [
    {
      'justInput': ['Min 10 good#0'],
      'input': ['Input is invalid bad'],
      'checkbox': ['Checkbox is invalid true'],
      'date': ['Date is invalid true bad']
    },
    {
      'justInput': ['Min 10 good#1'],
      'input': ['Input is invalid bad'],
      'checkbox': ['Checkbox is invalid true'],
      'date': ['Date is invalid true bad']
    },
    {
      'justInput': ['Min 10 good#2'],
      'input': ['Input is invalid bad'],
      'checkbox': ['Checkbox is invalid true'],
      'date': ['Date is invalid true bad']
    }
  ]
}

// The localizer adds Unicode characters (FSI, PDI)
const deErrors = {
  'child': {
    'input': ['Eingabe ist ungültig bad'],
    'checkbox': ['Kontrollkästchen ist ungültig true'],
    'date': ['Das Datum ist ungültig true bad']
  },
  'repeater': [
    {
      'justInput': ['DE Min 10 good#0'],
      'input': ['Eingabe ist ungültig bad'],
      'checkbox': ['Kontrollkästchen ist ungültig true'],
      'date': ['Das Datum ist ungültig true bad']
    },
    {
      'justInput': ['DE Min 10 good#1'],
      'input': ['Eingabe ist ungültig bad'],
      'checkbox': ['Kontrollkästchen ist ungültig true'],
      'date': ['Das Datum ist ungültig true bad']
    },
    {
      'justInput': ['DE Min 10 good#2'],
      'input': ['Eingabe ist ungültig bad'],
      'checkbox': ['Kontrollkästchen ist ungültig true'],
      'date': ['Das Datum ist ungültig true bad']
    }
  ]
}

describe('getValidationResult function test', () => {
  it('should returns the error messages', async () => {
    const initialData = {login: 't1', password: 't2'}
    const {formData} = renderForm(loginForm, {initialData})

    await waitFor(() => expect(formData.data.login).toEqual('t1'))
    const returnedErrors = await asyncAct(async () => await formData.getValidationResult())
    const expectedErrors = {login: ['Too small: expected string to have >=3 characters', 'Should include 2']}
    await waitFor(() => expect(returnedErrors).toStrictEqual(expectedErrors))
  })

  it('should return the localized error messages', async () => {
    const getForm = () => JSON.stringify(validationLocalizationChildForm)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId, findByLabelText, rerender} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    expect(await findByTestId('child-date')).toBeInTheDocument()
    const formData = viewerRef.current?.formData
    if (!formData) {
      throw new Error('FormData is not defined')
    }

    const returnedErrors = await asyncAct(async () => await formData.getValidationResult())

    const expectedErrors = {
      'input': ['Input is invalid bad'],
      'checkbox': ['Checkbox is invalid true'],
      'date': ['Date is invalid true bad']
    }
    await waitFor(() => expect(returnedErrors).toStrictEqual(expectedErrors))

    rerender(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} language="de-DE"/>)
    expect(await findByLabelText('Current_lang_DE')).toBeInTheDocument()

    const returnedDeErrors = await asyncAct(async () => await formData.getValidationResult())
    const expectedDeErrors = {
      'input': ['Eingabe ist ungültig bad'],
      'checkbox': ['Kontrollkästchen ist ungültig true'],
      'date': ['Das Datum ist ungültig true bad']
    }
    await waitFor(() => expect(returnedDeErrors).toStrictEqual(expectedDeErrors))
  })

  it('should return the localized error messages on all levels', async () => {
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

    const returnedErrors = await asyncAct(async () => await formData.getValidationResult())

    await waitFor(() => expect(returnedErrors).toStrictEqual(enErrors))

    rerender(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} language="de-DE"/>)
    expect(await findAllByLabelText('Current_lang_DE')).not.toHaveLength(0)

    const returnedDeErrors = await asyncAct(async () => await formData.getValidationResult())
    await waitFor(() => expect(returnedDeErrors).toStrictEqual(deErrors))
  })

  it('should provide the current form data in the code validation function', async () => {
    const {formData, findByTestId} = renderForm(formDataInValidation, {initialData: {checkbox: true}})

    const checkbox = await findByTestId('checkbox')
    fireEvent.click(checkbox)
    expect(formData.data.checkbox).toEqual(false)

    const returnedErrors = await asyncAct(async () => await formData.getValidationResult())
    const expectedErrors = {input: ['Validation failed']}
    expect(returnedErrors).toStrictEqual(expectedErrors)
  })

  it('getValidationResult should not change form errors', async () => {
    const validators: FormViewerProps['validators'] = {
      string: {
        customPasswordValidator: {
          validate: () => false
        },
        anotherCustomValidator: {
          validate: () => 'another error'
        }
      }
    }
    const initialData = {login: 'l', password: 'p'}
    const {formData} = renderForm(validationCustomLocalizationForm, {initialData, validators})

    await waitFor(() => expect(formData.data).toStrictEqual(initialData))
    await waitFor(() => expect(formData.errors).toStrictEqual({}))

    const returnedErrors = await asyncAct(async () => await formData.getValidationResult())
    expect(returnedErrors).toStrictEqual({
      login: ['Too small: expected string to have >=3 characters', 'Should include 2'],
      password: [false, 'another error']
    })
    await waitFor(() => expect(formData.errors).toStrictEqual({}))
  })
})
