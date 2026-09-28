import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render} from '@testing-library/react'
import {useState} from 'react'
import {expect} from 'vitest'
import '../config/toHaveExactValues'

const form = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'rsButton1',
        type: 'RsButton',
        props: {},
        events: {
          onClick: [
            {
              name: 'changeData',
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
      {
        key: 'testRepeater',
        type: 'Repeater',
        props: {},
        children: [
          {
            key: 'name',
            type: 'RsInput',
            props: {},
            htmlAttributes: [
              {
                name: 'data-testid',
                value: 'test-input',
              },
            ],
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
}

const components = rSuiteComponents.map(d => d.build())
const view = new BuilderView(components)

describe(`FormBuilder compute children`, function () {
  it('Rerender should not break compute children function', async () => {
    const App = () => {
      const [initialData, setInitialData] = useState({testRepeater: [{name: 'one'}, {name: 'two'}]})

      return (
        <FormBuilder
          view={view}
          getForm={() => JSON.stringify(form)}
          initialData={initialData}
          actions={{
            changeData: _ => {
              setInitialData({testRepeater: [{name: 'three'}, {name: 'four'}, {name: 'five'}]})
            },
          }}
        />
      )
    }

    const {findByRole, findAllByTestId, findByTestId} = render(<App />)
    const previewButton = await findByRole('button', {name: 'Preview'})
    fireEvent.click(previewButton)

    const editButton = await findByRole('button', {name: 'Edit'})
    expect(editButton).toBeInTheDocument()

    expect(await findAllByTestId('test-input')).toHaveExactValues(['one', 'two'])

    const testButton = await findByTestId('test-button')
    fireEvent.click(testButton)

    expect(await findAllByTestId('test-input')).toHaveExactValues(['three', 'four', 'five'])
  })
})
