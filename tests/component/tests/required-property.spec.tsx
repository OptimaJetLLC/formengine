import {
  BuilderView,
  ComponentStore,
  createView,
  define,
  PersistedForm,
  required,
  string,
  type ValidatorType,
} from '@react-form-builder/core'
import {IFormBuilder} from '@react-form-builder/designer'
import {fireEvent, RenderResult} from '@testing-library/react'
import type {HTMLAttributes} from 'react'
import {getPropertyInput} from '../util/controls'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderForm'
import form from './forms/required-property.json'

interface MyCustomRequiredComponentProps extends HTMLAttributes<HTMLDivElement> {
  requiredOne?: boolean
  requiredTwo?: boolean
}

const MyCustomRequiredComponent = (props: MyCustomRequiredComponentProps) => {
  const {requiredOne, requiredTwo, ...rest} = props
  return (
    <div {...rest}>
      <span data-testid="required-one">requiredOne: {`${requiredOne}`}</span>
      <span data-testid="required-two">requiredTwo: {`${requiredTwo}`}</span>
    </div>
  )
}

const myCustomRequiredComponent = define(MyCustomRequiredComponent, 'MyCustomRequiredComponent')
  .props({
    requiredOne: required,
    requiredTwo: required,
  })
  .build()

const MyInput = (props: any) => {
  return <input {...props} />
}

const myInput = define(MyInput, 'MyInput')
  .props({
    required: required,
    value: string.valued.uncontrolledValue(''),
  })
  .build()

const fieldKey = 'test-input'

const hasRequiredRule = (componentStore: ComponentStore) => {
  return componentStore.schema?.validations?.some(({key}) => key === 'required')
}

const getRequiredPropertyInput = async (findByTestId: RenderResult['findByTestId']) => {
  return await getPropertyInput(findByTestId, fieldKey, 'required', 'Main')
}

const addValidationRule = async (findByTestId: RenderResult['findByTestId'], ruleKey: string, ruleType: ValidatorType = 'internal') => {
  fireEvent.click(await findByTestId(`Rules_Tab`))
  fireEvent.click(await findByTestId('add-rule-button'))
  fireEvent.click(await findByTestId(`rule-menu-item-${ruleType}-${ruleKey}`))

  expect(await findByTestId(`existing-rule-${ruleType}-${ruleKey}`)).toBeInTheDocument()
}

const removeValidationRule = async (findByTestId: RenderResult['findByTestId'], ruleKey: string, ruleType: ValidatorType = 'internal') => {
  fireEvent.click(await findByTestId(`Rules_Tab`))
  fireEvent.click(await findByTestId(`validator-${ruleKey}-remove-button`))

  expect(await findByTestId(`rule-menu-item-${ruleType}-${ruleKey}`)).toBeInTheDocument()
}

const getActualComponentStore = (iFormBuilder: IFormBuilder) => {
  const jsonString = iFormBuilder.formAsString
  if (!jsonString) {
    throw new Error('Unable to get string with form')
  }

  const persistedForm: PersistedForm = JSON.parse(jsonString)

  const componentStore = persistedForm.form.children?.find(child => child.key === fieldKey)
  if (!componentStore) throw new Error(`Unable to find ComponentStore with the key: '${fieldKey}'`)
  return componentStore
}

describe('The required property tests', () => {
  it('should add or remove "required" validation when the property checkbox is toggled', async () => {
    const view = new BuilderView([myInput])
    const {findByTestId, getFormBuilder} = await renderBuilder(form, {view})

    const requiredPropertyInput = await getRequiredPropertyInput(findByTestId)
    fireEvent.click(requiredPropertyInput)
    expect(requiredPropertyInput.checked).toBeTruthy()

    const iFormBuilder = getFormBuilder()
    if (!iFormBuilder) {
      throw new Error('Unable to get IFormBuilder instance')
    }

    let componentStore = getActualComponentStore(iFormBuilder)
    expect(hasRequiredRule(componentStore)).toBeTruthy()

    fireEvent.click(requiredPropertyInput)
    expect(requiredPropertyInput.checked).toBeFalsy()

    componentStore = getActualComponentStore(iFormBuilder)
    expect(hasRequiredRule(componentStore)).toBeFalsy()
  })

  it('should toggle the property checkbox when adding or removing the "required" validation', async () => {
    const view = new BuilderView([myInput])
    const {findByTestId} = await renderBuilder(form, {view})

    fireEvent.click(await findByTestId(fieldKey))

    await addValidationRule(findByTestId, 'required')

    let requiredPropertyInput = await getRequiredPropertyInput(findByTestId)
    expect(requiredPropertyInput.checked).toBeTruthy()

    await removeValidationRule(findByTestId, 'required')

    requiredPropertyInput = await getRequiredPropertyInput(findByTestId)
    expect(requiredPropertyInput.checked).toBeFalsy()
  })

  it('should show the required state of the selected component', async () => {
    const requiredFieldKey = 'required-input'
    const optionalFieldKey = 'optional-input'
    const formWithRequiredAndOptionalFields = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: requiredFieldKey,
            type: 'MyInput',
            schema: {validations: [{key: 'required'}]},
            htmlAttributes: [{name: 'data-testid', value: requiredFieldKey}],
          },
          {
            key: optionalFieldKey,
            type: 'MyInput',
            htmlAttributes: [{name: 'data-testid', value: optionalFieldKey}],
          },
        ],
      },
    }
    const view = new BuilderView([myInput])
    const {findByTestId} = await renderBuilder(formWithRequiredAndOptionalFields, {view})

    const requiredPropertyInput = await getPropertyInput(findByTestId, requiredFieldKey, 'required', 'Main')
    expect(requiredPropertyInput.checked).toBeTruthy()

    const optionalPropertyInput = await getPropertyInput(findByTestId, optionalFieldKey, 'required', 'Main')
    expect(optionalPropertyInput.checked).toBeFalsy()
  })

  it('The required property should be set for both attributes', async () => {
    const requiredForm = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'testComponent',
            type: 'MyCustomRequiredComponent',
            schema: {
              validations: [{key: 'required'}],
            },
          },
        ],
      },
    }

    const view = createView([myCustomRequiredComponent.model])
    const {findByTestId} = renderForm(requiredForm, {view})

    expect(await findByTestId('required-one')).toHaveTextContent('requiredOne: true')
    expect(await findByTestId('required-two')).toHaveTextContent('requiredTwo: true')
  })

  it('The required property should not be set for both attributes', async () => {
    const requiredForm = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'testComponent',
            type: 'MyCustomRequiredComponent',
          },
        ],
      },
    }

    const view = createView([myCustomRequiredComponent.model])
    const {findByTestId} = renderForm(requiredForm, {view})

    expect(await findByTestId('required-one')).toHaveTextContent('requiredOne: undefined')
    expect(await findByTestId('required-two')).toHaveTextContent('requiredTwo: undefined')
  })
})
