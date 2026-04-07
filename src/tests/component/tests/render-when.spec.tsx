import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import renderWhenForm from './forms/render-when-form.json'

describe('RenderWhen test', () => {
  it('should render when renderWhen/itemRenderWhen condition is true', async () => {
    const getForm = () => JSON.stringify(renderWhenForm)
    const initialData = {
      'repeater': [{visible: true}, {visible: true}, {visible: true, 'repeaterInput': '2'}]
    }
    const {findByTestId, queryByTestId} = render(<FormViewer view={view} getForm={getForm} initialData={initialData}/>)

    expect(await findByTestId('visibleWhenAll')).toHaveValue('Simple render when')
    // we should see only one element in the repeater
    expect(await findByTestId('repeaterInput')).toHaveValue('2')

    const mainInput = await findByTestId('mainInput')
    fireEvent.change(mainInput, {target: {value: 'none'}})

    // hidden when mainInput is not 'all'
    expect(queryByTestId('visibleWhenAll')).not.toBeInTheDocument()

    const visibleCheckbox = await findByTestId('visible')
    const labelCheckbox = visibleCheckbox.querySelector('label')
    if (!labelCheckbox) {
      throw new Error('Checkbox not found')
    }
    fireEvent.click(labelCheckbox)

    // visible only when checkbox is checked
    expect(queryByTestId('repeaterInput')).not.toBeInTheDocument()
  })
})
