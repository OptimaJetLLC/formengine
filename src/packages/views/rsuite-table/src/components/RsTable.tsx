import type {ComponentData} from '@react-form-builder/core'
import {
  array,
  boolean,
  define,
  event,
  isNull,
  nameObservable,
  needRender,
  node,
  number,
  oneOf,
  string,
  useBuilderComponent,
  useComponentData
} from '@react-form-builder/core'
import {makeAutoObservable} from 'mobx'
import type {ComponentProps, ReactNode} from 'react'
import {createElement, useMemo} from 'react'
import {Table} from 'rsuite'
import {createComponentStore} from './createComponentStore'
import {getRsColumnComponentStore} from './getRsColumnComponentStore'
import {tableComponentsCategory} from './tableComponentsCategory'
import {rsCellTypeName, rsColumnGroupTypeName, rsColumnTypeName, rsHeaderCellTypeName, rsTableTypeName} from './typeNames'

const TableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5" rx="1"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="0.8"/>
    <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="0.8"/>
    <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="0.8"/>
  </svg>
)

const {HeaderCell, Cell, ColumnGroup} = Table

interface RsTableProps extends ComponentProps<typeof Table> {
  columns?: ReactNode[]
}

const renderComponentData = (item: ComponentData) => {
  const {children, ...props} = item.componentState.get
  return createElement(item.model.component, props, children)
}

const getColumnChildren = (componentData: ComponentData) => {
  // Column must have exactly 2 children
  const result = {
    headerCell: <HeaderCell>Header</HeaderCell>,
    cell: <Cell dataKey={`new Date().getTime()`}/>,
  }

  componentData.children.forEach(item => {
    const element = renderComponentData(item)
    if (item.model.typeName === rsHeaderCellTypeName) result.headerCell = element
    if (item.model.typeName === rsCellTypeName) result.cell = element
  })

  return result
}

class TableColumns {
  constructor(readonly componentData: ComponentData) {
    makeAutoObservable(this, undefined, {name: nameObservable('TableColumns', {key: componentData.key})})
  }

  get children() {
    const {children} = this.componentData
    return this.getChildren(children)
  }

  private getChildren(children?: ComponentData[]) {
    if (!children || !children.length) return null

    return children
      .filter(item => {
        const typeName = item.model.typeName
        return typeName === rsColumnGroupTypeName || typeName === rsColumnTypeName
      })
      .map((item) => {
        if (!needRender(item.store, item.dataRoot)) return null
        if (item.model.typeName === rsColumnGroupTypeName) return this.getColumnGroupElement(item)
        return this.getColumnElement(item)
      }).filter(item => !isNull(item))
  }

  private getColumnGroupElement(item: ComponentData) {
    if (!item.children || !item.children.length) return null

    const {key, ...otherProps} = item.componentState.ownProps
    const children = this.getChildren(item.children)

    if (!children) return null

    return <ColumnGroup key={key} {...otherProps}>
      {children}
    </ColumnGroup>
  }

  private getColumnElement(item: ComponentData) {
    const columnChildren = getColumnChildren(item)
    const {key, ...otherProps} = item.componentState.ownProps
    const ColumnComponent = item.model.component
    return <ColumnComponent key={key} {...otherProps}>
      {columnChildren.headerCell}
      {columnChildren.cell}
    </ColumnComponent>
  }
}

const rsBuilderTableStyle = {
  display: 'flex'
}

const RsBuilderTable = (props: RsTableProps) => {
  return <div style={rsBuilderTableStyle}>{props.children as ReactNode}</div>
}

const RsViewerTable = (props: RsTableProps) => {
  const componentData = useComponentData()
  const columns = useMemo(() => (new TableColumns(componentData)), [componentData])

  const {children, ...otherProps} = props

  return <Table {...otherProps}>{columns.children}</Table>
}

const RsTable = (props: RsTableProps) => {
  const Component = useBuilderComponent(RsBuilderTable, RsViewerTable)
  return <Component {...props}/>
}

const getRsTableComponentStore = () => {
  const result = createComponentStore(rsTableTypeName, '1')
  result.children = [
    getRsColumnComponentStore('1'),
    getRsColumnComponentStore('2'),
    getRsColumnComponentStore('3'),
  ]
  return result
}

const initialJson = JSON.stringify(getRsTableComponentStore())

export const rsTable = define(RsTable, rsTableTypeName)
  .name('Table')
  .category(tableComponentsCategory)
  .icon(TableIcon)
  .initialJson(initialJson)
  .props({
    affixHeader: boolean,
    affixHorizontalScrollbar: boolean,
    autoHeight: boolean,
    bordered: boolean,
    cellBordered: boolean,
    children: node,
    data: array.valued.setup({editor: 'object'}),
    defaultSortType: oneOf('desc', 'asc').withEditorProps({creatable: false}),
    fillHeight: boolean,
    headerHeight: number.default(40),
    height: number.default(200),
    hover: boolean.default(true),
    loading: boolean,
    maxHeight: number,
    minHeight: number,
    onRowClick: event,
    onScroll: event,
    onSortColumn: event,
    rowClassName: string,
    rowHeight: number.default(46),
    rowKey: string.default('key'),
    shouldUpdateScroll: boolean,
    showHeader: boolean,
    sortColumn: string,
    sortType: oneOf('desc', 'asc'),
    virtualized: boolean,
    width: number,
    wordWrap: oneOf('break-all', 'break-word', 'keep-all').withEditorProps({creatable: false}),
  })
  .skipChildrenDuringFieldCollection()
  .overrideEventHandlers({})
