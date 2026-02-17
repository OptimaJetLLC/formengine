import {ComponentData} from '@react-form-builder/core'
import {view} from '@react-form-builder/components-mantine'
import {renderForm} from '../util/renderForm'
import {asyncAct} from './asyncAct'
import form from './forms/mantine-error-display-form.json'

const findFieldByDataKey = (formData: ComponentData, dataKey: string) =>
  formData.allComponentFields?.find((f) => f.dataKey === dataKey)

/**
 * Tests error display for two different mechanics: MtDatePickerInput (no native error prop,
 * error shown by MtErrorWrapper only) and MtNumberInput (declares error prop, native + wrapper).
 */
describe('Mantine error display', () => {
  it('should show validation errors for MtDatePickerInput (wrapper) and MtNumberInput (native) after validate', async () => {
    const {formData, getByText} = renderForm(form, {view})

    await asyncAct(async () => await formData.validate())

    expect(formData.errors).toStrictEqual({
      dateField: 'Date is required',
      numberField: 'Number is required',
    })

    expect(getByText('Date is required')).toBeInTheDocument()
    expect(getByText('Number is required')).toBeInTheDocument()
  })

  it('should clear errors when required fields are filled and form is validated again', async () => {
    const {formData, queryByText} = renderForm(form, {view})

    await asyncAct(async () => await formData.validate())
    expect(formData.errors).toHaveProperty('dateField')
    expect(formData.errors).toHaveProperty('numberField')

    const formDataWithFields = formData as ComponentData
    const dateFieldItem = findFieldByDataKey(formDataWithFields, 'dateField')
    const numberFieldItem = findFieldByDataKey(formDataWithFields, 'numberField')

    await asyncAct(async () => {
      dateFieldItem?.field?.setValue(new Date('2024-06-15'))
      numberFieldItem?.field?.setValue(10)
    })

    await asyncAct(async () => await formData.validate())
    expect(formData.errors).toStrictEqual({})
    expect(queryByText('Date is required')).not.toBeInTheDocument()
    expect(queryByText('Number is required')).not.toBeInTheDocument()
  })
})
