import {boolean, define, node, oneOf, string, useBuilderComponent} from '@react-form-builder/core'
import type {ColumnGroupProps} from 'rsuite'
import {Table} from 'rsuite'
import {nonNegNumber} from './commonProperties'
import {createComponentStore} from './createComponentStore'
import {getRsColumnComponentStore} from './getRsColumnComponentStore'
import style from './Table.module.css'
import {tableComponentsCategory} from './tableComponentsCategory'
import {rsColumnGroupTypeName} from './typeNames'

const ColumnGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5" rx="1" />
    <rect x="3" y="3" width="18" height="6" fill="currentColor" fillOpacity="0.1" rx="1" />
    <line x1="9" y1="9" x2="9" y2="21" stroke="currentColor" strokeWidth="0.8" />
    <line x1="15" y1="9" x2="15" y2="21" stroke="currentColor" strokeWidth="0.8" />
    <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

const {ColumnGroup} = Table

const RsBuilderColumnGroup = (props: ColumnGroupProps) => {
  return <div className={`${style.row} ${style.nestedRow}`}>{props.children}</div>
}

const RsColumnGroup = (props: ColumnGroupProps) => {
  return useBuilderComponent(RsBuilderColumnGroup, ColumnGroup, props)
}

const getRsColumnGroupComponentStore = () => {
  const result = createComponentStore(rsColumnGroupTypeName, '1')
  result.children = [getRsColumnComponentStore('1'), getRsColumnComponentStore('2')]
  return result
}

const initialJson = JSON.stringify(getRsColumnGroupComponentStore())

export const rsColumnGroup = define(RsColumnGroup, rsColumnGroupTypeName)
  .name('Column group')
  .category(tableComponentsCategory)
  .icon(ColumnGroupIcon)
  .initialJson(initialJson)
  .props({
    align: oneOf('left', 'center', 'right').withEditorProps({creatable: false}),
    fixed: boolean,
    groupHeaderHeight: nonNegNumber,
    header: string.default('Group'),
    verticalAlign: oneOf('top', 'middle', 'bottom').withEditorProps({creatable: false}),
    children: node,
  })
  .hideTooltipEditor()
  .hideActionEditors()
