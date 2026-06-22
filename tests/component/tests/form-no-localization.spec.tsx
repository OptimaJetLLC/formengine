import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {expect} from 'vitest'

// No localization, languages, or defaultLanguage
const form = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'name',
        type: 'RsInput',
        props: {
          label: {
            value: 'Name',
          },
        },
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'input123',
          },
        ],
      },
    ],
  },
} as const

describe('form without localization, languages, or defaultLanguage', () => {
  it('loads and renders the form viewer', async () => {
    const getForm = () => JSON.stringify(form)
    const {findByTestId, findByLabelText} = render(<FormViewer view={view} getForm={getForm}/>)

    const input = await findByTestId('input123')
    expect(input).toBeInTheDocument()
    expect(await findByLabelText('Name')).toBe(input)
  })
})
