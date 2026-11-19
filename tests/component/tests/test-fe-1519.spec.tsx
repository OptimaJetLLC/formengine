import {fireEvent} from '@testing-library/dom'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderRsuiteForm'
import {switchToViewerMode} from './designerUtils'
import form from './forms/number-format-infinity-form.json'

describe('RsNumberFormat infinity value test', () => {
  it('RsNumberFormat should work with infinite values', async () => {
    const initialData = {
      nfPositiveInfinity: Number.POSITIVE_INFINITY,
      nfNegativeInfinity: Number.NEGATIVE_INFINITY,
      nfNan: Number.NaN,
      nfNormalNumber: undefined,
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
      nfNormalNumber: undefined,
    })

    fireEvent.change(nfNan, {target: {value: 12}})
    fireEvent.change(nfNegativeInfinity, {target: {value: 34}})
    fireEvent.change(nfPositiveInfinity, {target: {value: 56}})

    expect(formData.data).toStrictEqual({
      nfNan: 12,
      nfNegativeInfinity: 34,
      nfPositiveInfinity: 56,
      nfNormalNumber: undefined,
    })
  })

  it('The numbers should be displayed in the preview mode', async () => {
    const initialData = {
      nfPositiveInfinity: Number.POSITIVE_INFINITY,
      nfNegativeInfinity: Number.NEGATIVE_INFINITY,
      nfNan: Number.NaN,
      nfNormalNumber: 1.3,
    }

    const {findByTestId, findByText} = await renderBuilder(form, {initialData})
    await switchToViewerMode(findByText)

    const dataPre = await findByTestId('form-viewer-state-json-data')
    const expectedData = '{ "nfPositiveInfinity": "Infinity", "nfNegativeInfinity": "-Infinity", "nfNan": "NaN", "nfNormalNumber": 1.3 }'
    expect(dataPre).toHaveTextContent(expectedData)
  })
})
