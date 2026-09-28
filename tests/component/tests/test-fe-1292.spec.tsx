import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {render, waitFor} from '@testing-library/react'
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
        key: 'repeater',
        type: 'Repeater',
        props: {
          value: {
            value: [{}, {}, {}],
          },
        },
        children: [
          {
            key: 'justInput',
            type: 'RsInput',
            props: {
              value: {
                value: 'good',
                computeType: 'function',
                fnSource: '  const index = form.index ?? 0\n  return `good#${index}`',
              },
              label: {
                computeType: 'function',
                fnSource: '  const index = form.index ?? 0\n  return `Just input#${index}`',
              },
            },
            htmlAttributes: [
              {
                name: 'data-testid',
                value: 'justInput',
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

describe('FE-1292 The calculated value of SimpleField is not displayed correctly in the repeater', function () {
  it('It should have correct values', async () => {
    const getForm = () => JSON.stringify(form)

    const {findAllByTestId} = render(<FormViewer getForm={getForm} view={view} />)

    const inputs = await findAllByTestId('justInput')
    expect(inputs.length).toBe(3)
    await waitFor(() => expect(inputs).toHaveExactValues(['good#0', 'good#1', 'good#2']))
  })
})
