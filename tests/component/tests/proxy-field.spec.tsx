import {createView} from '@react-form-builder/core'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent} from '@testing-library/react'
import {expect} from 'vitest'
import {renderForm} from '../util/renderForm'
import proxyFieldForm from './forms/proxy-field-form.json'
import {testTable} from './TestTable'

describe('ProxyField test', () => {
  it('The proxy field should change the parent data', async () => {
    const models = [...allComponentsBuilder, testTable.build()].map(c => c.model)
    const view = createView(models)

    const tableData = [{value: 'Red'}, {value: 'Green'}, {value: 'Blue'}] as const

    const initialData = {tableData}

    const {findAllByTestId, formData} = renderForm(proxyFieldForm, {view, initialData})

    const inputs = await findAllByTestId('cell-input')
    expect(inputs.length).toEqual(3)

    inputs.forEach((input, index) => {
      expect(input).toHaveValue(tableData[index].value)
      fireEvent.change(input, {target: {value: `${tableData[index].value}-${index}`}})
    })

    expect(formData.data).toStrictEqual({
      tableData: [{value: 'Red-0'}, {value: 'Green-1'}, {value: 'Blue-2'}],
    })
  })
})
