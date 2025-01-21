import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {Close, Plus} from '@rsuite/icons'
import type {FormEventHandler, JSX} from 'react'
import {cloneElement, useCallback, useEffect, useState} from 'react'
import type {TableProps} from 'rsuite'
import {Button, Form, Table} from 'rsuite'
import type {RowDataType} from 'rsuite-table/lib'
import {ActionCell} from './CustomCells'

const {ErrorMessage} = Form

const {Column, HeaderCell} = Table

/**
 * The React component properties for the {@link EditableTable} component.
 */
export interface EditableTableProps extends TableProps<any, any> {
  /**
   * The table data.
   */
  data: RowDataType[];
  /**
   * Maximum number of rows to be displayed.
   */
  maxRows?: number
  /**
   * The callback function called when data in the table is changed.
   */
  onChange?: FormEventHandler<HTMLElement>
  /**
   * The columns of the table.
   */
  columns?: JSX.Element[]
  /**
   * The table label.
   */
  label?: string
  /**
   * The error message.
   */
  errorMessage?: string
  /**
   * Flag, if true, one new row will be automatically added when editing the last row of the table, false otherwise.
   */
  autoAdd?: boolean
  /**
   * Flag, if true then the table header will be hidden, false otherwise.
   */
  hideHeader?: boolean
  /**
   * The callback function called when data in the table is removed.
   */
  onRemove?: (index: number) => void
  /**
   * The callback function called when data in the table is added.
   */
  onAdd?: (index: number) => void
}

/**
 * The state of the {@link EditableTable} component.
 */
export interface EditableTableState {
  /**
   * Flag, if true, the table height will be calculated automatically, false otherwise.
   */
  autoHeight?: boolean
  /**
   * The maximum height of the table.
   */
  maxHeight?: number
}

/**
 * The React component that displays the table with editable cells. **Internal use only.**
 * @param props the React component properties.
 * @returns the React element.
 */
export const EditableTable = (props: EditableTableProps) => {
  const [state, setState] = useState<EditableTableState>({})
  const [shouldScroll, setShouldScroll] = useState(false)

  const {
    data = [],
    onChange,
    columns,
    label,
    errorMessage,
    autoAdd,
    hideHeader,
    onAdd,
    onRemove,
    ...tableProps
  } = props
  const {autoHeight, maxHeight} = state

  const headerHeight = hideHeader ? 0 : props.headerHeight ?? 40
  const rowHeight = (props.rowHeight as number) ?? 46
  const maxRows = props.maxRows ?? 5
  const shorterMax = data.length <= maxRows
  const emptyHeight = props.renderEmpty ? headerHeight + rowHeight : 0
  const totalMaxHeight = headerHeight + rowHeight * maxRows
  const adjustedHeight = data.length > maxRows ? totalMaxHeight : emptyHeight

  const handleChange = useCallback((data: any) => {
    if (autoAdd) {
      const lastItem = data[data.length - 1]
      if (!lastItem || Object.values(lastItem).some(val => val)) data.push({})
    }
    onChange?.(data)
  }, [autoAdd, onChange])

  const updateHeight = useCallback(() => {
    setState({
      autoHeight: shorterMax,
      maxHeight: adjustedHeight
    })
  }, [adjustedHeight, shorterMax])

  const onAddColumn = useCallback(() => {
    handleChange?.([...data, {}])
    setShouldScroll(true)
    updateHeight()
    onAdd?.(data.length)
  }, [data, handleChange, updateHeight, onAdd])

  const onRemoveColumn = useCallback((index: any) => {
    data.splice(index, 1)
    handleChange?.(data)
    updateHeight()
    onRemove?.(index)
  }, [data, handleChange, updateHeight, onRemove])

  const prepareColumns = () => columns?.map(col => cloneElement(col, {
    onChange: () => handleChange?.([...data] as any)
  }))

  const shouldUpdateScroll = () => {
    const scrollPos: { y?: number } = {}
    if (shouldScroll) {
      scrollPos.y = Number.MAX_SAFE_INTEGER
      setShouldScroll(false)
    }
    return scrollPos
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateHeight, [])

  return (<div>
    {!!label && <label>{label}</label>}
    <STable data={data}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            height={maxHeight}
            autoHeight={autoHeight}
            shouldUpdateScroll={shouldUpdateScroll}
            className={cx({hideHeader})}
            {...tableProps}>
      {prepareColumns()}
      <Column width={34}>
        <HeaderCell>
          <div/>
        </HeaderCell>
        <ActionCell onAction={onRemoveColumn} icon={() => <Close/>}/>
      </Column>
    </STable>
    {!!errorMessage && <ErrorMessage show={!!errorMessage} placement="bottomStart">
      {errorMessage}
    </ErrorMessage>}
    {!autoAdd &&
      <Button appearance="default" size="sm" onClick={onAddColumn} style={{marginTop: 10}} block>
        <Plus/>
      </Button>
    }
  </div>)
}

const STable = styled(Table)`
  .rs-table-cell, .rs-table-row {
    background-color: transparent !important;
  }

  &.hideHeader {
    margin-bottom: -40px;

    .rs-table-header-row-wrapper {
      display: none !important;
    }

    .rs-table-body-row-wrapper {
      top: 0 !important;
    }
  }
`
