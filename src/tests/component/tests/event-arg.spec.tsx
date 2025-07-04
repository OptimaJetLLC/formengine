import {ActionDefinition, BuilderView, type IFormViewer, Store} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {testLicense} from '@react-form-builder/tests-common/license/vaild'
import {cleanup, fireEvent, render, RenderResult, within} from '@testing-library/react'
import {useCallback, useEffect, useState} from 'react'
import {MockInstance} from 'vitest'
import form from './forms/event-arg.form.json'

const view = new BuilderView(allComponentsBuilder)

const getForm = (_?: string) => JSON.stringify(form)

const mockAssert = vi.fn()
const mockLog = vi.fn()
let mockCode: ReturnType<typeof vi.spyOn>
let mockValidate: ReturnType<typeof vi.spyOn>

const actions = {
  logEventArgs: ActionDefinition.functionalAction((e, args) => {
    mockLog(args)
    // eslint-disable-next-line no-console
    console.log('logEventArgs', e, args)
  }),
  assertArgs: ActionDefinition.functionalAction((e, args) => {
    mockAssert(args)
    // eslint-disable-next-line no-console
    console.log('assertArgs', e, args)

    const throwAssert = e.store.formData.getInitialData()?.throwAssert
    if (throwAssert) {
      debugger
      throw new Error('stop processing')
    }
  }, {
    p1: 'string',
    p2: 'boolean',
    p3: 'number'
  }),
}

const App = ({throwAssert}: { throwAssert: boolean }) => {
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

  return <FormBuilder view={view} getForm={getForm} formName={'foo'} licenseKey={testLicense} actions={actions}
                      initialData={{throwAssert}} viewerRef={setRef}/>
}

const switchTab = async (app: RenderResult, tabName: string) => {
  const {findByTestId} = app
  const tab = await findByTestId(tabName)

  expect(tab).toBeInTheDocument()

  fireEvent.click(tab)
}

const selectComponent = async (app: RenderResult, testId: string) => {
  const {findByTestId} = app

  const component = await findByTestId(testId)

  fireEvent.click(component)
}

function getRightPanel({container}: RenderResult) {
  return container.querySelector('.FE_RightPanel_Content') as HTMLElement
}

const toggleArguments = async (app: RenderResult, argName: string) => {
  const rightPanel = getRightPanel(app)
  const label = await within(rightPanel).findByText(argName)
  const block = label?.parentNode?.parentNode as HTMLElement
  const button = await within(block).findByText('Arguments')

  fireEvent.click(button)
}

const matchAllArguments = async (app: RenderResult, argName: string, values: Array<{
  name: string,
  value: string,
  type: 'string' | 'number' | 'boolean'
}>) => {
  const rightPanel = getRightPanel(app)
  const label = await within(rightPanel).findByText(argName)
  const block = label?.parentNode?.parentNode as HTMLElement

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
    }
  }
}

const togglePreview = async (app: RenderResult) => {
  const {container} = app
  const header = container.querySelector('.FE_Header:not(.FE_Palette_Component)') as HTMLElement
  const button = await within(header).findByText('Preview')

  fireEvent.click(button)
}

const clickButton = async (app: RenderResult) => {
  const {container} = app
  const form = container.querySelector('.FE_FormContainer') as HTMLElement
  const button = await within(form).findByText('Button')

  fireEvent.click(button)
}

async function selectActions<Container>(app: RenderResult) {
  await selectComponent(app, 'button')
  await switchTab(app, 'Actions_Tab')
}

function expectCallOrder(...mocks: MockInstance<(this: unknown, ...args: unknown[]) => unknown>[]) {
  const calls = mocks.map(mock => ({
    mock,
    order: mock.mock.invocationCallOrder[mock.mock.invocationCallOrder.length - 1]
  }))

  for (let i = 1; i < calls.length; i++) {
    expect(calls[i - 1].order).toBeLessThan(calls[i].order)
  }
}

describe('Event args UI should display and pass arguments', () => {
  let app: RenderResult

  beforeEach(async () => {
    app = render(<App throwAssert={false}/>)
    await selectActions(app)

    mockValidate.mockClear()
    mockAssert.mockClear()
    mockLog.mockClear()
    mockCode.mockClear()

    await toggleArguments(app, 'codeaction')
    await toggleArguments(app, 'assertArgs')
    await toggleArguments(app, 'validate')
  })

  afterEach(() => {
    cleanup()
  })

  it('should display event args', async () => {
    const rightPanel = getRightPanel(app)

    expect(await within(rightPanel).findByText('logEventArgs')).toBeInTheDocument()
    expect(await within(rightPanel).findByText('codeaction')).toBeInTheDocument()
    expect(await within(rightPanel).findByText('assertArgs')).toBeInTheDocument()
  })

  it('should display saved args values', async () => {
    await matchAllArguments(app, 'codeaction', [
      {name: 'prop1', value: 'FOO', type: 'string'},
      {name: 'prop2', value: '-3', type: 'number'},
      {name: 'prop3', value: 'True', type: 'boolean'}
    ])

    await matchAllArguments(app, 'assertArgs', [
      {name: 'p1', value: 'BAR', type: 'string'},
      {name: 'p2', value: 'False', type: 'boolean'},
      {name: 'p3', value: '6', type: 'number'}
    ])

    await matchAllArguments(app, 'validate', [
      {name: 'failOnError', value: 'True', type: 'boolean'},
    ])
  })

  it('should call actions with specified values and in specified order', async () => {
    await togglePreview(app)
    await clickButton(app)

    expect(mockLog).toHaveBeenCalledWith({})

    expect(mockAssert).toHaveBeenCalledWith(expect.objectContaining({
      p1: 'BAR',
      p2: false,
      p3: 6
    }))

    expect(mockCode).toHaveBeenCalledWith(expect.objectContaining({}), expect.objectContaining({
      prop1: 'FOO',
      prop2: -3,
      prop3: true
    }))

    expect(mockValidate).toHaveBeenCalledWith(expect.objectContaining({}), expect.objectContaining({
      failOnError: true
    }))

    expectCallOrder(mockLog, mockCode, mockAssert, mockValidate)
  })

  it('should call actions before first failed actions', async () => {
    const {rerender} = app

    rerender(<App throwAssert={true}/>)

    await togglePreview(app)
    await clickButton(app)

    expectCallOrder(mockLog, mockCode, mockAssert)
    expect(mockValidate.mock.invocationCallOrder.length).toBe(0)
  })

})
