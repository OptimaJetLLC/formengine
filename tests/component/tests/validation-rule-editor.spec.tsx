import {PersistedForm} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {describe} from 'vitest'
import {parseForm} from '../util/parseForm'
import {renderBuilder} from '../util/renderBuilder'
import form from './forms/validation-rule-editor.json'

describe('Validation rule editor', function () {
  it('should remove the rule localization from the form when this rule is deleted', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(form)
    const getFormJson = () => parseForm(getFormBuilder()?.formAsString)
    const expectedLocalization: PersistedForm['localization'] = {...form.localization}

    expect(await findByTestId('test-input-1')).toBeInTheDocument()
    expect(getFormJson()?.localization).toStrictEqual(expectedLocalization)
    fireEvent.click(await findByTestId('test-input-1'))
    fireEvent.click(await findByTestId('Rules_Tab'))

    fireEvent.click(await findByTestId('validator-required-remove-button'))
    delete expectedLocalization['en-US'].rsInput1['validator-required']
    delete expectedLocalization['de-DE'].rsInput1['validator-required']
    await waitFor(() => expect(getFormJson()?.localization).toStrictEqual(expectedLocalization))

    fireEvent.click(await findByTestId('validator-url-remove-button'))
    expect(getFormJson()?.localization).toBeUndefined()
  })
})
