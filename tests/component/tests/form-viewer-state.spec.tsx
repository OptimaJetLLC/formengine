import {fireEvent} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'
import {switchToViewerMode} from './designerUtils'

const persistedForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'rsNumberFormat1',
        type: 'RsNumberFormat',
        htmlAttributes: [{name: 'data-testid', value: 'number-format'}]
      }
    ]
  }
}

describe('FormViewerState tests', () => {
  it('The numerical value should be displayed as a number, not as a string', async () => {
    const {findByTestId, findByText} = await renderBuilder(persistedForm)

    await switchToViewerMode(findByText)

    const dataPre = await findByTestId('form-viewer-state-json-data')
    expect(dataPre).toHaveTextContent('{}')

    const input = await findByTestId('number-format')
    fireEvent.change(input, {target: {value: 5432}})

    expect(dataPre).toHaveTextContent('{ "rsNumberFormat1": 5432 }')
  })
})
