import {asyncAct} from '../../common/lib/asyncAct'
import {renderForm} from '../util/renderForm'
import form from './forms/rs-date-picker-form.json'

describe('RsDatePicker test', () => {
  it('RsDatePicker should convert string value to Date', async () => {
    const stringDate = '2025-09-02T12:29:42.016Z'
    const initialData = {
      rsDatePicker1: stringDate,
      rsDatePicker2: new Date(),
    }
    const {formData} = renderForm(form, {initialData})

    const data = formData.data
    expect(data.rsDatePicker1).toBeInstanceOf(Date)
    expect(data.rsDatePicker2).toBeInstanceOf(Date)

    const expectedDate = new Date(stringDate)
    expect(data.rsDatePicker1).toEqual(expectedDate)

    await asyncAct(async () => await formData.validate())
    expect(formData.errors).toStrictEqual({})
  })
})
