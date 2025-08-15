import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render} from '@testing-library/react'
import {expectDropDownToHaveTextContent, selectDropDownOption} from '../util/controls'

const builderView = new BuilderView(allComponentsBuilder)

describe('Form settings test', () => {
  it('The tooltip dropdown should contain the tooltip components', async () => {
    const renderResult = render(<FormBuilder view={builderView}/>)
    const {findByTestId} = renderResult

    const settingsTabButton = await findByTestId('Settings_Tab')
    fireEvent.click(settingsTabButton)

    const tooltipTypePicker = await findByTestId('tooltip-type-picker')
    expect(tooltipTypePicker).toBeInTheDocument()

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Rs Tooltip')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Rs Tooltip')

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Ant Tooltip')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Ant Tooltip')
  })

  it('The error dropdown should contain the error components', async () => {
    const renderResult = render(<FormBuilder view={builderView}/>)
    const {findByTestId} = renderResult

    const settingsTabButton = await findByTestId('Settings_Tab')
    fireEvent.click(settingsTabButton)

    const tooltipTypePicker = await findByTestId('error-type-picker')
    expect(tooltipTypePicker).toBeInTheDocument()

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Rs Error Message')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Rs Error Message')

    await selectDropDownOption(renderResult, tooltipTypePicker, 'Default Error Message')
    await expectDropDownToHaveTextContent(tooltipTypePicker, 'Default Error Message')
  })
})
