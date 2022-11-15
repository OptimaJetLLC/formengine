import styled from '@emotion/styled'
import {IconProps} from '@rsuite/icons/lib/Icon'
import React from 'react'
import {IconButton, Input, Table} from 'rsuite'
import {InnerCellProps} from 'rsuite-table/lib/Cell'

const {Cell} = Table

const InputCell = ({rowData, dataKey, rowIndex, ...props}: InputCellProps) => {
  const onChange = (value: any) => {
    rowData[dataKey] = value
    props.onChange?.(value, dataKey, rowIndex)
  }
  return (
    <SCell {...props}>
      <Input value={rowData[dataKey]} onChange={onChange} size="sm"/>
    </SCell>
  )
}

const ActionCell = ({rowData, rowIndex, onAction, icon, ...props}: ActionCellProps) => {
  return (
    <SCell {...props}>
      <IconButton
        appearance="subtle" size="sm"
        onClick={() => onAction(rowIndex)}
        icon={icon()}
      />
    </SCell>
  )
}

const SCell = styled(Cell)`
  padding: 0;

  & .rs-table-cell-content {
    padding: 9px 3px;
  }
`

interface InputCellProps extends InnerCellProps {
  onChange?: (value?: any, dataKey?: string, rowIndex?: number) => void
  dataKey: string
}

interface ActionCellProps extends InnerCellProps {
  onAction: (rowIndex?: number) => void
  icon: () => React.ReactElement<IconProps>
}

export {InputCell, ActionCell}
