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
  shouldUpdateScroll?: boolean
}

export const EditableTable = (props: EditableTableProps) => {
  const [state, setState] = useState<EditableTableState>({})

  const {data, onChange, columns, label, errorMessage, ...tableProps} = props
  const {autoHeight, maxHeight, shouldUpdateScroll} = state

  const headerHeight = props.headerHeight ?? 40
  const rowHeight = (props.rowHeight as number) ?? 46
  const maxRows = props.maxRows ?? 4

  const onAddColumn = () => onChange?.([
    ...(data ?? []),
    {value: '', label: ''}
  ] as any)

  const onRemoveColumn = (index: any) => {
    data.splice(index, 1)
    onChange?.([...data] as any)
  }

  const updateHeight = () => {
    const emptyHeight = props.renderEmpty ? headerHeight + rowHeight : 0
    const maxHeight = (props.headerHeight ?? 0) + rowHeight * maxRows

    setState({
      autoHeight: data.length <= maxRows,
      maxHeight: data.length > maxRows ? maxHeight : emptyHeight
    })
  }

  const prepareColumns = () => columns?.map(col => React.cloneElement(col, {
    onChange: () => onChange?.([...data] as any)
  }))

  const calcShouldUpdateScroll = () => {
    const scrollPos: { y?: number } = {}
    if (shouldUpdateScroll) {
      setState({...state, shouldUpdateScroll: false})
      scrollPos.y = Number.MAX_SAFE_INTEGER
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
            shouldUpdateScroll={calcShouldUpdateScroll}
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
