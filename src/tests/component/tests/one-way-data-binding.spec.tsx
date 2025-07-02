import {viewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {expect} from 'vitest'
import {renderForm} from '../util/renderForm'
import oneWayRepeaterForm from './forms/one-way/one-way-repeater-form.json'
import oneWaySimpleForm from './forms/one-way/one-way-simple-form.json'
import '../config/toAllHaveInnerHtml'

describe('One-way data binding', () => {
  it('The data should be bound correctly', async () => {
    const expectedValue = '13:42'
    const initialData = {input: expectedValue}
    const {findByTestId} = renderForm(oneWaySimpleForm, {initialData})

    const testInput = await findByTestId('test-input')
    expect(testInput).toHaveValue(expectedValue)
    expect(await findByTestId('test-static-bound')).toContainHTML(expectedValue)
    expect(await findByTestId('test-static-unbound-no-data-key')).toContainHTML('no dataKey')
    expect(await findByTestId('test-static-unbound-binding-is-disabled')).toContainHTML('binding is disabled')

    const newValue = 'Galaxy'
    fireEvent.change(testInput, {target: {value: newValue}})
    expect(await findByTestId('test-static-bound')).toContainHTML(newValue)
    expect(await findByTestId('test-static-unbound-no-data-key')).toContainHTML('no dataKey')
    expect(await findByTestId('test-static-unbound-binding-is-disabled')).toContainHTML('binding is disabled')
  })

  it('The data should be bound correctly in the repeater', async () => {
    const initialData = {
      repeater: [
        {input: 'data 1', templateData: {input: 'template 1'}},
        {input: 'data 2', templateData: {input: 'template 2'}}
      ]
    }

    const getForm = (name?: string) => {
      if (!name) return JSON.stringify(oneWayRepeaterForm)
      return JSON.stringify(oneWaySimpleForm)
    }

    const {findAllByTestId} = render(<FormViewer view={viewWithCss} getForm={getForm} initialData={initialData}/>)

    expect(await findAllByTestId('test-static-bound'))
      .toAllHaveInnerHtml(['data 1', 'template 1', 'data 2', 'template 2'])

    expect(await findAllByTestId('test-static-unbound-no-data-key'))
      .toAllHaveInnerHtml(['no dataKey', 'no dataKey', 'no dataKey', 'no dataKey'])

    expect(await findAllByTestId('test-static-unbound-binding-is-disabled'))
      .toAllHaveInnerHtml(['binding is disabled', 'binding is disabled', 'binding is disabled', 'binding is disabled'])
  })
})
