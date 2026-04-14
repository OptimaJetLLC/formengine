import {rSuiteComponents, view} from '@react-form-builder/components-rsuite'
import {createView, define, ErrorWrapperProps, FormViewer, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {useState} from 'react'
import {expect} from 'vitest'
import {asyncAct} from './asyncAct'
import sameDataKeyForm from './forms/form-errors-prop/same-data-key-form.json'
import template from './forms/form-errors-prop/template.json'
import testForm from './forms/form-errors-prop/test-form.json'
import '../config/toAllHaveTextContent'

const forms: Record<string, object> = {testForm, template}
const externalErrors = {
  firstName: 'first name external validation error',
  lastName: 'last name external validation error',
  repeater1: [
    {
      repeaterFirstName: 'repeater first name external validation error',
      repeaterLastName: 'repeater last name external validation error'
    }
  ],
  templateTemplate1: {
    templateFirstName: 'template first name external validation error',
    templateLastName: 'template last name external validation error'
  }
}

const initialErrors = {
  firstName: 'error'
}

const renderFormWithErrorsProp = async () => {
  const getForm = (name = 'testForm') => JSON.stringify(forms[name])
  const viewerRef: FormViewerProps['viewerRef'] = {current: null}

  const App = () => {
    const [errors, setErrors] = useState<FormViewerProps['errors']>(initialErrors)
    const externalValidate = () => setErrors(externalErrors)
    return <>
      <FormViewer view={view} getForm={getForm} viewerRef={viewerRef} formName={'testForm'}
                  errors={errors} initialData={{repeater1: [{}]}}/>
      <button data-testid="externalValidate" onClick={externalValidate}>External validate</button>
    </>
  }
  const {findByTestId} = render(<App/>)

  // make sure the form is rendered
  expect(await findByTestId('externalValidate')).toBeInTheDocument()

  const formData = viewerRef.current?.formData
  if (!formData) {
    throw new Error('FormData is not defined')
  }

  return {findByTestId, formData}
}

const ErrorComponent = (props: ErrorWrapperProps) => {
  const {error, children} = props
  const errorMessage = error ? <div data-testid="errorComponent">{error}</div> : null
  return <div>
    {children}
    {errorMessage}
  </div>
}

const errorComponent = define(ErrorComponent, 'ErrorComponent').category('test')

describe('Form errors prop', () => {
  it('should set errors after form load', async () => {
    const {formData} = await renderFormWithErrorsProp()
    expect(formData.errors).toStrictEqual(initialErrors)
  })

  it('should set errors for the form when changing its value', async () => {
    const {findByTestId, formData} = await renderFormWithErrorsProp()
    fireEvent.click(await findByTestId('externalValidate'))
    expect(formData.errors).toStrictEqual(externalErrors)
  })

  it('should be partially overwritten by form validation errors when the data changes', async () => {
    const {findByTestId, formData} = await renderFormWithErrorsProp()
    fireEvent.click(await findByTestId('externalValidate'))

    fireEvent.change(await findByTestId('firstName'), {target: {value: '1'}})
    fireEvent.change(await findByTestId('templateFirstName'), {target: {value: '1'}})

    const expectedErrors = {
      firstName: 'Required',
      lastName: externalErrors.lastName,
      repeater1: externalErrors.repeater1,
      templateTemplate1: {
        templateFirstName: 'Required',
        templateLastName: externalErrors.templateTemplate1.templateLastName
      }
    }

    await waitFor(() => expect(formData.errors).toStrictEqual(expectedErrors))
  })

  it('should be completely overwritten when full form validation is called', async () => {
    const {findByTestId, formData} = await renderFormWithErrorsProp()
    fireEvent.click(await findByTestId('externalValidate'))

    const returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {
      firstName: 'Required',
      repeater1: [{repeaterFirstName: 'Required'}],
      templateTemplate1: {templateFirstName: 'Required'}
    }

    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)
  })

  it('should set errors for the same data key', async () => {
    const models = [...rSuiteComponents, errorComponent].map(d => d.build().model)
    const testView = createView(models)
    const getForm = () => JSON.stringify(sameDataKeyForm)

    const {findAllByTestId, queryAllByTestId, rerender} = render(<FormViewer view={testView} getForm={getForm}/>)

    expect(await findAllByTestId('firstName')).toHaveLength(2)
    expect(queryAllByTestId('errorComponent')).toHaveLength(0)

    const errors = {firstName: `${new Date()}`}
    rerender(<FormViewer view={testView} getForm={getForm} errors={errors}/>)

    expect(await findAllByTestId('errorComponent')).toHaveLength(2)

    const newErrors = {noField: `${new Date()}`}
    rerender(<FormViewer view={testView} getForm={getForm} errors={newErrors}/>)

    expect(queryAllByTestId('errorComponent')).toHaveLength(0)
  })

  it('should change errors for the form when changing the errors value', async () => {
    const models = [...rSuiteComponents, errorComponent].map(d => d.build().model)
    const testView = createView(models)
    const getForm = () => JSON.stringify(sameDataKeyForm)
    const errorMessage = `${new Date()}`

    const {findAllByTestId, queryAllByTestId, rerender} = render(<FormViewer view={testView} getForm={getForm}
                                                                             errors={{firstName: errorMessage}}/>)
    expect(await findAllByTestId('errorComponent')).toAllHaveTextContent([errorMessage, errorMessage])

    rerender(<FormViewer view={testView} getForm={getForm} errors={{firstName: 'ohohoh'}}/>)
    expect(await findAllByTestId('errorComponent')).toAllHaveTextContent(['ohohoh', 'ohohoh'])

    rerender(<FormViewer view={testView} getForm={getForm} errors={undefined}/>)
    expect(queryAllByTestId('errorComponent')).toHaveLength(0)
  })
})
