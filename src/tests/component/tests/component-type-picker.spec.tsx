import {BuilderView, buildForm, ComponentData, define, string} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render, within} from '@testing-library/react'
import {selectDropDownOption} from '../util/controls'

interface TestComponentProps {
  template: string
}

const TestComponent = (props: TestComponentProps) => {
  const {template} = props
  return <p data-testid="test-component-template">{template}</p>
}

const testComponent = define(TestComponent, 'TestComponent')
  .props({
    template: string.setup({editor: 'componentType'}).withEditorProps({
      filter: (componentData: ComponentData) => componentData.model.type.startsWith('Template:')
    }),
  })
  .build()

const form = buildForm()
  .component('testComponent1', 'TestComponent')
  .json()

const templateArray = ['template one', 'template two']

const view = new BuilderView([...allComponentsBuilder, testComponent])
  .withTemplates(templateArray)

describe('ComponentTypePicker test', () => {
  it('ComponentTypePicker should display filtered value', async () => {
    const getForm = () => form
    const renderResult = render(<FormBuilder view={view} getForm={getForm}/>)
    const {findByTestId} = renderResult

    const testComponent = await findByTestId('test-component-template')
    fireEvent.click(testComponent)

    const templatePropPicker = await findByTestId('template-property-input')
    await selectDropDownOption(renderResult, templatePropPicker, 'template one')

    expect(testComponent).toHaveTextContent('template one')

    fireEvent.click(templatePropPicker)
    const pickerPopup = await findByTestId('picker-popup')
    const options = await within(pickerPopup).findAllByRole('option')

    const items = options.map(item => item.textContent)
    expect(items).toStrictEqual(templateArray)
  })
})
