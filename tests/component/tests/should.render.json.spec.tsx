import {createView, define, event, FormViewer} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {useEffect, useState} from 'react'
import {describe, expect, it} from 'vitest'

function CustomComponent(props: {onLoad: (callback: (data: any) => void) => void}) {
  const [data, setData] = useState<any>()
  const {onLoad, ...otherProps} = props

  useEffect(() => {
    onLoad(setData)
  }, [onLoad])

  return <pre {...otherProps}>{JSON.stringify(data, null, 2)} </pre>
}

const customComponentDefinition = define(CustomComponent, 'CustomComponent').category('test').props({
  onLoad: event,
})

const formView = createView([customComponentDefinition.build().model])

const formJson = JSON.stringify({
  version: '1',
  actions: {
    'fetch-and-set-data': {
      body: "    const [callback] = e.args;\n    const mockApiData = { prop1: 'expected-FE-975', prop2: 'test2' }\n    console.log('fetching data...')\n    callback(mockApiData);",
      params: {},
    },
  },
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'customComponent1',
        type: 'CustomComponent',
        events: {
          onLoad: [
            {
              name: 'fetch-and-set-data',
              type: 'code',
            },
          ],
        },
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'customComponent1',
          },
        ],
      },
    ],
  },
})

const App = () => {
  return <FormViewer view={formView} getForm={() => formJson} />
}

describe(`Should render JSON onDidMount`, function () {
  it('should render "expected-FE-975" in custom component', async () => {
    const {getByText, findByTestId} = render(<App />)
    expect(await findByTestId('customComponent1')).toBeInTheDocument()
    expect(getByText(/expected-FE-975/)).toBeInTheDocument()
  })
})
