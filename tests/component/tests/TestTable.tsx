import type {CellInfo} from '@react-form-builder/core'
import {array, CellInfoContextProvider, define, event, node, string} from '@react-form-builder/core'
import type {MouseEvent, ReactNode} from 'react'
import {useCallback, useMemo} from 'react'

interface TableRowProps {
  cellChild?: ReactNode
  rowData: any
  rowIndex: number
  onRowClick?: (e: MouseEvent<HTMLDivElement>, row: object, index: number) => void
}

const TableRow = (props: TableRowProps) => {
  const {cellChild, rowData, rowIndex, onRowClick} = props

  const handleRowClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      onRowClick?.(e, rowData, rowIndex)
    },
    [rowIndex, onRowClick, rowData]
  )

  const cells = useMemo(() => {
    return Object.entries(rowData).map(([dataKey]) => {
      const contextValue: CellInfo = {dataKey, rowIndex, rowData} as const
      return (
        <CellInfoContextProvider key={dataKey} value={contextValue}>
          <div data-testid={`cell-${rowIndex}-${dataKey}`}>{cellChild}</div>
        </CellInfoContextProvider>
      )
    })
  }, [rowData, rowIndex, cellChild])

  const rowContext = useMemo(() => {
    return {rowIndex, rowData} as const
  }, [rowData, rowIndex])

  return (
    <CellInfoContextProvider value={rowContext}>
      <div data-testid={`row-${rowIndex}`} onClick={handleRowClick}>
        {cells}
      </div>
    </CellInfoContextProvider>
  )
}

interface TestTableProps {
  cellChild?: ReactNode
  data?: object[]
  onRowClick?: (e: MouseEvent<HTMLDivElement>, row: object, index: number) => void
}

const TestTable = (props: TestTableProps) => {
  const {data, cellChild, onRowClick, ...otherProps} = props

  const rows = useMemo(() => data ?? [], [data])

  const children = useMemo(() => {
    return rows.map((rowData, rowIndex) => {
      return <TableRow key={rowIndex} cellChild={cellChild} rowData={rowData} rowIndex={rowIndex} onRowClick={onRowClick} />
    })
  }, [rows, cellChild, onRowClick])

  return <div {...otherProps}>{children}</div>
}

export const testTable = define(TestTable, 'TestTable')
  .name('TestTable')
  .props({
    data: array.valued,
    cellChild: node,
    onRowClick: event,
  })
  .overrideEventHandlers({})
  .skipChildrenDuringFieldCollection()

interface SimpleCellProps {
  children?: ReactNode
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void
}

const SimpleCell = ({children, onClick}: SimpleCellProps) => {
  const data = useMemo(() => {
    return typeof children === 'string' ? children : JSON.stringify(children)
  }, [children])
  return <span onClick={onClick}>{data}</span>
}

export const simpleCell = define(SimpleCell, 'SimpleCell').name('SimpleCell').props({
  children: string.dataBound,
  onClick: event,
})
