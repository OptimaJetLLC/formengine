import {FormValidator} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderForm} from '../util/renderRsuiteForm'
import form from './forms/entire-form-validator.json'

const expectedValues = {
  input0: 'input0',
  input1: 'input1',
  input2: 'input2',
}

const formValidatorErrors = {
  input0: 'invalid input0',
  input2: 'invalid input2',
}

describe('Form validator', () => {
  it('should validate form', async () => {
    const {findByTestId, formData} = renderForm(form)

    let returnedErrors = await asyncAct(async () => await formData.validate())

    expect(returnedErrors).toStrictEqual(formValidatorErrors)
    expect(formData.errors).toStrictEqual(formValidatorErrors)

    for (const key of Object.keys(expectedValues)) {
      const input = await findByTestId(key)
      fireEvent.change(input, {target: {value: key}})
      expect(input).toHaveValue(key)
    }
    await waitFor(() => expect(formData.data).toStrictEqual(expectedValues))

    returnedErrors = await asyncAct(async () => await formData.validate())

    expect(returnedErrors).toStrictEqual({})
    expect(formData.errors).toStrictEqual({})
  })

  it('should extend and overwrite the external form validators results from Viewer props', async () => {
    const externalValidatorErrors = {
      input0: 'external validator input0',
      input1: 'external validator input1',
      input2: 'external validator input0',
    }
    const validator: FormValidator = async () => externalValidatorErrors

    const {formData} = renderForm(form, {formValidators: [validator]})

    const returnedErrors = await asyncAct(async () => await formData.validate())
    const expectedErrors = {
      ...externalValidatorErrors,
      ...formValidatorErrors,
    }
    expect(returnedErrors).toStrictEqual(expectedErrors)
    expect(formData.errors).toStrictEqual(expectedErrors)
  })
})
