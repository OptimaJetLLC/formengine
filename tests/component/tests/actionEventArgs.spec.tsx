import {models as rsuiteModels, view} from '@react-form-builder/components-rsuite'
import {ActionEventArgs, createView, FormViewer, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {expect} from 'vitest'
import {renderViewerForm} from '../util/renderViewerForm'
import changeDataForm from './forms/action-event-args-change-data.form.json'
import form from './forms/action-event-args-main-form.json'
import parentTemplate from './forms/action-event-args-parent-template.json'
import template from './forms/action-event-args-template.json'
import rowInActionEventArgsForm from './forms/row-info-in-action-event-args-form.json'
import {simpleCell, testTable} from './TestTable'

const getForm = (name?: string) => {
  if (name === 'action-event-args-template') {
    return JSON.stringify(template)
  }
  if (name === 'action-event-args-parent-template') {
    return JSON.stringify(parentTemplate)
  }
  return JSON.stringify(form)
}

const getChildRepeaterItemData = () => ({
  childRepeaterInput: 'child data',
  templateInput: 'template input',
  parentTemplateInput: 'parent template value',
  inputInRootSlot3: 'input in root slot 3',
})

const getRootRepeaterItemData = () => ({
  repeaterInput: 'repeater input data',
  templateInput: 'template input',
  parentTemplateInput: 'parent template value',
  inputInRootSlot2: 'input in root slot 2',
  childRepeater: [getChildRepeaterItemData(), getChildRepeaterItemData(), getChildRepeaterItemData()],
})

const getFormData = (modifier?: (data: any) => any) => {
  const data = {
    rootFormInput: 'root form input data',
    templateInput: 'template input',
    parentTemplateInput: 'parent template value',
    inputInRootSlot1: 'input in root slot 1',
    rootRepeater: [getRootRepeaterItemData(), getRootRepeaterItemData()],
  }
  modifier?.(data)
  return data
}

type ExpectedActionEventArgsData = [
  string,
  number,
  {
    valueBeforeChange: string
    value: string
    index?: number
    data: Record<string, any>
    parentData?: Record<string, any>
    rootData: Record<string, any>
  },
]

const createActionArgsData = () => {
  const result: ExpectedActionEventArgsData[] = []

  // root input
  const rootFormExpected = getFormData(data => {
    data.rootFormInput = 'Mark'
  })
  result.push([
    'rootFormInput',
    0,
    {
      valueBeforeChange: 'root form input data',
      value: 'Mark',
      data: rootFormExpected,
      parentData: undefined,
      rootData: rootFormExpected,
    },
  ])

  // root template input
  const rootTemplateData = {templateInput: 'Charlie'}
  result.push([
    'templateInput',
    0,
    {
      valueBeforeChange: 'template input',
      value: 'Charlie',
      data: rootTemplateData,
      parentData: undefined,
      rootData: rootTemplateData,
    },
  ])

  // root parent template input
  const rootParentTemplateData = {templateInput: 'template input', parentTemplateInput: 'Columbus'}
  result.push([
    'parentTemplateInput',
    0,
    {
      valueBeforeChange: 'parent template value',
      value: 'Columbus',
      data: rootParentTemplateData,
      parentData: undefined,
      rootData: rootParentTemplateData,
    },
  ])

  // input in parent template slot
  const inputInRootSlot1Data = getFormData(data => {
    data.inputInRootSlot1 = 'Castillo'
  })
  result.push([
    'inputInRootSlot1',
    0,
    {
      valueBeforeChange: 'input in root slot 1',
      value: 'Castillo',
      data: inputInRootSlot1Data,
      parentData: undefined,
      rootData: inputInRootSlot1Data,
    },
  ])

  // repeater level 0 item 0
  const repeaterLevel0Expected0 = getFormData(data => {
    data.rootRepeater[0].repeaterInput = 'Jake'
  })
  result.push([
    'repeaterInput',
    0,
    {
      valueBeforeChange: 'repeater input data',
      value: 'Jake',
      index: 0,
      data: repeaterLevel0Expected0.rootRepeater[0],
      parentData: repeaterLevel0Expected0,
      rootData: repeaterLevel0Expected0,
    },
  ])

  // repeater level 0 item 1
  const repeaterLevel0Expected1 = getFormData(data => {
    data.rootRepeater[1].repeaterInput = 'Sonya'
  })
  result.push([
    'repeaterInput',
    1,
    {
      valueBeforeChange: 'repeater input data',
      value: 'Sonya',
      index: 1,
      data: repeaterLevel0Expected1.rootRepeater[1],
      parentData: repeaterLevel0Expected1,
      rootData: repeaterLevel0Expected1,
    },
  ])

  // repeater level 0 item 1 template input
  const repeaterTemplateData = {templateInput: 'George'}
  result.push([
    'templateInput',
    6,
    {
      valueBeforeChange: 'template input',
      value: 'George',
      data: repeaterTemplateData,
      parentData: undefined,
      rootData: repeaterTemplateData,
    },
  ])

  // repeater level 0 item 1 parent template input
  const repeaterParentTemplateData = {templateInput: 'template input', parentTemplateInput: 'Olivia'}
  result.push([
    'parentTemplateInput',
    6,
    {
      valueBeforeChange: 'parent template value',
      value: 'Olivia',
      data: repeaterParentTemplateData,
      parentData: undefined,
      rootData: repeaterParentTemplateData,
    },
  ])

  // repeater level 0 item 1 input in parent template slot
  const repeaterInputInRootSlot1Data = getFormData(data => {
    data.rootRepeater[1].inputInRootSlot2 = 'Morales'
  })
  result.push([
    'inputInRootSlot2',
    1,
    {
      valueBeforeChange: 'input in root slot 2',
      value: 'Morales',
      index: 1,
      data: repeaterInputInRootSlot1Data.rootRepeater[1],
      parentData: repeaterInputInRootSlot1Data,
      rootData: repeaterInputInRootSlot1Data,
    },
  ])

  // repeater level 1 item 0
  const repeaterLevel1Expected0 = getFormData(data => {
    data.rootRepeater[0].childRepeater[0].childRepeaterInput = 'Katy'
  })
  result.push([
    'childRepeaterInput',
    0,
    {
      valueBeforeChange: 'child data',
      value: 'Katy',
      index: 0,
      data: repeaterLevel1Expected0.rootRepeater[0].childRepeater[0],
      parentData: repeaterLevel1Expected0.rootRepeater[0],
      rootData: repeaterLevel1Expected0,
    },
  ])

  // repeater level 1 item 1
  const repeaterLevel1Expected1 = getFormData(data => {
    data.rootRepeater[0].childRepeater[1].childRepeaterInput = 'Mary'
  })
  result.push([
    'childRepeaterInput',
    1,
    {
      valueBeforeChange: 'child data',
      value: 'Mary',
      index: 1,
      data: repeaterLevel1Expected1.rootRepeater[0].childRepeater[1],
      parentData: repeaterLevel1Expected1.rootRepeater[0],
      rootData: repeaterLevel1Expected1,
    },
  ])

  // repeater level 1 item 2
  const repeaterLevel1Expected2 = getFormData(data => {
    data.rootRepeater[0].childRepeater[2].childRepeaterInput = 'Doris'
  })
  result.push([
    'childRepeaterInput',
    2,
    {
      valueBeforeChange: 'child data',
      value: 'Doris',
      index: 2,
      data: repeaterLevel1Expected2.rootRepeater[0].childRepeater[2],
      parentData: repeaterLevel1Expected2.rootRepeater[0],
      rootData: repeaterLevel1Expected2,
    },
  ])

  // repeater level 1 item 3
  const repeaterLevel1Expected3 = getFormData(data => {
    data.rootRepeater[1].childRepeater[0].childRepeaterInput = 'Boris'
  })
  result.push([
    'childRepeaterInput',
    3,
    {
      valueBeforeChange: 'child data',
      value: 'Boris',
      index: 0,
      data: repeaterLevel1Expected3.rootRepeater[1].childRepeater[0],
      parentData: repeaterLevel1Expected3.rootRepeater[1],
      rootData: repeaterLevel1Expected3,
    },
  ])

  // repeater level 1 item 4
  const repeaterLevel1Expected4 = getFormData(data => {
    data.rootRepeater[1].childRepeater[1].childRepeaterInput = 'Whitney'
  })
  result.push([
    'childRepeaterInput',
    4,
    {
      valueBeforeChange: 'child data',
      value: 'Whitney',
      index: 1,
      data: repeaterLevel1Expected4.rootRepeater[1].childRepeater[1],
      parentData: repeaterLevel1Expected4.rootRepeater[1],
      rootData: repeaterLevel1Expected4,
    },
  ])

  // repeater level 1 item 5
  const repeaterLevel1Expected5 = getFormData(data => {
    data.rootRepeater[1].childRepeater[2].childRepeaterInput = 'Maria'
  })
  result.push([
    'childRepeaterInput',
    5,
    {
      valueBeforeChange: 'child data',
      value: 'Maria',
      index: 2,
      data: repeaterLevel1Expected5.rootRepeater[1].childRepeater[2],
      parentData: repeaterLevel1Expected5.rootRepeater[1],
      rootData: repeaterLevel1Expected5,
    },
  ])

  // repeater level 1 item 5 template input
  const childRepeaterTemplateData = {templateInput: 'Tammy'}
  result.push([
    'templateInput',
    8,
    {
      valueBeforeChange: 'template input',
      value: 'Tammy',
      data: childRepeaterTemplateData,
      parentData: undefined,
      rootData: childRepeaterTemplateData,
    },
  ])

  // repeater level 1 item 5 parent template input
  const childRepeaterParentTemplateData = {templateInput: 'template input', parentTemplateInput: 'Elena'}
  result.push([
    'parentTemplateInput',
    8,
    {
      valueBeforeChange: 'parent template value',
      value: 'Elena',
      data: childRepeaterParentTemplateData,
      parentData: undefined,
      rootData: childRepeaterParentTemplateData,
    },
  ])

  // repeater level 1 item 5 input in parent template slot
  const childRepeaterInputInRootSlot1Data = getFormData(data => {
    data.rootRepeater[1].childRepeater[2].inputInRootSlot3 = 'James'
  })
  result.push([
    'inputInRootSlot3',
    5,
    {
      valueBeforeChange: 'input in root slot 3',
      value: 'James',
      index: 2,
      data: childRepeaterInputInRootSlot1Data.rootRepeater[1].childRepeater[2],
      parentData: childRepeaterInputInRootSlot1Data.rootRepeater[1],
      rootData: childRepeaterInputInRootSlot1Data,
    },
  ])

  return result
}

describe('ActionEventArgs data tests', function () {
  // The purpose of this test is to check that ActionEventArgs contains the correct index, data, parentData and rootData fields.
  // The test input is three forms: a main form, a parent template, and a child template with slots.
  // The main form contains a repeater with two elements, which has a child repeater with three elements.
  // Each repeater contains a template. Each layer of the form has input fields whose values change during the test.
  it.each(createActionArgsData())(
    'ActionEventArgs of "%s[%i]" should have correct index, data, parentData, rootData',
    async (dataTestId, index, expected) => {
      let actualActionEventArgs: ActionEventArgs | undefined

      const actions: FormViewerProps['actions'] = {
        checkDataProps: (e: ActionEventArgs) => {
          actualActionEventArgs = e
        },
      }

      const {findAllByTestId, findAllByDisplayValue} = render(<FormViewer getForm={getForm} actions={actions} view={view} />)

      // check that the form is rendered
      expect(await findAllByDisplayValue(expected.valueBeforeChange)).not.toHaveLength(0)

      const formInputs = await findAllByTestId(dataTestId)
      const formInput = formInputs[index]
      expect(formInput).not.toBeUndefined()
      expect(formInput).toHaveValue(expected.valueBeforeChange)

      fireEvent.change(formInput, {target: {value: expected.value}})

      await waitFor(() => expect(actualActionEventArgs).not.toBeUndefined())
      if (!actualActionEventArgs) {
        throw new Error('actualActionEventArgs is undefined')
      }

      expect(typeof actualActionEventArgs.index).toBe(typeof expected.index)
      if (typeof expected.index === 'number') {
        expect(actualActionEventArgs.index).toEqual(expected.index)
      }

      expect(actualActionEventArgs.value).toEqual(expected.value)
      expect(JSON.stringify(actualActionEventArgs.data)).toEqual(JSON.stringify(expected.data))

      if (typeof expected.parentData === 'undefined') {
        expect(typeof actualActionEventArgs.parentData).toBe('undefined')
      } else {
        expect(JSON.stringify(actualActionEventArgs.parentData)).toEqual(JSON.stringify(expected.parentData))
      }

      expect(JSON.stringify(actualActionEventArgs.rootData)).toEqual(JSON.stringify(expected.rootData))

      const {sender} = actualActionEventArgs
      // check that the sender index is the same as the expected index
      expect(sender.nearestIndex).toBe(actualActionEventArgs.index)
      // if the parentData is not defined, check that the sender parentData is undefined
      if (typeof expected.parentData === 'undefined') {
        expect(sender.parentData).toBeUndefined()
      }
      expect(JSON.stringify(sender.rootData)).toBe(JSON.stringify(actualActionEventArgs.rootData))
    }
  )

  it('The Set data method should change the data in the corresponding fields', async function () {
    const getForm = () => JSON.stringify(changeDataForm)
    const initialValue = 'Claude'
    const {findByTestId} = render(<FormViewer getForm={getForm} view={view} initialData={{name: initialValue}} />)

    expect(await findByTestId('input1')).toHaveValue(initialValue)
    expect(await findByTestId('input2')).toHaveValue(initialValue)

    fireEvent.click(await findByTestId('changeDataButton'))

    const expectedValue = 'Claude changed'
    expect(await findByTestId('input1')).toHaveValue(expectedValue)
    expect(await findByTestId('input2')).toHaveValue(expectedValue)
  })

  it('The information about the row is passed to the action event args', async () => {
    const models = [...rsuiteModels, testTable.build().model, simpleCell.build().model]
    const view = createView(models)

    const tableData = [
      {key: 1, value: 'Claude'},
      {key: 2, value: 'Margo'},
      {key: 3, value: 'George'},
    ] as const

    const initialData = {tableData}

    const actionsResult: ActionEventArgs[] = []

    const actions = {
      handleCellClick: (e: ActionEventArgs) => {
        actionsResult.push(e)
      },
    }

    const {findByTestId} = renderViewerForm(view, rowInActionEventArgsForm, {initialData, actions})

    for (let i = 0; i < tableData.length; i++) {
      const cell = await findByTestId(`cell-${i}-value`)
      const span = cell.querySelector('span')
      if (span) {
        fireEvent.click(span)
        expect(span).toHaveTextContent(tableData[i].value)
      }
    }

    expect(actionsResult.length).toEqual(3)

    actionsResult.forEach(({cellInfo}, resultIndex) => {
      expect(cellInfo?.dataKey).toEqual('value')
      expect(cellInfo?.rowIndex).toEqual(resultIndex)
      expect(cellInfo?.rowData).toStrictEqual(tableData[resultIndex])
    })
  })
})
