import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render, waitFor} from '@testing-library/react'
import {asyncAct} from './asyncAct'
import loginForm from './forms/login-form.json'
import validationLocalizationChildForm from './forms/validation-localization-child-form.json'
import validationLocalizationParentForm from './forms/validation-localization-parent-form.json'

// The localizer adds Unicode characters (FSI, PDI)
const enErrors = {
  'child': {
    'input': 'Input is invalid ⁨bad⁩',
    'checkbox': 'Checkbox is invalid ⁨true⁩',
    'date': 'Date is invalid ⁨true⁩ ⁨bad⁩'
  },
  'repeater': [
    {
      'justInput': 'Min 10 ⁨good#0⁩',
      'input': 'Input is invalid ⁨bad⁩',
      'checkbox': 'Checkbox is invalid ⁨true⁩',
      'date': 'Date is invalid ⁨true⁩ ⁨bad⁩'
    },
    {
      'justInput': 'Min 10 ⁨good#1⁩',
      'input': 'Input is invalid ⁨bad⁩',
      'checkbox': 'Checkbox is invalid ⁨true⁩',
      'date': 'Date is invalid ⁨true⁩ ⁨bad⁩'
    },
    {
      'justInput': 'Min 10 ⁨good#2⁩',
      'input': 'Input is invalid ⁨bad⁩',
      'checkbox': 'Checkbox is invalid ⁨true⁩',
      'date': 'Date is invalid ⁨true⁩ ⁨bad⁩'
    }
  ]
}

// The localizer adds Unicode characters (FSI, PDI)
const deErrors = {
  'child': {
    'input': 'Eingabe ist ungültig ⁨bad⁩',
    'checkbox': 'Kontrollkästchen ist ungültig ⁨true⁩',
    'date': 'Das Datum ist ungültig ⁨true⁩ ⁨bad⁩'
  },
  'repeater': [
    {
      'justInput': 'DE Min 10 ⁨good#0⁩',
      'input': 'Eingabe ist ungültig ⁨bad⁩',
      'checkbox': 'Kontrollkästchen ist ungültig ⁨true⁩',
      'date': 'Das Datum ist ungültig ⁨true⁩ ⁨bad⁩'
    },
    {
      'justInput': 'DE Min 10 ⁨good#1⁩',
      'input': 'Eingabe ist ungültig ⁨bad⁩',
      'checkbox': 'Kontrollkästchen ist ungültig ⁨true⁩',
      'date': 'Das Datum ist ungültig ⁨true⁩ ⁨bad⁩'
    },
    {
      'justInput': 'DE Min 10 ⁨good#2⁩',
      'input': 'Eingabe ist ungültig ⁨bad⁩',
      'checkbox': 'Kontrollkästchen ist ungültig ⁨true⁩',
      'date': 'Das Datum ist ungültig ⁨true⁩ ⁨bad⁩'
    }
  ]
}

describe('Validation', () => {
  it('validation should returns the error messages', async () => {
    const getForm = () => JSON.stringify(loginForm)
    const initialData = {login: 't1', password: 't2'}
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm}
                                              initialData={initialData} viewerRef={viewerRef}/>)

    expect(await findByTestId('login')).toHaveValue('t1')
    const formData = viewerRef.current?.formData
    if (!formData) {
      throw new Error('FormData is not defined')
    }

    const returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = JSON.stringify({login: 'String must contain at least 3 character(s)'})
    await waitFor(() => expect(JSON.stringify(returnedErrors)).toEqual(expectedErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)
  })

  it('validation should return the localized error messages', async () => {
    const getForm = () => JSON.stringify(validationLocalizationChildForm)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId, rerender} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    expect(await findByTestId('child-date')).toBeInTheDocument()
    const formData = viewerRef.current?.formData
    if (!formData) {
      throw new Error('FormData is not defined')
    }

    const returnedErrors = await asyncAct(async () => await formData.validate())

    const expectedErrors = JSON.stringify({
      'input': 'Input is invalid ⁨bad⁩',
      'checkbox': 'Checkbox is invalid ⁨true⁩',
      'date': 'Date is invalid ⁨true⁩ ⁨bad⁩'
    })
    await waitFor(() => expect(JSON.stringify(returnedErrors)).toEqual(expectedErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)

    rerender(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} language="de-DE"/>)

    const returnedDeErrors = await asyncAct(async () => await formData.validate())
    const expectedDeErrors = JSON.stringify({
      'input': 'Eingabe ist ungültig ⁨bad⁩',
      'checkbox': 'Kontrollkästchen ist ungültig ⁨true⁩',
      'date': 'Das Datum ist ungültig ⁨true⁩ ⁨bad⁩'
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

    const {findAllByTestId, rerender} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

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

    const returnedDeErrors = await asyncAct(async () => await formData.validate())
    const expectedDeErrors = JSON.stringify(deErrors)
    await waitFor(() => expect(JSON.stringify(returnedDeErrors)).toEqual(expectedDeErrors))
    expect(JSON.stringify(formData.errors)).toEqual(expectedDeErrors)
  })
})
