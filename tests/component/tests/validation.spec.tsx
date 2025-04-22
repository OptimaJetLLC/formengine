import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {asyncAct} from './asyncAct'
import loginForm from './forms/login-form.json'

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
    expect(JSON.stringify(returnedErrors)).toEqual(expectedErrors)
    expect(JSON.stringify(formData.errors)).toEqual(expectedErrors)
  })
})
