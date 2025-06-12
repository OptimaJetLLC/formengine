import {view} from '@react-form-builder/components-rsuite'
import {ActionData, FormViewer, FormViewerProps, PersistedForm} from '@react-form-builder/core'
import {licenseEnterprise2030AnyDomain} from '@react-form-builder/tests-common/license/enterprise-2030-any-domain'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {asyncAct} from './asyncAct'

function createForm(failOnError: boolean): PersistedForm {
  const persistedForm = {
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'input',
          type: 'RsInput',
          props: {},
          htmlAttributes: [
            {
              name: 'data-testid',
              value: 'input',
            }
          ],
          schema: {
            validations: [
              {
                key: 'min',
                args: {
                  limit: 3
                }
              }
            ],
            autoValidate: false
          }
        },
        {
          key: 'validateButton',
          type: 'RsButton',
          props: {},
          htmlAttributes: [
            {
              name: 'data-testid',
              value: 'validateButton',
            }
          ],
          events: {
            onClick: [
              {
                name: 'validate',
                type: 'common'
              },
              {
                name: 'testAction',
                type: 'custom'
              }
            ]
          }
        }
      ]
    },
    localization: {},
    languages: [],
    defaultLanguage: 'en-US',
  } satisfies PersistedForm

  if (failOnError) {
    const validateOnClick = persistedForm.form.children[1].events?.onClick[0] as ActionData
    if (validateOnClick) {
      validateOnClick.args = {failOnError: true}
    }
  }

  return persistedForm
}

describe('Validation action', () => {
  it('The classic validation action should not result in an error', async () => {
    const form = createForm(false)
    const getForm = () => JSON.stringify(form)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    let testActionExecuteCount = 0
    const actions: FormViewerProps['actions'] = {
      testAction: () => {
        testActionExecuteCount++
      }
    }

    const {findByTestId, rerender} = render(<FormViewer view={view} getForm={getForm}
                                                        viewerRef={viewerRef} actions={actions}/>)

    const validateButton = await findByTestId('validateButton')
    expect(validateButton).toBeInTheDocument()

    fireEvent.click(validateButton)

    await waitFor(() => expect(testActionExecuteCount).toEqual(1))

    const formViewer = viewerRef.current
    if (!formViewer) {
      throw new Error('FormData is not defined')
    }

    expect(formViewer.formData.hasErrors).toEqual(true)
    const expectedErrors = JSON.stringify({input: 'Required'})
    expect(JSON.stringify(formViewer.formData.errors)).toEqual(expectedErrors)

    rerender(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}
                         actions={actions} initialData={{input: '123'}}/>)

    fireEvent.click(await findByTestId('validateButton'))

    await waitFor(() => expect(testActionExecuteCount).toEqual(2))

    expect(formViewer.formData.hasErrors).toEqual(false)
    expect(JSON.stringify(formViewer.formData.errors)).toEqual('{}')
  })

  it('The validation action with a parameter should result in an error', async () => {
    const form = createForm(true)
    const getForm = () => JSON.stringify(form)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    let testActionExecuteCount = 0
    const actions: FormViewerProps['actions'] = {
      testAction: () => {
        testActionExecuteCount++
      }
    }

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm}
                                              licenseKey={licenseEnterprise2030AnyDomain}
                                              viewerRef={viewerRef} actions={actions}/>)

    const validateButton = await findByTestId('validateButton')
    expect(validateButton).toBeInTheDocument()

    await asyncAct(async () => fireEvent.click(validateButton))

    const formViewer = viewerRef.current
    if (!formViewer) {
      throw new Error('FormData is not defined')
    }

    await waitFor(() => expect(formViewer.formData.hasErrors).toEqual(true))
    const expectedErrors = JSON.stringify({input: 'Required'})
    expect(JSON.stringify(formViewer.formData.errors)).toEqual(expectedErrors)
    expect(testActionExecuteCount).toEqual(0)

    fireEvent.change(await findByTestId('input'), {target: {value: '123'}})
    expect(await findByTestId('input')).toHaveValue('123')

    await asyncAct(async () => fireEvent.click(validateButton))

    // waiting for the first asynchronous action
    await waitFor(() => expect(formViewer.formData.hasErrors).toEqual(false))
    // waiting for the second asynchronous action
    await waitFor(() => expect(testActionExecuteCount).toEqual(1), {timeout: 3000})

    expect(JSON.stringify(formViewer.formData.errors)).toEqual('{}')
  })
})
