import {ActionDefinition, Arguments, BuilderView, type IFormViewer, ParameterType, Store} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {testLicense} from '@react-form-builder/tests-common/license/vaild'
import {cleanup, fireEvent, RenderResult, render, waitFor, within} from '@testing-library/react'
import {useCallback, useEffect, useState} from 'react'
import {MockInstance} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import {clickRun} from '../../common/lib/designer/clickRun'
import form from './forms/event-arg.form.json'

const view = new BuilderView(allComponentsBuilder)

const defaultGetForm = (_?: string) => JSON.stringify(form)

const getFormWithFnArgBody = (body: string) => (_?: string) => {
  const nextForm = JSON.parse(JSON.stringify(form))
  nextForm.form.children[0].events.onClick[0].args.fnArg.body = body
  return JSON.stringify(nextForm)
}

const mockAssert = vi.fn()
const mockLog = vi.fn()
const mockFunc = vi.fn()
const mockFuncResult = vi.fn()
let mockCode: ReturnType<typeof vi.spyOn>
let mockValidate: ReturnType<typeof vi.spyOn>

if (!window?.ResizeObserver) {
  class ResizeObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()

    constructor(callback: ResizeObserverCallback) {
      // Store callback if needed
    }
  }

  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
}

const actions = {
  logEventArgs: ActionDefinition.functionalAction((e, args) => {
    mockLog(args)
    // eslint-disable-next-line no-console
    console.log('logEventArgs', args)
  }),
  assertArgs: ActionDefinition.functionalAction(
    (e, args) => {
      mockAssert(args)

      const throwAssert = e.store.formData.getInitialData()?.throwAssert
      if (throwAssert) {
        throw new Error('stop processing')
      }
    },
    {
      p1: 'string',
      p2: 'boolean',
      p3: 'number',
    }
  ),
  funcArgs: ActionDefinition.functionalAction(
    async (e, args: Arguments) => {
      mockFunc(e, args)
      const {fnArg, fnArg1, fnArg2, fnArg3} = args

      // @ts-ignore for test
      const r = await fnArg?.('foo', 123)

      // @ts-ignore for test
      const r1 = await fnArg1?.('bar', 234)

      // @ts-ignore for test
      const r2 = await fnArg2?.('baz', 345)

      // @ts-ignore for test
      const r3 = await fnArg3?.('boo', 567)

      // eslint-disable-next-line no-console
      console.log('funcArgs', {r, r1, r2, r3})

      mockFuncResult({r, r1, r2, r3})
    },
    {
      fnArg: 'function',
      fnArg1: 'function',
      fnArg2: 'function',
      fnArg3: 'function',
    }
  ),
}

const App = ({throwAssert, getForm}: {throwAssert: boolean; getForm?: (_?: string) => string}) => {
  const [viewer, setViewer] = useState<IFormViewer | null>(null)
  const setRef = useCallback((viewer: IFormViewer | null) => {
    if (viewer) {
      setViewer(viewer)
    }
  }, [])

  // hack, waiting form to load
  useEffect(() => {
    if (viewer) {
      const codeAction = (viewer as Store).getAction('codeaction', 'code')
      const validateAction = (viewer as Store).getAction('validate', 'common')
      mockCode = vi.spyOn(codeAction, 'func')
      mockValidate = vi.spyOn(validateAction, 'func')
    }
  }, [viewer])

  return (
    <FormBuilder
      view={view}
      getForm={getForm ?? defaultGetForm}
      formName={'foo'}
      licenseKey={testLicense}
      actions={actions}
      initialData={{throwAssert}}
      viewerRef={setRef}
    />
  )
}

const switchTab = async (app: RenderResult, tabName: string) => {
  const tab = await app.findByTestId(tabName)

  expect(tab).toBeInTheDocument()

  await asyncAct(async () => {
    fireEvent.click(tab)
  })
}

const selectComponent = async (app: RenderResult, testId: string) => {
  const component = await app.findByTestId(testId)

  await asyncAct(async () => {
    fireEvent.click(component)
  })
}

function getRightPanel({container}: RenderResult) {
  return container.querySelector('.FE_RightPanel_Content') as HTMLElement
}

