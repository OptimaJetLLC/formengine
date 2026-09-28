import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {ComponentType, Fragment, StrictMode, version} from 'react'
import lifecycleEventsForm from './forms/lifecycle-events-form.json'

type ExpectedMessages = {
  onDidMount: string[]
  onWillUnmount: string[]
}

type TestItem = [string, ComponentType<any>, ExpectedMessages]

const normalOnDidMount = ['onDidMount checkbox', 'onDidMount rsButton1']

const normalOnWillUnmount = ['onDidMount checkbox', 'onDidMount rsButton1', 'onWillUnmount checkbox', 'onWillUnmount rsButton1']

const data: TestItem[] = [
  [
    'normal',
    Fragment,
    {
      onDidMount: normalOnDidMount,
      onWillUnmount: normalOnWillUnmount,
    },
  ],
  [
    'strict',
    StrictMode,
    {
      onDidMount: [
        'onDidMount checkbox',
        'onDidMount rsButton1',
        'onWillUnmount checkbox',
        'onWillUnmount rsButton1',
        'onDidMount checkbox',
        'onDidMount rsButton1',
      ],
      onWillUnmount: [
        'onDidMount checkbox',
        'onDidMount rsButton1',
        'onWillUnmount checkbox',
        'onWillUnmount rsButton1',
        'onDidMount checkbox',
        'onDidMount rsButton1',
        'onWillUnmount checkbox',
        'onWillUnmount rsButton1',
      ],
    },
  ],
]

describe('Lifecycle events', () => {
  it.each(data)('The onDidMount/onWillUnmount events should be called, React %s mode', async (_, Wrapper, expectedMessages) => {
    const eventLog: string[] = []

    const actions: FormViewerProps['actions'] = {
      logEvent: e => {
        eventLog.push(`${e.type} ${e.sender.key}`)
      },
    }

    const getForm = () => JSON.stringify(lifecycleEventsForm)

    const {findByTestId, unmount} = render(
      <Wrapper>
        <FormViewer view={view} getForm={getForm} actions={actions} />
      </Wrapper>
    )

    expect(await findByTestId('rsButton1')).toBeInTheDocument()
    const expectedOnDidMount = version === '17.0.2' ? normalOnDidMount : expectedMessages.onDidMount
    expect(eventLog).toEqual(expectedOnDidMount)

    unmount()
    const expectedOnWillUnmount = version === '17.0.2' ? normalOnWillUnmount : expectedMessages.onWillUnmount
    expect(eventLog).toEqual(expectedOnWillUnmount)
  })
})
