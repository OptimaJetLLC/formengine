import {fireEvent} from '@testing-library/dom'
import {renderForm} from '../util/renderForm'
import form from './forms/number-format-infinity-form.json'

describe('RsNumberFormat infinity value test', () => {
  it('RsNumberFormat should work with infinite values', async () => {
    const initialData = {
      nfPositiveInfinity: Number.POSITIVE_INFINITY,
      nfNegativeInfinity: Number.NEGATIVE_INFINITY,
      nfNan: Number.NaN,
    }

    const {formData, findByTestId} = renderForm(form, {initialData})

    const nfPositiveInfinity = await findByTestId('nfPositiveInfinity')
    expect(nfPositiveInfinity).toHaveValue('')

    const nfNegativeInfinity = await findByTestId('nfNegativeInfinity')
    expect(nfNegativeInfinity).toHaveValue('')

    const nfNan = await findByTestId('nfNan')
    expect(nfNan).toHaveValue('')

    expect(formData.data).toStrictEqual({
      nfNan: Number.NaN,
      nfNegativeInfinity: Number.NEGATIVE_INFINITY,
      nfPositiveInfinity: Number.POSITIVE_INFINITY,
    })

    fireEvent.change(nfNan, {target: {value: 12}})
    fireEvent.change(nfNegativeInfinity, {target: {value: 34}})
    fireEvent.change(nfPositiveInfinity, {target: {value: 56}})

    expect(formData.data).toStrictEqual({
      nfNan: 12,
      nfNegativeInfinity: 34,
      nfPositiveInfinity: 56,
    })
  })
})
