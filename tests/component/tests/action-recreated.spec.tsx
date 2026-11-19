import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {CustomActions, createView, FormViewer} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {useMemo, useState} from 'react'
import {describe, expect, it} from 'vitest'

const formJson = JSON.stringify({
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'rsButton1',
        type: 'RsButton',
        props: {
          children: {
            value: 'Click me',
          },
        },
        events: {
          onClick: [
            {
              name: 'logCounter',
              type: 'custom',
            },
          ],
        },
      },
    ],
  },
})

const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)
const view = createView(componentsMetadata)

const App = () => {
  const [counter, setCounter] = useState(0)

  const actions = useMemo<CustomActions>(
    () => ({
      logCounter: () => {
        document.title = `Counter: ${counter}`
      },
    }),
    [counter]
  )

  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
      <FormViewer view={view} getForm={() => formJson} actions={actions} />
    </>
  )
}

describe(`Should recreate actions on props change`, function () {
  it('Should recreate actions on props change', async () => {
    const {findByText} = render(<App />)

    const button = await findByText('Increment counter')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    const button2 = await findByText('Click me')
    fireEvent.click(button2)

    expect(document.title).toEqual('Counter: 3')
  })
})
