import styled from '@emotion/styled'
import {Close, Plus} from '@rsuite/icons'
import React, {FormEventHandler, useEffect, useState} from 'react'
import {Button, Form, Table, TableProps} from 'rsuite'
import {RowDataType} from 'rsuite-table/lib/@types/common'
import {ActionCell} from './CustomCells'

const {ErrorMessage} = Form

const {Column, HeaderCell} = Table

export interface EditableTableProps extends TableProps {
  data: RowDataType[];
  maxRows?: number
  onChange?: FormEventHandler<HTMLElement>
  columns?: JSX.Element[]
  label?: string
  errorMessage?: string
}

export interface EditableTableState {
  autoHeight?: boolean
  maxHeight?: number
}

export const EditableTable = (props: EditableTableProps) => {
  const [state, setState] = useState<EditableTableState>({})
  const [shouldScroll, setShouldScroll] = useState(false)

  const {data = [], onChange, columns, label, errorMessage, ...tableProps} = props
  const {autoHeight, maxHeight} = state

  const headerHeight = props.headerHeight ?? 40
  const rowHeight = (props.rowHeight as number) ?? 46
  const maxRows = props.maxRows ?? 5

  const onAddColumn = () => {
    onChange?.([...data, {}] as any)
    setShouldScroll(true)
    updateHeight()
  }

  const onRemoveColumn = (index: any) => {
    data.splice(index, 1)
    onChange?.(data as any)
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

  const prepareColumns = () => columns?.map(col => React.cloneElement(col, {
    onChange: () => onChange?.([...data] as any)
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

  return (<>
    {!!label && <label>{label}</label>}
    <STable data={data}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            height={maxHeight}
            autoHeight={autoHeight}
            shouldUpdateScroll={shouldUpdateScroll}
            {...tableProps}>
      {prepareColumns()}
      <Column width={45}>
        <HeaderCell>
          <div/>
        </HeaderCell>
        <ActionCell onAction={onRemoveColumn} icon={() => <Close/>}/>
      </Column>
    </STable>
    {!!errorMessage && <ErrorMessage show={!!errorMessage} placement="bottomStart">
      {errorMessage}
    </ErrorMessage>}
    <Button appearance="default" size="sm" onClick={onAddColumn} style={{marginTop: 10}} block>
      <Plus/>
    </Button>
  </>)
}

const STable = styled(Table)`
  .rs-table-cell, .rs-table-row {
    background-color: transparent !important;
  }
`
