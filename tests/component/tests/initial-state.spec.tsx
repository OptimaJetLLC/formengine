import {builderViewWithCss, view} from '@react-form-builder/components-rsuite'
import {FormViewer, type FormViewerProps} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {renderForm} from '../util/renderForm'

const emptyForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [],
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

const getForm = () => JSON.stringify(emptyForm)

describe('initialState in viewer', () => {
  it('should set initialState on formData.state at init', async () => {
    const initialState = {foo: 'bar', count: 1}
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} initialState={initialState}/>)

    await waitFor(() => {
      expect(viewerRef.current).not.toBeNull()
      expect(viewerRef.current?.formData.state).toEqual(initialState)
    })
  })

  it('should react to initialState prop changes', async () => {
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const firstState = {foo: 'one'}
    const secondState = {foo: 'two', bar: 42}

    const {rerender} = render(
      <FormViewer
        view={view}
        getForm={getForm}
        viewerRef={viewerRef}
        initialState={firstState}
      />
    )

    await waitFor(() => {
      expect(viewerRef.current).not.toBeNull()
      expect(viewerRef.current?.formData.state.foo).toBe('one')
    })

    rerender(
      <FormViewer
        view={view}
        getForm={getForm}
        viewerRef={viewerRef}
        initialState={secondState}
      />
    )

    await waitFor(() => {
      expect(viewerRef.current?.formData.state.foo).toBe('two')
      expect(viewerRef.current?.formData.state.bar).toBe(42)
    })
  })
})

describe('initialState in builder viewer', () => {
  it('should set initialState on formData.state at init', async () => {
    const initialState = {foo: 'bar'}
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    render(
      <FormBuilder
        view={builderViewWithCss}
        getForm={getForm}
        viewerRef={viewerRef}
        initialState={initialState}
      />
    )

    await waitFor(() => {
      expect(viewerRef.current).not.toBeNull()
      expect(viewerRef.current?.formData.state.foo).toBe('bar')
    })
  })

  it('should react to initialState prop changes', async () => {
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const firstState = {foo: 'one'}
    const secondState = {foo: 'two', bar: 42}

    const {rerender} = render(
      <FormBuilder
        view={builderViewWithCss}
        getForm={getForm}
        viewerRef={viewerRef}
        initialState={firstState}
      />
    )

    await waitFor(() => {
      expect(viewerRef.current).not.toBeNull()
      expect(viewerRef.current?.formData.state.foo).toBe('one')
    })

    rerender(
      <FormBuilder
        view={builderViewWithCss}
        getForm={getForm}
        viewerRef={viewerRef}
        initialState={secondState}
      />
    )

    await waitFor(() => {
      expect(viewerRef.current?.formData.state.foo).toBe('two')
      expect(viewerRef.current?.formData.state.bar).toBe(42)
    })
  })

  it('should not propagate initialState to embedded forms', async () => {
    const embeddedForm = {
      form: {
        key: 'Screen',
        type: 'Screen',
        props: {},
        children: [
          {
            key: 'checkButton',
            type: 'RsButton',
            htmlAttributes: [
              {
                'name': 'data-testid',
                'value': 'test-button'
              }
            ],
            events: {
              onClick: [
                {
                  name: 'checkState',
                  type: 'code',
                },
              ],
            },
          },
        ],
      },
      actions: {
        checkState: {
          body:
            'debugger \n' +
            'if (e.store.formData.state && e.store.formData.state.rootFlag) {\n' +
            '  console.error(\'initialState present in nested form\')\n' +
            '}'
        },
      },
    }

    const rootForm = {
      'version': '1',
      'tooltipType': 'RsTooltip',
      'modalType': 'RsModal',
      'form': {
        'key': 'Screen',
        'type': 'Screen',
        'props': {},
        'children': [
          {
            'key': 'rsHeader1',
            'type': 'RsHeader',
            'props': {}
          },
          {
            'key': 'embeddedForm1',
            'type': 'EmbeddedForm',
            'props': {
              'formName': {
                'value': 'nested-form'
              }
            }
          }
        ]
      },
      'localization': {},
      'languages': [
        {
          'code': 'en',
          'dialect': 'US',
          'name': 'English',
          'description': 'American English',
          'bidi': 'ltr'
        }
      ],
      'defaultLanguage': 'en-US'
    }

    const getFormByName = (name?: string) => {
      if (!name) {
        return JSON.stringify(rootForm)
      }
      if (name === 'nested-form') {
        return JSON.stringify(embeddedForm)
      }
      throw new Error(`Unexpected form name \`${name}\``)
    }

    const initialState = {rootFlag: true}

    const {findByTestId} = renderForm(rootForm, {
      getForm: getFormByName,
      initialState,
    })

    await new Promise(resolve => setTimeout(resolve, 2000))

    const button = await findByTestId('test-button')
    fireEvent.click(button)
  })
})

