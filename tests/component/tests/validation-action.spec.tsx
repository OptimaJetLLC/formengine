import {view} from '@react-form-builder/components-rsuite'
import {ActionData, FormViewer, FormViewerProps, PersistedForm} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'

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
            },
          ],
          schema: {
            validations: [
              {
                key: 'min',
                args: {
                  limit: 3,
                },
              },
            ],
            autoValidate: false,
          },
        },
        {
          key: 'validateButton',
          type: 'RsButton',
          props: {},
          htmlAttributes: [
            {
              name: 'data-testid',
              value: 'validateButton',
            },
          ],
          events: {
            onClick: [
              {
                name: 'validate',
                type: 'common',
              },
              {
                name: 'testAction',
                type: 'custom',
              },
            ],
          },
        },
      ],
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

function createGateForm(firstAction: ActionData, formActions?: Record<string, {body: string; params: Record<string, never>}>) {
  const form = createForm(false)
  const children = form.form.children
  if (!children) throw new Error('Form children are not defined')
  const onClick = children[1].events?.onClick as ActionData[]
  onClick[0] = firstAction
  return formActions ? {...form, actions: formActions} : form
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
      },
    }

    const {findByTestId, rerender} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} actions={actions} />)

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

    rerender(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} actions={actions} initialData={{input: '123'}} />)

    fireEvent.click(await findByTestId('validateButton'))

    await waitFor(() => expect(testActionExecuteCount).toEqual(2))

    expect(formViewer.formData.hasErrors).toEqual(false)
    expect(JSON.stringify(formViewer.formData.errors)).toEqual('{}')
  })

  it('The validation action with a parameter should interrupt the chain without logging', async () => {
    const form = createForm(true)
    const getForm = () => JSON.stringify(form)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined)

    let testActionExecuteCount = 0
    const actions: FormViewerProps['actions'] = {
      testAction: () => {
        testActionExecuteCount++
      },
    }

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} actions={actions} />)

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
    expect(consoleInfoSpy).not.toHaveBeenCalled()

    fireEvent.change(await findByTestId('input'), {target: {value: '123'}})
    await waitFor(() => expect(formViewer.formData.data.input).toEqual('123'), {timeout: 5000})

    await asyncAct(async () => fireEvent.click(validateButton))

    // waiting for the first asynchronous action
    await waitFor(() => expect(formViewer.formData.hasErrors).toEqual(false))
    // waiting for the second asynchronous action
    await waitFor(() => expect(testActionExecuteCount).toEqual(1))

    expect(JSON.stringify(formViewer.formData.errors)).toEqual('{}')
    consoleInfoSpy.mockRestore()
  })
})

describe('Action chain interrupt', () => {
  it('A code action can interrupt the chain by returning false', async () => {
    const form = createGateForm({name: 'gate', type: 'code'}, {gate: {body: 'return false', params: {}}})
    const getForm = () => JSON.stringify(form)

    let testActionExecuteCount = 0
    const actions: FormViewerProps['actions'] = {
      testAction: () => {
        testActionExecuteCount++
      },
    }

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} />)

    await asyncAct(async () => fireEvent.click(await findByTestId('validateButton')))

    await waitFor(() => expect(testActionExecuteCount).toEqual(0))
  })

  it('A custom action can interrupt the chain by returning false', async () => {
    const form = createGateForm({name: 'gate', type: 'custom'})
    const getForm = () => JSON.stringify(form)

    let testActionExecuteCount = 0
    const actions: FormViewerProps['actions'] = {
      gate: () => false,
      testAction: () => {
        testActionExecuteCount++
      },
    }

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} />)

    await asyncAct(async () => fireEvent.click(await findByTestId('validateButton')))

    await waitFor(() => expect(testActionExecuteCount).toEqual(0))
  })

  it('An async custom action can interrupt the chain by resolving to false', async () => {
    const form = createGateForm({name: 'gate', type: 'custom'})
    const getForm = () => JSON.stringify(form)

    let testActionExecuteCount = 0
    const actions: FormViewerProps['actions'] = {
      gate: async (): Promise<false> => false,
      testAction: () => {
        testActionExecuteCount++
      },
    }

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} />)

    await asyncAct(async () => fireEvent.click(await findByTestId('validateButton')))

    await waitFor(() => expect(testActionExecuteCount).toEqual(0))
  })

  it('A thrown error still stops the chain and is logged', async () => {
    const form = createGateForm({name: 'gate', type: 'custom'})
    const getForm = () => JSON.stringify(form)
    const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined)

    let testActionExecuteCount = 0
    const actions: FormViewerProps['actions'] = {
      gate: () => {
        throw new Error('boom')
      },
      testAction: () => {
        testActionExecuteCount++
      },
    }

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} />)

    await asyncAct(async () => fireEvent.click(await findByTestId('validateButton')))

    await waitFor(() => expect(consoleInfoSpy).toHaveBeenCalled())
    expect(testActionExecuteCount).toEqual(0)
    expect(consoleInfoSpy.mock.calls[0]?.[0]).toEqual('Action handler throws an error')
    consoleInfoSpy.mockRestore()
  })
})
