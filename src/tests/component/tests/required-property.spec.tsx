import {BuilderView, ComponentStore, define, PersistedForm, required, string, type ValidatorType} from '@react-form-builder/core'
import {IFormBuilder} from '@react-form-builder/designer'
import {fireEvent, RenderResult} from '@testing-library/react'
import {getPropertyInput} from '../util/controls'
import {renderBuilder} from '../util/renderBuilder'
import form from './forms/required-property.json'

const MyInput = (props: any) => {
  return <input {...props} />
}

const myInput = define(MyInput, 'MyInput')
  .props({
    required: required,
    value: string.valued.uncontrolledValue('')
  })
  .build()

const fieldKey = 'test-input'

const hasRequiredRule = (componentStore: ComponentStore) => {
  return componentStore.schema
    ?.validations
    ?.some(({key}) => key === 'required')
}

const getRequiredPropertyInput = async (findByTestId: RenderResult['findByTestId']) => {
  return await getPropertyInput(findByTestId, fieldKey, 'required', 'Main')
}

const addValidationRule = async (findByTestId: RenderResult['findByTestId'],
                                 ruleKey: string, ruleType: ValidatorType = 'internal') => {
  fireEvent.click(await findByTestId(`Rules_Tab`))
  fireEvent.click(await findByTestId('add-rule-button'))
  fireEvent.click(await findByTestId(`rule-menu-item-${ruleType}-${ruleKey}`))

  expect(await findByTestId(`existing-rule-${ruleType}-${ruleKey}`)).toBeInTheDocument()
}

const removeValidationRule = async (findByTestId: RenderResult['findByTestId'],
                                    ruleKey: string, ruleType: ValidatorType = 'internal') => {
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

describe('The required property', () => {
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
})