async function getActionBlock(app: RenderResult, argName: string) {
  const rightPanel = getRightPanel(app)
  const label = await within(rightPanel).findByText(argName)

  return label?.parentNode?.parentNode as HTMLElement
}

const toggleArguments = async (app: RenderResult, argName: string) => {
  const rightPanel = getRightPanel(app)
  const label = await within(rightPanel).findByText(argName)
  const block = label?.parentNode?.parentNode as HTMLElement
  const button = await within(block).findByText('Arguments')

  await asyncAct(async () => {
    fireEvent.click(button)
  })
}

const matchAllArguments = async (
  app: RenderResult,
  argName: string,
  values: Array<{
    name: string
    value: string
    type: ParameterType
  }>
) => {
  const block = await getActionBlock(app, argName)

  for (const {name, value, type} of values) {
    const label = await within(block).findByText(name)
    let input

    switch (type) {
      case 'string':
        input = label?.nextElementSibling?.querySelector('input') as HTMLInputElement
        expect(input).toHaveValue(value)
        expect(input.type).toBe('text')
        break
      case 'number':
        input = label?.nextElementSibling?.querySelector('input') as HTMLInputElement
        expect(input).toHaveValue(value)
        expect(input.inputMode).toBe('numeric')
        break
      case 'boolean':
        input = label?.nextElementSibling?.querySelector('.rs-picker-toggle-value') as HTMLElement
        expect(input).toHaveTextContent(value)
        break
      case 'function':
        input = label?.nextElementSibling?.firstChild?.firstChild as HTMLElement
        expect(input).toHaveTextContent(value)
        break
    }
  }
}

const togglePreview = async (app: RenderResult) => {
  const {container} = app
  const header = container.querySelector('.FE_Header:not(.FE_Palette_Component)') as HTMLElement
  const button = await within(header).findByText('Preview')

  await asyncAct(async () => {
    fireEvent.click(button)
  })
}

const clickButton = async (app: RenderResult) => {
  const {container} = app
  const form = container.querySelector('.FE_FormContainer') as HTMLElement
  const button = await within(form).findByText('Button')

  await asyncAct(async () => {
    fireEvent.click(button)
  })
}

const openCodeEditor = async (app: RenderResult, argName: string, functionArgumentName?: string) => {
  const block = await getActionBlock(app, argName)
  if (functionArgumentName) {
    const functionArgumentLabel = await within(block).findByText(functionArgumentName)
    const functionArgumentBlock = functionArgumentLabel.parentNode as HTMLElement
    const button = await within(functionArgumentBlock).findByText('Edit code')
    await asyncAct(async () => {
      fireEvent.click(button)
    })
    return
  }
  const button = within(block.children[1] as HTMLElement).getAllByText('Edit code')
  await asyncAct(async () => {
    fireEvent.click(button[0])
  })
}

async function selectActions(app: RenderResult) {
  await selectComponent(app, 'button')
  await switchTab(app, 'Actions_Tab')
}

function expectCallOrder(...mocks: MockInstance<(this: unknown, ...args: unknown[]) => unknown>[]) {
  const calls = mocks.map(mock => ({
    mock,
    order: mock.mock.invocationCallOrder[mock.mock.invocationCallOrder.length - 1],
  }))

  for (let i = 1; i < calls.length; i++) {
    expect(calls[i - 1].order).toBeLessThan(calls[i].order)
  }
}

