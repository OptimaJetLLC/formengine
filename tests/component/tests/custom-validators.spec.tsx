import {RuleValidator, type Validators} from '@react-form-builder/core'
import {fireEvent} from '@testing-library/react'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderForm} from '../util/renderForm'
import formWithRepeater from './forms/custom-validation-with-form-data/repeater.json'
import formWithSimpleField from './forms/custom-validation-with-form-data/simple-field.json'

const expectedValue = 'test value'

const renderFormWithValidator = (form: object, validator: RuleValidator, initialData?: Record<string, any>) => {
  const validators: Validators = {
    string: {
      testValidator: {
        validate: validator
      }
    }
  }

  return renderForm(form, {validators, initialData})
}

describe('Custom validators', () => {
  it('should have access to formData in simple field', async () => {
    const validator: RuleValidator = (value, store, args, formData) => {
      const field = formData?.data?.input1
      return field === expectedValue ? true : 'Invalid'
    }
    const {findByTestId, formData} = renderFormWithValidator(formWithSimpleField, validator)

    let returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {input2: 'Invalid'}
    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)

    const input1 = await findByTestId('input1')
    fireEvent.change(input1, {target: {value: expectedValue}})

    expect(input1).toHaveValue(expectedValue)
    returnedErrors = await asyncAct(async () => await formData.validate())

    expect(returnedErrors).toStrictEqual({})
    expect(formData.errors).toStrictEqual({})
  })

  it('should have access to row data in repeater field', async () => {
    const validator: RuleValidator = (value, store, args, formData) => {
      const field = formData?.data?.repeaterInput1
      return field === expectedValue ? true : 'Invalid'
    }
    const {findByTestId, formData} = renderFormWithValidator(formWithRepeater, validator, {
      repeater1: [{}]
    })

    let returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {
      repeater1: [
        {repeaterInput2: 'Invalid'}
      ]
    }
    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)

    const repeaterInput1 = await findByTestId('repeaterInput1')
    fireEvent.change(repeaterInput1, {target: {value: expectedValue}})

    expect(repeaterInput1).toHaveValue(expectedValue)
    returnedErrors = await asyncAct(async () => await formData.validate())

    expect(returnedErrors).toStrictEqual({})
    expect(formData.errors).toStrictEqual({})
  })

  it('should have access to form data in repeater field', async () => {
    const validator: RuleValidator = (value, store, args, formData) => {
      const field = formData?.rootData?.input1
      return field === expectedValue ? true : 'Invalid'
    }
    const {findByTestId, formData} = renderFormWithValidator(formWithRepeater, validator, {
      repeater1: [{}]
    })

    let returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {
      repeater1: [
        {repeaterInput2: 'Invalid'}
      ]
    }
    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)

    const input1 = await findByTestId('input1')
    fireEvent.change(input1, {target: {value: expectedValue}})

    expect(input1).toHaveValue(expectedValue)
    returnedErrors = await asyncAct(async () => await formData.validate())

    expect(returnedErrors).toStrictEqual({})
    expect(formData.errors).toStrictEqual({})
  })
})
