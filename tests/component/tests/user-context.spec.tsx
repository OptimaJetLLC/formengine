import {builderViewWithCss, view} from '@react-form-builder/components-rsuite'
import {FormViewer, type FormViewerProps} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {switchToViewerMode} from './designerUtils'
import lifecycleEventsForm from './forms/lifecycle-events-form.json'

const form = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'button',
        type: 'RsButton',
        props: {},
        events: {
          onDidMount: [
            {
              name: 'logEvent',
              type: 'custom',
            },
          ],
          onClick: [
            {
              name: 'logClick',
              type: 'custom',
            },
          ],
        },
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'test-button',
          },
        ],
      },
    ],
  },
  localization: {},
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'American English',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'en-US',
} as const

describe('userContext in viewer actions', () => {
  it('should pass user context to custom actions onDidMount', async () => {
    const userContext = {foo: 'bar'}
    const receivedContexts: unknown[] = []

    const actions: FormViewerProps['actions'] = {
      logEvent: e => {
        receivedContexts.push(e.userContext)
      },
      logClick: e => {
        receivedContexts.push(e.userContext)
      },
    }

    const getForm = () => JSON.stringify(lifecycleEventsForm)

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} userContext={userContext} />)

    const button = await findByTestId('rsButton1')

    fireEvent.click(button)

    expect(receivedContexts.length).toBe(2)

    receivedContexts.forEach(ctx => {
      expect(ctx).toEqual(userContext)
    })
  })

  it('should pass user context to custom actions onClick', async () => {
    const userContext = {foo: 'bar'}
    const receivedContexts: unknown[] = []

    const actions: FormViewerProps['actions'] = {
      logEvent: e => {
        receivedContexts.push(e.userContext)
      },
      logClick: e => {
        receivedContexts.push(e.userContext)
      },
    }
    const getForm = () => JSON.stringify(form)

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} userContext={userContext} />)

    const button = await findByTestId('test-button')
    fireEvent.click(button)

    expect(receivedContexts.length).toBe(2)

    receivedContexts.forEach(ctx => {
      expect(ctx).toEqual(userContext)
    })
  })

  it('should pass updated userContext to actions after prop change (reactivity)', async () => {
    const contextA = {version: 1, label: 'first'}
    const contextB = {version: 2, label: 'second'}
    const receivedContexts: unknown[] = []

    const actions: FormViewerProps['actions'] = {
      logEvent: () => {},
      logClick: e => {
        receivedContexts.push(e.userContext)
      },
    }

    const getForm = () => JSON.stringify(form)

    const {findByTestId, rerender} = render(<FormViewer view={view} getForm={getForm} actions={actions} userContext={contextA} />)

    const button = await findByTestId('test-button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(receivedContexts.length).toBeGreaterThanOrEqual(1)
      expect(receivedContexts[receivedContexts.length - 1]).toEqual(contextA)
    })

    const countAfterFirstClick = receivedContexts.length

    rerender(<FormViewer view={view} getForm={getForm} actions={actions} userContext={contextB} />)

    fireEvent.click(button)

    await waitFor(() => {
      expect(receivedContexts.length).toBe(countAfterFirstClick + 1)
      expect(receivedContexts[receivedContexts.length - 1]).toEqual(contextB)
    })
  })
})

describe('userContext in builder viewer actions', () => {
  it('should pass user context to custom actions onDidMount and onClick', async () => {
    const userContext = {foo: 'bar'}
    const receivedContexts: unknown[] = []

    const actions: FormViewerProps['actions'] = {
      logEvent: e => {
        receivedContexts.push(e.userContext)
      },
      logClick: e => {
        receivedContexts.push(e.userContext)
      },
    }

    const getForm = () => JSON.stringify(form)

    const {findByTestId, findByText} = render(
      <FormBuilder view={builderViewWithCss} getForm={getForm} actions={actions} userContext={userContext} />
    )

    await switchToViewerMode(findByText)

    const button = await findByTestId('test-button')
    fireEvent.click(button)

    expect(receivedContexts.length).toBe(3) // onDidMount called twice with builder

    receivedContexts.forEach(ctx => {
      expect(ctx).toEqual(userContext)
    })
  })
})