describe('Event args UI should display and pass arguments', () => {
  let app: RenderResult

  beforeEach(async () => {
    app = render(<App throwAssert={false} />)
    await selectActions(app)

    mockValidate.mockClear()
    mockAssert.mockClear()
    mockLog.mockClear()
    mockCode.mockClear()
    mockFunc.mockClear()
    mockFuncResult.mockClear()

    await toggleArguments(app, 'codeaction')
    await toggleArguments(app, 'assertArgs')
    await toggleArguments(app, 'validate')
    await toggleArguments(app, 'funcArgs')
  })

  afterEach(() => {
    cleanup()
  })

  it('should display event args', async () => {
    const rightPanel = getRightPanel(app)

    expect(await within(rightPanel).findByText('logEventArgs')).toBeInTheDocument()
    expect(await within(rightPanel).findByText('codeaction')).toBeInTheDocument()
    expect(await within(rightPanel).findByText('assertArgs')).toBeInTheDocument()
    expect(await within(rightPanel).findByText('funcArgs')).toBeInTheDocument()
  })

  it('should display saved args values', async () => {
    await matchAllArguments(app, 'codeaction', [
      {name: 'prop1', value: 'FOO', type: 'string'},
      {name: 'prop2', value: '-3', type: 'number'},
      {name: 'prop3', value: 'True', type: 'boolean'},
    ])

    await matchAllArguments(app, 'assertArgs', [
      {name: 'p1', value: 'BAR', type: 'string'},
      {name: 'p2', value: 'False', type: 'boolean'},
      {name: 'p3', value: '6', type: 'number'},
    ])

    await matchAllArguments(app, 'funcArgs', [
      {name: 'fnArg', value: 'Edit code', type: 'function'},
      {name: 'fnArg1', value: 'Edit code', type: 'function'},
      {name: 'fnArg2', value: 'Edit code', type: 'function'},
      {name: 'fnArg3', value: 'Edit code', type: 'function'},
    ])

    await matchAllArguments(app, 'validate', [{name: 'failOnError', value: 'True', type: 'boolean'}])
  })

  it('should call actions with specified values and in specified order', async () => {
    await togglePreview(app)
    await clickButton(app)

    expect(mockFunc).toHaveBeenCalledWith(
      expect.objectContaining({}),
      expect.objectContaining({
        fnArg: expect.any(Function),
        fnArg1: expect.any(Function),
        fnArg2: expect.any(Function),
        fnArg3: expect.any(Function),
      })
    )
    expect(mockFuncResult).toHaveBeenCalledWith(
      expect.objectContaining({
        r: {
          result: true,
        },
        r1: false,
        r2: undefined,
        r3: {
          result: false,
        },
      })
    )

    expect(mockLog).toHaveBeenCalledWith({})

    expect(mockAssert).toHaveBeenCalledWith(
      expect.objectContaining({
        p1: 'BAR',
        p2: false,
        p3: 6,
      })
    )

    expect(mockCode).toHaveBeenCalledWith(
      expect.objectContaining({}),
      expect.objectContaining({
        prop1: 'FOO',
        prop2: -3,
        prop3: true,
      })
    )

    expect(mockValidate).toHaveBeenCalledWith(
      expect.objectContaining({}),
      expect.objectContaining({
        failOnError: true,
      })
    )

    expectCallOrder(mockFunc, mockLog, mockCode, mockAssert, mockValidate)
  })

  it('should call actions before first failed actions', async () => {
    const {rerender} = app

    await asyncAct(async () => {
      rerender(<App throwAssert={true} />)
    })

    await togglePreview(app)
    await clickButton(app)

    expectCallOrder(mockFunc, mockLog, mockCode, mockAssert)
    expect(mockValidate.mock.invocationCallOrder.length).toBe(0)
  })

  it('should provide code editor for functional action', async () => {
    await openCodeEditor(app, 'funcArgs')

    await app.findByText('Edit code action: rsButton1.onClick[0] funcArgs:fnArg')
  })

  it('should show function argument execution result in test output', async () => {
    await openCodeEditor(app, 'funcArgs', 'fnArg')
    await app.findByText('Edit code action: rsButton1.onClick[0] funcArgs:fnArg')

    await clickRun(app)

    await waitFor(async () => {
      const result = await app.findByTestId('test-result')
      expect(result).not.toHaveTextContent('Unexpected')
      expect(result).not.toHaveTextContent('Has not returned value')
    })
  })

  it('should show compile error in editor for invalid function body syntax', async () => {
    app.rerender(<App throwAssert={false} getForm={getFormWithFnArgBody('  return {result: true')} />)
    await selectActions(app)
    await toggleArguments(app, 'funcArgs')
    await openCodeEditor(app, 'funcArgs', 'fnArg')

    await clickRun(app)

    const result = await app.findByTestId('test-result')
    expect(result).toHaveTextContent('Unexpected')
  })
})
