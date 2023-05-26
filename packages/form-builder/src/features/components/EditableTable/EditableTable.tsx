import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {Close, Plus} from '@rsuite/icons'
import {cloneElement, FormEventHandler, useEffect, useState} from 'react'
import {Button, Form, Table, TableProps} from 'rsuite'
import type {RowDataType} from 'rsuite-table/lib/@types/common'
import {ActionCell} from './CustomCells'

const {ErrorMessage} = Form

const {Column, HeaderCell} = Table

export interface EditableTableProps extends TableProps<any, any> {
  data: RowDataType[];
  maxRows?: number
  onChange?: FormEventHandler<HTMLElement>
  columns?: JSX.Element[]
  label?: string
  errorMessage?: string
  autoAdd?: boolean
  hideHeader?: boolean
}

export interface EditableTableState {
  autoHeight?: boolean
  maxHeight?: number
}

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
    ...tableProps
  } = props
  const {autoHeight, maxHeight} = state

  const headerHeight = hideHeader ? 0 : props.headerHeight ?? 40
  const rowHeight = (props.rowHeight as number) ?? 46
  const maxRows = props.maxRows ?? 5

  const handleChange = (data: any) => {
    if (autoAdd) {
      const lastItem = data[data.length - 1]
      if (!lastItem || Object.values(lastItem).some(val => val)) data.push({})
    }
    onChange?.(data)
  }

  const onAddColumn = () => {
    handleChange?.([...data, {}])
    setShouldScroll(true)
    updateHeight()
  }

  const onRemoveColumn = (index: any) => {
    data.splice(index, 1)
    handleChange?.(data)
    updateHeight()
  }

  const updateHeight = () => {
    const emptyHeight = props.renderEmpty ? headerHeight + rowHeight : 0
    const maxHeight = headerHeight + rowHeight * maxRows

    setState({
      autoHeight: data.length <= maxRows,
      maxHeight: data.length > maxRows ? maxHeight : emptyHeight
    })
  }

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
