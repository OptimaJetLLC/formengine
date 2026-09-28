import {BuilderView, buildForm, ComponentData, define, string} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render, within} from '@testing-library/react'
import {selectDropDownOption} from '../util/controls'

interface TestComponentProps {
  screen: string
  button: string
}

const TestComponent = (props: TestComponentProps) => {
  const {screen, button} = props
  return (
    <div data-testid="test-component">
      <p data-testid="test-component-screen">{screen}</p>
      <p data-testid="test-component-button">{button}</p>
    </div>
  )
}

const testComponent = define(TestComponent, 'TestComponent')
  .props({
    screen: string.setup({editor: 'formComponent'}),
    button: string.setup({editor: 'formComponent'}).withEditorProps({
      filter: (componentData: ComponentData) => {
        return componentData.model.type === 'RsButton'
      },
    }),
  })
  .build()

const form = buildForm()
  .component('button1', 'RsButton')
  .component('button2', 'RsButton')
  .component('testComponent1', 'TestComponent')
  .json()

const view = new BuilderView([...allComponentsBuilder, testComponent])

describe('FormComponentPicker test', () => {
  it('FormComponentPicker should display filtered value', async () => {
    const getForm = () => form
    const renderResult = render(<FormBuilder view={view} getForm={getForm} />)
    const {findByTestId} = renderResult

    const testComponent = await findByTestId('test-component')
    fireEvent.click(testComponent)

    const screenPropPicker = await findByTestId('screen-property-input')
    await selectDropDownOption(renderResult, screenPropPicker, 'Screen')

    const buttonPropPicker = await findByTestId('button-property-input')
    await selectDropDownOption(renderResult, buttonPropPicker, 'button1')

    expect(await findByTestId('test-component-screen')).toHaveTextContent('Screen')
    expect(await findByTestId('test-component-button')).toHaveTextContent('button1')

    fireEvent.click(buttonPropPicker)
    const pickerPopup = await findByTestId('picker-popup')
    const options = await within(pickerPopup).findAllByRole('option')

    const items = options.map(item => item.textContent)
    expect(items).toStrictEqual(['button1', 'button2'])
  })
})
