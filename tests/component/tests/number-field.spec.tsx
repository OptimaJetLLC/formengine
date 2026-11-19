import {fireEvent} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderRsuiteForm'
import form from './forms/number-field.json'

describe('Field with type number', () => {
  it('should have an empty value after the user has entered the value and erased it', async () => {
    const {findByTestId, formData} = renderForm(form, {
      initialData: {numberField: 100},
    })

    const numberInput = await findByTestId('numberField')
    expect(numberInput).toHaveValue('100')
    expect(formData.data).toStrictEqual({numberField: 100})

    fireEvent.change(numberInput, {target: {value: ''}})

    expect(numberInput).not.toHaveValue()
    expect(formData.data).toStrictEqual({numberField: undefined})
  })
})
