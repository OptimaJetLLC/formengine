import {fireEvent, waitFor} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'
import {switchToViewerMode} from './designerUtils'
import form from './forms/viewer-state-buttons-form.json'

describe('The Viewer state button', function () {
  it('"Validate" - should validate the current form', async () => {
    const {findByTestId, findByText, getFormData} = await renderBuilder(form)
    await switchToViewerMode(findByText)

    const validateButton = await findByTestId('viewer-validate-button')
    const testInput = await findByTestId('test-input')

    expect(getFormData()?.errors).toStrictEqual({})

    fireEvent.change(testInput, {target: {value: 'test'}})
    await waitFor(() => expect(getFormData()?.data).toStrictEqual({input: 'test'}))
    fireEvent.click(validateButton)
    await waitFor(() => expect(getFormData()?.errors).toStrictEqual({input: 'invalid'}))
  })

  it('"Reset" - should reset the current form', async () => {
    const {findByTestId, findByText, getFormData} = await renderBuilder(form)
    await switchToViewerMode(findByText)

    const resetButton = await findByTestId('viewer-reset-button')
    const testInput = await findByTestId('test-input')

    fireEvent.change(testInput, {target: {value: 'test'}})
    await waitFor(() => expect(getFormData()?.data).toStrictEqual({input: 'test'}))
    fireEvent.click(resetButton)
    await waitFor(() => expect(getFormData()?.data).toStrictEqual({input: 'default'}))
  })

  it('"Clear" - should clear the current form', async () => {
    const {findByTestId, findByText, getFormData} = await renderBuilder(form)
    await switchToViewerMode(findByText)

    const clearButton = await findByTestId('viewer-clear-button')
    const testInput = await findByTestId('test-input')

    fireEvent.change(testInput, {target: {value: 'test'}})
    await waitFor(() => expect(getFormData()?.data).toStrictEqual({input: 'test'}))
    fireEvent.click(clearButton)
    await waitFor(() => expect(JSON.stringify(getFormData()?.data)).toEqual('{}'))
  })
})
