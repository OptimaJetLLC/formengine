import {builderViewWithCss, view, viewWithCss} from '@react-form-builder/components-rsuite'
import {buildForm, FormViewer, type FormViewerProps} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {observable, reaction, runInAction} from 'mobx'
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
      expect(ctx).toBe(userContext)
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
      expect(ctx).toBe(userContext)
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
      expect(receivedContexts[receivedContexts.length - 1]).toBe(contextA)
    })

    const countAfterFirstClick = receivedContexts.length

    rerender(<FormViewer view={view} getForm={getForm} actions={actions} userContext={contextB} />)

    fireEvent.click(button)

    await waitFor(() => {
      expect(receivedContexts.length).toBe(countAfterFirstClick + 1)
      expect(receivedContexts[receivedContexts.length - 1]).toBe(contextB)
    })
  })

  it('should keep host userContext identity when parent action mutates it', async () => {
    const userContext = {counter: 0, source: 'host'}

    const actions: FormViewerProps['actions'] = {
      logEvent: () => {},
      logClick: e => {
        const ctx = e.userContext as typeof userContext
        expect(e.userContext).toBe(userContext)
        ctx.counter += 1
        ctx.source = 'parent'
      },
    }

    const getForm = () => JSON.stringify(form)
    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} userContext={userContext} />)

    fireEvent.click(await findByTestId('test-button'))

    expect(userContext).toEqual({counter: 1, source: 'parent'})
  })

  it('should pass undefined userContext to actions when the prop is omitted', async () => {
    const receivedContexts: unknown[] = []

    const actions: FormViewerProps['actions'] = {
      logEvent: () => {},
      logClick: e => {
        receivedContexts.push(e.userContext)
      },
    }

    const getForm = () => JSON.stringify(form)
    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} />)

    fireEvent.click(await findByTestId('test-button'))

    await waitFor(() => {
      expect(receivedContexts).toEqual([undefined])
    })
  })

  it('should read the current userContext after an async wait when the prop is replaced', async () => {
    const contextA = {label: 'a'}
    const contextB = {label: 'b'}
    let release!: () => void
    const gate = new Promise<void>(resolve => {
      release = resolve
    })
    const seen: Array<{before: unknown; after: unknown}> = []
    let started = false

    const actions: FormViewerProps['actions'] = {
      logEvent: () => {},
      logClick: async e => {
        const before = e.userContext
        started = true
        await gate
        seen.push({before, after: e.userContext})
      },
    }

    const getForm = () => JSON.stringify(form)
    const {findByTestId, rerender} = render(<FormViewer view={view} getForm={getForm} actions={actions} userContext={contextA} />)

    fireEvent.click(await findByTestId('test-button'))

    await waitFor(() => {
      expect(started).toBe(true)
    })

    rerender(<FormViewer view={view} getForm={getForm} actions={actions} userContext={contextB} />)
    release()

    await waitFor(() => {
      expect(seen).toEqual([{before: contextA, after: contextB}])
    })
  })
})

const defaultLanguages = [{code: 'en', dialect: 'US', name: 'English', description: 'American English', bidi: 'ltr'}]

const modalParentForm = {
  version: '1',
  modalType: 'RsModal',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'modal1',
        type: 'Modal',
        props: {modalTemplate: {value: 'Template:modal-layout'}},
        modal: {props: {}, events: {}},
      },
      {
        key: 'showModalButton',
        type: 'RsButton',
        props: {children: {value: 'Show modal'}},
        events: {
          onClick: [{name: 'openModal', type: 'common', args: {modalKey: 'modal1'}}],
        },
        htmlAttributes: [{name: 'data-testid', value: 'showModalButton'}],
      },
      {
        key: 'parentMutate',
        type: 'RsButton',
        props: {children: {value: 'Mutate parent'}},
        events: {
          onClick: [{name: 'mutateFromParent', type: 'custom'}],
        },
        htmlAttributes: [{name: 'data-testid', value: 'parentMutate'}],
      },
      {
        key: 'parentRead',
        type: 'RsButton',
        props: {children: {value: 'Read parent'}},
        events: {
          onClick: [{name: 'readFromParent', type: 'custom'}],
        },
        htmlAttributes: [{name: 'data-testid', value: 'parentRead'}],
      },
    ],
  },
  localization: {},
  languages: defaultLanguages,
  defaultLanguage: 'en-US',
} as const

const modalChildForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'modalMutate',
        type: 'RsButton',
        props: {children: {value: 'Mutate modal'}},
        events: {
          onClick: [{name: 'mutateFromModal', type: 'custom'}],
        },
        htmlAttributes: [{name: 'data-testid', value: 'modalMutate'}],
      },
      {
        key: 'modalRead',
        type: 'RsButton',
        props: {children: {value: 'Read modal'}},
        events: {
          onClick: [{name: 'readFromModal', type: 'custom'}],
        },
        htmlAttributes: [{name: 'data-testid', value: 'modalRead'}],
      },
      {
        key: 'okButton',
        type: 'RsButton',
        props: {children: {value: 'Ok'}},
        events: {
          onClick: [{name: 'closeModal', type: 'common', args: {result: 'ok'}}],
        },
        htmlAttributes: [{name: 'data-testid', value: 'okButton'}],
      },
    ],
  },
  localization: {},
  languages: defaultLanguages,
  defaultLanguage: 'en-US',
} as const

const modalGetForm = (formName?: string) => JSON.stringify(formName === 'modal-layout' ? modalChildForm : modalParentForm)

describe('userContext sharing with modal child form', () => {
  it('should share host userContext mutations from modal actions with the parent form', async () => {
    const userContext = {counter: 0, source: 'host'}
    const parentReads: Array<{counter: number; source: string}> = []

    const actions: FormViewerProps['actions'] = {
      mutateFromModal: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        ctx.counter += 1
        ctx.source = 'modal'
      },
      readFromParent: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        parentReads.push({counter: ctx.counter, source: ctx.source})
      },
    }

    const {findByTestId} = render(<FormViewer view={viewWithCss} getForm={modalGetForm} actions={actions} userContext={userContext} />)

    fireEvent.click(await findByTestId('showModalButton'))
    fireEvent.click(await findByTestId('modalMutate'))
    fireEvent.click(await findByTestId('parentRead'))

    await waitFor(() => {
      expect(parentReads).toEqual([{counter: 1, source: 'modal'}])
    })
    expect(userContext).toEqual({counter: 1, source: 'modal'})
  })

  it('should share host userContext mutations from parent actions with the modal form', async () => {
    const userContext = {counter: 0, source: 'host'}
    const modalReads: Array<{counter: number; source: string}> = []

    const actions: FormViewerProps['actions'] = {
      mutateFromParent: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        ctx.counter += 1
        ctx.source = 'parent'
      },
      readFromModal: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        modalReads.push({counter: ctx.counter, source: ctx.source})
      },
    }

    const {findByTestId} = render(<FormViewer view={viewWithCss} getForm={modalGetForm} actions={actions} userContext={userContext} />)

    fireEvent.click(await findByTestId('parentMutate'))
    fireEvent.click(await findByTestId('showModalButton'))
    fireEvent.click(await findByTestId('modalRead'))

    await waitFor(() => {
      expect(modalReads).toEqual([{counter: 1, source: 'parent'}])
    })
    expect(userContext).toEqual({counter: 1, source: 'parent'})
  })

  it('should use the replaced userContext in an already open modal', async () => {
    const contextA = {counter: 0, source: 'a'}
    const contextB = {counter: 10, source: 'b'}
    const modalReads: unknown[] = []

    const actions: FormViewerProps['actions'] = {
      mutateFromModal: e => {
        modalReads.push(e.userContext)
        const ctx = e.userContext as typeof contextB
        ctx.counter += 1
        ctx.source = 'modal'
      },
    }

    const {findByTestId, rerender} = render(
      <FormViewer view={viewWithCss} getForm={modalGetForm} actions={actions} userContext={contextA} />
    )

    fireEvent.click(await findByTestId('showModalButton'))
    await findByTestId('modalMutate')

    rerender(<FormViewer view={viewWithCss} getForm={modalGetForm} actions={actions} userContext={contextB} />)

    fireEvent.click(await findByTestId('modalMutate'))

    await waitFor(() => {
      expect(modalReads.at(-1)).toBe(contextB)
    })
    expect(contextA).toEqual({counter: 0, source: 'a'})
    expect(contextB).toEqual({counter: 11, source: 'modal'})
  })

  it('should keep sharing the same userContext after closing and reopening the modal', async () => {
    const userContext = {counter: 0, source: 'host'}

    const actions: FormViewerProps['actions'] = {
      mutateFromModal: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        ctx.counter += 1
        ctx.source = 'modal'
      },
    }

    const {findByTestId, queryByTestId} = render(
      <FormViewer view={viewWithCss} getForm={modalGetForm} actions={actions} userContext={userContext} />
    )

    fireEvent.click(await findByTestId('showModalButton'))
    fireEvent.click(await findByTestId('modalMutate'))
    fireEvent.click(await findByTestId('okButton'))

    await waitFor(() => {
      expect(queryByTestId('modalMutate')).not.toBeInTheDocument()
    })

    fireEvent.click(await findByTestId('showModalButton'))
    fireEvent.click(await findByTestId('modalMutate'))

    await waitFor(() => {
      expect(userContext).toEqual({counter: 2, source: 'modal'})
    })
  })

  it('should allow nested MobX reactions when the host passes an observable userContext', async () => {
    const userContext = observable({nested: {n: 1}})
    let hits = 0
    const dispose = reaction(
      () => userContext.nested.n,
      () => {
        hits += 1
      }
    )

    const actions: FormViewerProps['actions'] = {
      mutateFromModal: e => {
        expect(e.userContext).toBe(userContext)
        runInAction(() => {
          ;(e.userContext as typeof userContext).nested.n = 2
        })
      },
    }

    const {findByTestId} = render(<FormViewer view={viewWithCss} getForm={modalGetForm} actions={actions} userContext={userContext} />)

    fireEvent.click(await findByTestId('showModalButton'))
    fireEvent.click(await findByTestId('modalMutate'))

    await waitFor(() => {
      expect(hits).toBe(1)
    })
    expect(userContext.nested.n).toBe(2)
    dispose()
  })
})

