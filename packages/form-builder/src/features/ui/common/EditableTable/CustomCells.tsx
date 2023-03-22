import styled from '@emotion/styled'
import {IconProps} from '@rsuite/icons/lib/Icon'
import {LabeledValue} from 'fb-core'
import {ReactElement} from 'react'
import {AutoComplete, Checkbox, IconButton, Input, InputPicker, Table} from 'rsuite'
import {InnerCellProps} from 'rsuite-table/lib/Cell'
import {compactInput} from '../styles'

const {Cell} = Table

export const InputCell = ({rowData, dataKey, rowIndex, ...props}: InputCellProps) => {
  const onChange = (value: any) => {
    rowData[dataKey] = value
    props.onChange?.(value, dataKey, rowIndex)
  }
  return (
    <SCell {...props}>
      <Input value={rowData[dataKey] ?? ''} onChange={onChange} size="sm"/>
    </SCell>
  )
}

export const CheckCell = ({rowData, dataKey, rowIndex, onChange, ...props}: InputCellProps) => {
  const handleChange = (value: any, checked: boolean) => {
    rowData[dataKey] = checked
    onChange?.(checked, dataKey, rowIndex)
  }
  return (
    <SCell {...props}>
      <SCheckbox inline checked={rowData[dataKey] ?? false} onChange={handleChange}/>
    </SCell>
  )
}

export const SelectCell = ({rowData, dataKey, rowIndex, options, onChange, ...props}: SelectCellProps) => {
  const handleChange = (value: any) => {
    rowData[dataKey] = value
    onChange?.(value, dataKey, rowIndex)
  }
  return (
    <SCell {...props}>
      <InputPicker value={rowData[dataKey] ?? ''} data={options} onChange={handleChange}
                   cleanable={false} creatable={true} block size="sm" placement={'auto'}
      />
    </SCell>
  )
}

export const AutocompleteCell = ({rowData, dataKey, rowIndex, options, onChange, placeholder, ...props}: SelectCellProps) => {
  const handleChange = (value: any) => {
    rowData[dataKey] = value
    onChange?.(value, dataKey, rowIndex)
  }
  return (
    <SCell {...props}>
      <AutoComplete value={rowData[dataKey] ?? ''} data={options} onChange={handleChange}
                    size="sm" placement={'auto'} className={compactInput} placeholder={placeholder}
      />
    </SCell>
  )
}

export const ActionCell = ({rowData, rowIndex, onAction, icon, ...props}: ActionCellProps) => {
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

const SCheckbox = styled(Checkbox)`
  & .rs-checkbox-wrapper {
    left: 4px;
    top: 6px;
  }
`

interface InputCellProps extends InnerCellProps {
  onChange?: (value?: any, dataKey?: string, rowIndex?: number) => void
  dataKey: string
}

interface SelectCellProps extends InputCellProps {
  options: LabeledValue[]
}

interface ActionCellProps extends InnerCellProps {
  onAction: (rowIndex?: number) => void
  icon: () => ReactElement<IconProps>
}
