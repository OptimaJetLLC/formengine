import {boolean, define, event, fn, node, number, oneOf, useBuilderComponent} from '@react-form-builder/core'
import type {ColumnProps} from 'rsuite'
import {Table} from 'rsuite'
import {nonNegNumber} from './commonProperties'
import {getRsColumnComponentStore} from './getRsColumnComponentStore'
import style from './Table.module.css'
import {tableComponentsCategory} from './tableComponentsCategory'
import {rsColumnTypeName} from './typeNames'

const ColumnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="8" y="3" width="8" height="18" stroke="currentColor" strokeWidth="1.5" rx="1" />
    <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="0.8" />
    <line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="0.8" />
  </svg>
)

const {Column} = Table

const RsBuilderColumn = (props: ColumnProps<any>) => {
  return <div className={style.column}>{props.children}</div>
}

const RsColumn = (props: ColumnProps<any>) => {
  return useBuilderComponent(RsBuilderColumn, Column, props)
}

const rowSpanBeginContextLine = `/**
 * @param {any} rowData
 * @return {number}
 */
function rowSpan(rowData) {`

const initialJson = JSON.stringify(getRsColumnComponentStore())

export const rsColumn = define(RsColumn, rsColumnTypeName)
  .name('Column')
  .category(tableComponentsCategory)
  .icon(ColumnIcon)
  .initialJson(initialJson)
  .props({
    align: oneOf('left', 'center', 'right').withEditorProps({creatable: false}),
    colSpan: number,
    fixed: boolean,
    flexGrow: number,
    fullText: boolean,
    minWidth: number,
    onResize: event,
    resizable: boolean,
    rowSpan: fn(rowSpanBeginContextLine),
    sortable: boolean,
    verticalAlign: oneOf('top', 'middle', 'bottom'),
    width: nonNegNumber.default(100),
    children: node,
  })
  .hideTooltipEditor()
