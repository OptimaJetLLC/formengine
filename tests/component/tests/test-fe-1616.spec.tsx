import {fireEvent} from '@testing-library/dom'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderForm} from '../util/renderForm'
import form from './forms/fe-1616-form.json'

describe('FE-1616 The internal validation type is not recognised in JSON test', () => {
  it('Should have "required" validation', async () => {
    const {findByTestId, formData} = renderForm(form)

    const input = await findByTestId('test-input')
    expect(input).toHaveValue('')

    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({
      rsInput1: 'Required',
    })

    fireEvent.change(input, {target: {value: 'some text'}})

    await asyncAct(async () => await formData.validate())
    expect(formData.errors).toStrictEqual({})
  })
})