describe('userContext sharing with embedded form', () => {
  it('should share host userContext mutations from an embedded child form', async () => {
    const userContext = {counter: 0, source: 'host'}
    const parentReads: Array<{counter: number; source: string}> = []

    const embeddedForm = buildForm()
      .component('embeddedMutate', 'RsButton')
      .prop('children', 'Mutate embedded')
      .event('onClick')
      .customAction('mutateFromEmbedded')
      .json()

    const parentForm = buildForm()
      .component('embeddedForm', 'EmbeddedForm')
      .prop('formName', 'embedded-child')
      .component('parentRead', 'RsButton')
      .prop('children', 'Read parent')
      .event('onClick')
      .customAction('readFromParent')
      .json()

    const actions: FormViewerProps['actions'] = {
      mutateFromEmbedded: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        ctx.counter += 1
        ctx.source = 'embedded'
      },
      readFromParent: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        parentReads.push({counter: ctx.counter, source: ctx.source})
      },
    }

    const getForm = (formName?: string) => {
      if (formName === 'embedded-child') return embeddedForm
      return parentForm
    }

    const {findByText} = render(<FormViewer view={viewWithCss} getForm={getForm} actions={actions} userContext={userContext} />)

    fireEvent.click(await findByText('Mutate embedded'))
    fireEvent.click(await findByText('Read parent'))

    await waitFor(() => {
      expect(parentReads).toEqual([{counter: 1, source: 'embedded'}])
    })
    expect(userContext).toEqual({counter: 1, source: 'embedded'})
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
      expect(ctx).toBe(userContext)
    })
  })

  it('should share host userContext mutations from a modal opened in builder preview', async () => {
    const userContext = {counter: 0, source: 'host'}
    const parentReads: Array<{counter: number; source: string}> = []

    const actions: FormViewerProps['actions'] = {
      mutateFromModal: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        ctx.counter += 1
        ctx.source = 'modal'
      },
      readFromParent: e => {
        expect(e.userContext).toBe(userContext)
        const ctx = e.userContext as typeof userContext
        parentReads.push({counter: ctx.counter, source: ctx.source})
      },
    }

    const {findByTestId, findByText} = render(
      <FormBuilder view={builderViewWithCss} getForm={modalGetForm} actions={actions} userContext={userContext} />
    )

    await switchToViewerMode(findByText)

    fireEvent.click(await findByTestId('showModalButton'))
    fireEvent.click(await findByTestId('modalMutate'))
    fireEvent.click(await findByTestId('parentRead'))

    await waitFor(() => {
      expect(parentReads).toEqual([{counter: 1, source: 'modal'}])
    })
    expect(userContext).toEqual({counter: 1, source: 'modal'})
  })
})
