import {createView, define, event, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {Fragment, forwardRef, useImperativeHandle} from 'react'
import {renderViewerForm} from '../util/renderViewerForm'

describe('Component ref tests', () => {
  it('refValue must never be a RefObject, it is always the direct value (element, imperative handle or null)', async () => {
    const receivedValues: unknown[] = []

    const ImperativeForRefShape = forwardRef<any, any>((props, ref) => {
      useImperativeHandle(ref, () => ({
        focus: () => {},
      }))
      return <button {...props}>RefShape</button>
    })

    const imperativeModel = define(ImperativeForRefShape, 'ImperativeForRefShapeTest').props({onClick: event}).build()

    const view = createView([imperativeModel.model])
    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'btn',
            type: 'ImperativeForRefShapeTest',
            events: {onClick: [{name: 'onClick', type: 'custom'}]},
          },
        ],
      },
    }

    const actions: FormViewerProps['actions'] = {
      onClick: e => {
        receivedValues.push(e.refValue)
      },
    }

    const {findByText} = renderViewerForm(view, form, {actions})
    fireEvent.click(await findByText('RefShape'))

    await waitFor(() => {
      expect(receivedValues).toHaveLength(1)
      expect(receivedValues[0]).not.toBeNull()
      expect(receivedValues[0]).not.toHaveProperty('current')
    })
  })

  it('refValue should contain the rendered DOM element in ActionEventArgs', async () => {
    let clicks = 0
    let receivedComponent: any

    const GenericWithRef = forwardRef<any, any>((props: any, ref) => (
      <button ref={ref} {...props}>
        WithRef
      </button>
    ))

    const genericWithRef = define(GenericWithRef, 'GenericComponentWithRef')
      .props({
        onClick: event,
      })
      .build()

    const view = createView([genericWithRef.model])

    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'withRef',
            type: 'GenericComponentWithRef',
            events: {
              onClick: [
                {
                  name: 'onWithRefClick',
                  type: 'custom',
                },
              ],
            },
          },
        ],
      },
    }

    const actions: FormViewerProps['actions'] = {
      onWithRefClick: e => {
        clicks++
        receivedComponent = e.refValue
      },
    }

    const {findByText} = renderViewerForm(view, form, {actions})

    fireEvent.click(await findByText('WithRef'))

    await waitFor(() => {
      expect(clicks).toBe(1)
      expect(receivedComponent).toBeInstanceOf(HTMLButtonElement)
    })
  })

  it('refValue can point to an imperative React component handle via useImperativeHandle', async () => {
    let clicks = 0
    let apiCalled = 0
    let receivedRef: any

    interface ImperativeApi {
      api: () => void
    }

    const ImperativeComponent = forwardRef<ImperativeApi, any>((props, ref) => {
      useImperativeHandle(ref, () => ({
        api: () => {
          apiCalled++
        },
      }))
      return <button {...props}>Imperative</button>
    })

    const imperativeComponent = define(ImperativeComponent, 'ImperativeComponentWithRef')
      .props({
        onClick: event,
      })
      .build()

    const view = createView([imperativeComponent.model])

    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'imperative',
            type: 'ImperativeComponentWithRef',
            events: {
              onClick: [
                {
                  name: 'onImperativeClick',
                  type: 'custom',
                },
              ],
            },
          },
        ],
      },
    }

    const actions: FormViewerProps['actions'] = {
      onImperativeClick: e => {
        clicks++
        receivedRef = e.refValue
        receivedRef.api()
      },
    }

    const {findByText} = renderViewerForm(view, form, {actions})

    fireEvent.click(await findByText('Imperative'))

    await waitFor(() => {
      expect(clicks).toBe(1)
      expect(apiCalled).toBe(1)
      expect(receivedRef).toBeDefined()
      expect(typeof receivedRef.api).toBe('function')
      expect(receivedRef).not.toHaveProperty('current')
    })
  })

  it('Component with Fragment root still exposes its DOM element via refValue', async () => {
    let clicks = 0
    let receivedRef: any

    const FragmentRootComponent = forwardRef<any, any>((props: any, ref) => (
      <Fragment>
        <button ref={ref} {...props}>
          Fragment
        </button>
      </Fragment>
    ))

    const fragmentComponent = define(FragmentRootComponent, 'FragmentRootComponent')
      .props({
        onClick: event,
      })
      .build()

    const view = createView([fragmentComponent.model])

    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'fragment',
            type: 'FragmentRootComponent',
            events: {
              onClick: [
                {
                  name: 'onFragmentClick',
                  type: 'custom',
                },
              ],
            },
          },
        ],
      },
    }

    const actions: FormViewerProps['actions'] = {
      onFragmentClick: e => {
        clicks++
        receivedRef = e.refValue
      },
    }

    const {findByText} = renderViewerForm(view, form, {actions})

    fireEvent.click(await findByText('Fragment'))

    await waitFor(() => {
      expect(clicks).toBe(1)
      expect(receivedRef).toBeInstanceOf(HTMLButtonElement)
    })
  })

  it('When componentWrapper is React.Fragment and component returns Fragment, refValue must be null', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    let clicks = 0
    let receivedRef: any

    const SimpleComponent = ({ref, ...props}: any) => (
      <>
        <span>button</span>
        <button {...props}>Simple</button>
      </>
    )

    const simpleComponent = define(SimpleComponent, 'SimpleComponentWithFragmentWrapper')
      .props({
        onClick: event,
      })
      .build()

    const view = createView([simpleComponent.model])

    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'simple',
            type: 'SimpleComponentWithFragmentWrapper',
            events: {
              onClick: [
                {
                  name: 'onSimpleClick',
                  type: 'custom',
                },
              ],
            },
          },
        ],
      },
    }

    const actions: FormViewerProps['actions'] = {
      onSimpleClick: e => {
        clicks++
        receivedRef = e.refValue
      },
    }

    const {findByText} = renderViewerForm(view, form, {actions, componentWrapper: Fragment})

    fireEvent.click(await findByText('Simple'))

    await waitFor(() => {
      expect(clicks).toBe(1)
      expect(receivedRef).toBeNull()
    })

    consoleErrorSpy.mockRestore()
  })

  it('When wrapper returns Fragment and component is html element refValue must point to the underlying element', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    let clicks = 0
    let receivedRef: any

    const SimpleComponent = forwardRef<any, any>((props: any, ref) => (
      <button ref={ref} {...props}>
        SimpleWithCustomWrapper
      </button>
    ))

    const simpleComponent = define(SimpleComponent, 'SimpleComponentWithCustomFragmentWrapper')
      .props({
        onClick: event,
      })
      .build()

    const view = createView([simpleComponent.model])

    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'simple',
            type: 'SimpleComponentWithCustomFragmentWrapper',
            events: {
              onClick: [
                {
                  name: 'onSimpleClick',
                  type: 'custom',
                },
              ],
            },
          },
        ],
      },
    }

    const actions: FormViewerProps['actions'] = {
      onSimpleClick: e => {
        clicks++
        receivedRef = e.refValue
      },
    }

    const componentWrapper = ({children}: {children: any}) => <>{children}</>

    const {findByText} = renderViewerForm(view, form, {actions, componentWrapper})

    fireEvent.click(await findByText('SimpleWithCustomWrapper'))

    await waitFor(() => {
      expect(clicks).toBe(1)
      expect(receivedRef).toBeInstanceOf(HTMLButtonElement)
    })

    consoleErrorSpy.mockRestore()
  })
})
