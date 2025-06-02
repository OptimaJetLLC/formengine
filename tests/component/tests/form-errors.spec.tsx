import {rSuiteComponents, view} from '@react-form-builder/components-rsuite'
import {createView, define, ErrorWrapperProps, FormViewer, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {useState} from 'react'
import {asyncAct} from './asyncAct'
import sameDataKeyForm from './forms/form-errors-prop/same-data-key-form.json'
import template from './forms/form-errors-prop/template.json'
import testForm from './forms/form-errors-prop/test-form.json'

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

const renderFormWithErrorsProp = () => {
  const getForm = (name = 'testForm') => JSON.stringify(forms[name])
  const viewerRef: FormViewerProps['viewerRef'] = {current: null}

  const App = () => {
    const [errors, setErrors] = useState<FormViewerProps['errors']>({
      firstName: 'error'
    })
    const externalValidate = () => setErrors(externalErrors)
    return <>
      <button data-testid={'externalValidate'} onClick={externalValidate}>External validate</button>
      <FormViewer view={view} getForm={getForm} viewerRef={viewerRef} formName={'testForm'}
                  errors={errors} initialData={{repeater1: [{}]}}/>
    </>
  }
  const {findByTestId} = render(<App/>)

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

const errorComponent = define(ErrorComponent, 'ErrorComponent')

describe('Form errors prop', () => {
  it('should not set errors before changing its value.', async () => {
    const {formData} = renderFormWithErrorsProp()
    expect(formData.errors).toStrictEqual({})
  })

  it('should set errors for the form when changing its value', async () => {
    const {findByTestId, formData} = renderFormWithErrorsProp()
    fireEvent.click(await findByTestId('externalValidate'))
    expect(formData.errors).toStrictEqual(externalErrors)
  })

  it('should be partially overwritten by form validation errors when the data changes', async () => {
    const {findByTestId, formData} = renderFormWithErrorsProp()
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
    const {findByTestId, formData} = renderFormWithErrorsProp()
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
})
