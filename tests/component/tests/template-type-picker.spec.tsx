import {BuilderView, buildForm, define, string} from '@react-form-builder/core'
import {FormBuilder, IFormStorage} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render, within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
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
    template: string.setup({editor: 'templateTypePicker'}),
  })
  .build()

const form = buildForm().component('testComponent1', 'TestComponent').json()

const formStorage: IFormStorage = {
  getForm() {
    return Promise.resolve(form)
  },
  getFormNames() {
    return Promise.resolve(['one', 'two'])
  },
  removeForm() {
    return Promise.resolve(undefined)
  },
  saveForm() {
    return Promise.resolve(undefined)
  },
}

const view = new BuilderView([...allComponentsBuilder, testComponent])

describe('TemplateTypePicker test', () => {
  it('TemplateTypePicker should display templates', async () => {
    const getForm = () => form
    const renderResult = render(<FormBuilder view={view} getForm={getForm} formName="test" formStorage={formStorage} />)
    const {findByTestId} = renderResult

    const testComponent = await findByTestId('test-component-template')
    fireEvent.click(testComponent)

    const templatePropPicker = await findByTestId('template-property-input')
    await selectDropDownOption(renderResult, templatePropPicker, 'one')

    expect(testComponent).toHaveTextContent('one')

    fireEvent.click(templatePropPicker)
    const pickerPopup = await findByTestId('picker-popup')
    const options = await within(pickerPopup).findAllByRole('option')

    const items = options.map(item => item.textContent)
    expect(items).toStrictEqual(['one', 'two'])
  })
})
