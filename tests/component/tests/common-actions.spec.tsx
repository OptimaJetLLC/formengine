import {fireEvent} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderRsuiteForm'
import clearActionArgumentForm from './forms/common-actions/clear-action-argument-form.json'
import clearActionForm from './forms/common-actions/clear-action-form.json'
import resetActionArgumentForm from './forms/common-actions/reset-action-argument-form.json'
import resetActionForm from './forms/common-actions/reset-action-form.json'

describe('Common actions test', () => {
  it('The "Clear" action should delete all data from the form', async () => {
    const initialData = {input1: 'test1', additionalData: {myData: false}}

    const {formData, findByTestId} = renderForm(clearActionForm, {initialData})
    expect(await findByTestId('input1')).toHaveValue('test1')

    expect(formData.data).toStrictEqual({...initialData, input2: undefined})

    const clearButton = await findByTestId('clearButton')
    fireEvent.click(clearButton)

    expect(formData.data).toStrictEqual({input1: undefined, input2: undefined})
  })

  it('The "Clear" action should not delete all data from the form', async () => {
    const initialData = {input1: 'argument', input2: 'ok', myData: {ok: false}}

    const {formData, findByTestId} = renderForm(clearActionArgumentForm, {initialData})
    expect(await findByTestId('input1')).toHaveValue('argument')
    expect(await findByTestId('input2')).toHaveValue('ok')

    expect(formData.data).toStrictEqual(initialData)

    const clearButton = await findByTestId('clearButton')
    fireEvent.click(clearButton)

    const clearedData = formData.data
    expect(clearedData).toStrictEqual({input1: undefined, input2: undefined, myData: {ok: false}})
  })

  it('The "Reset" action should delete all data from the form', async () => {
    const initialData = {input1: 'test2', ginger: 'true'}

    const {formData, findByTestId} = renderForm(resetActionForm, {initialData})
    expect(await findByTestId('input1')).toHaveValue('test2')

    expect(formData.data).toStrictEqual({...initialData, input2: undefined})

    const resetButton = await findByTestId('resetButton')
    fireEvent.click(resetButton)

    expect(formData.data).toStrictEqual({input1: '123', input2: undefined})
  })

  it('The "Reset" action should not delete all data from the form', async () => {
    const initialData = {input1: 'test2', ginger: 'true'}

    const {formData, findByTestId} = renderForm(resetActionArgumentForm, {initialData})
    expect(await findByTestId('input1')).toHaveValue('test2')

    expect(formData.data).toStrictEqual({...initialData, input2: undefined})

    const resetButton = await findByTestId('resetButton')
    fireEvent.click(resetButton)

    expect(formData.data).toStrictEqual({input1: '123', input2: undefined, ginger: 'true'})
  })
})
