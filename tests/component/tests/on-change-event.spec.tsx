import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, render, waitFor, within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

const testForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'input',
        type: 'RsInput',
        props: {},
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'input',
          },
        ],
      },
      {
        key: 'checkbox',
        type: 'RsCheckbox',
        props: {},
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'checkbox',
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

describe('OnChange Event', () => {
  it('Should modify the data correctly', async () => {
    const getForm = () => JSON.stringify(testForm)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const {findByTestId} = render(<FormViewer getForm={getForm} view={view} viewerRef={viewerRef} initialData={{checkbox: true}} />)

    const checkbox = await findByTestId('checkbox')
    expect(checkbox).toBeInTheDocument()

    const checkboxControl = within(checkbox).getByTestId('checkbox-control-inner')

    const formData = viewerRef?.current?.formData
    if (!formData) {
      throw new Error('Form data is not defined')
    }

    expect(JSON.stringify(formData.data)).toEqual('{"checkbox":true}')

    // switch the checkbox and send some data to the input
    fireEvent.click(checkboxControl)
    const input = await findByTestId('input')
    fireEvent.change(input, {target: {value: 'FormEngine'}})

    await waitFor(() => expect(input).toHaveValue('FormEngine'))

    expect(JSON.stringify(formData.data)).toEqual('{"input":"FormEngine","checkbox":false}')

    // switch the checkbox again and send some data to the input
    fireEvent.click(checkboxControl)
    fireEvent.change(input, {target: {value: 'Optimajet'}})

    expect(JSON.stringify(formData.data)).toEqual('{"input":"Optimajet","checkbox":true}')
  })
})
