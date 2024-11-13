import type {ComponentData} from '../../../utils/contexts/ComponentDataContext'
import {RepeaterFormContext} from '../../validation/utils/RepeaterField'
import {ActionDefinition} from '../types'

const parseRowData = (data?: string) => {
  if (!data) return
  try {
    return JSON.parse(data)
  } catch (ignored) {
    return
  }
}

const addRow = (data: Record<string, any>, repeaterKey: string, maxItems?: number,
                rowValue?: string, rowIndex?: number) => {
  const repeaterData = data[repeaterKey] ?? []
  if (typeof maxItems === 'number' && repeaterData.length >= maxItems) return

  const rowData = parseRowData(rowValue) ?? {}
  const modifiedData = [...repeaterData]
  typeof rowIndex === 'number'
    ? modifiedData.splice(rowIndex, 0, rowData)
    : modifiedData.push(rowData)
  data[repeaterKey] = modifiedData
}

const removeRow = (data: Record<string, any>, repeaterKey: string, index: number,
                   minItems?: number) => {
  const repeaterData = data[repeaterKey]
  if (!Array.isArray(repeaterData)) return
  if (typeof minItems === 'number' && repeaterData.length <= minItems) return

  const modifiedData = [...repeaterData]
  modifiedData.splice(index, 1)
  data[repeaterKey] = modifiedData
}

const getParentRepeaterKey = (componentData: ComponentData) => {
  const dataRootProvider = componentData.dataRootProvider
  if (dataRootProvider instanceof RepeaterFormContext) {
    return dataRootProvider.repeaterField.componentStore.key
  }
}

export const addRowAction = ActionDefinition.functionalAction(((e, args) => {
  if (args.dataKey) {
    addRow(e.data, args.dataKey, args.max, args.rowData, args.index)
    return
  }

  const repeaterKey = getParentRepeaterKey(e.sender)
  if (repeaterKey && e.parentData) {
    addRow(e.parentData, repeaterKey, args.max, args.rowData, args.index)
  }
}), {
  dataKey: 'string',
  rowData: 'string',
  index: 'number',
  max: 'number',
})

export const removeRowAction = ActionDefinition.functionalAction(((e, args) => {
  // delete the last row by default
  const index = args.index ?? e.index ?? -1

  if (args.dataKey) {
    removeRow(e.data, args.dataKey, index, args.min)
    return
  }

  const repeaterKey = getParentRepeaterKey(e.sender)
  if (repeaterKey && e.parentData) {
    removeRow(e.parentData, repeaterKey, index, args.min)
  }
}), {
  dataKey: 'string',
  index: 'number',
  min: 'number',
})
