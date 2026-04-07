import {define, stringNode, useBuilderComponent} from '@react-form-builder/core'
import {Table} from 'rsuite'
import type {HeaderCellProps, RowDataType, RowKeyType} from 'rsuite/esm/Table'
import {tableComponentsCategory} from './tableComponentsCategory'
import {rsHeaderCellTypeName} from './typeNames'

const HeaderCellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="4" y="6" width="16" height="12" stroke="currentColor" strokeWidth="1.5" rx="1"/>
    <rect x="4" y="6" width="16" height="12" fill="currentColor" fillOpacity="0.1" rx="1"/>
    <text x="12" y="13" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold"
          textAnchor="middle" fill="currentColor" dominantBaseline="middle">H
    </text>
  </svg>
)

const {HeaderCell} = Table

const RsBuilderHeaderCell = (props: HeaderCellProps<RowDataType, RowKeyType>) => {
  return <div className={props.className}>{props.children}</div>
}

const RsViewerHeaderCell = (props: HeaderCellProps<RowDataType, RowKeyType>) => {
  return <HeaderCell {...props}/>
}

const RsHeaderCell = (props: HeaderCellProps<RowDataType, RowKeyType>) => {
  const Component = useBuilderComponent(RsBuilderHeaderCell, RsViewerHeaderCell)
  return <Component {...props}/>
}

export const rsHeaderCell = define(RsHeaderCell, rsHeaderCellTypeName)
  .name('Header cell')
  .category(tableComponentsCategory)
  .icon(HeaderCellIcon)
  .props({
    children: stringNode,
  })
  .showInlineStylesEditor(true)
  .showClassNameStylesEditor(false)
  .hideTooltipEditor()
  .hideActionEditors()
