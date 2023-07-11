import styled from '@emotion/styled'
import {IconProps} from '@rsuite/icons/lib/Icon.js'
import {ReactElement} from 'react'
import {Checkbox, IconButton, Input, InputPicker, Table} from 'rsuite'
import {InnerCellProps} from 'rsuite-table/lib/Cell.js'
import {LabeledValue} from '../../annotation/utils/LabeledValue'

const {Cell} = Table

/**
 * The React component that displays the table cell with the input.
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.dataKey the key name in {@link props.rowData}.
 * @param props.rowIndex the row index.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
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

/**
 * The React component that displays the table cell with the checkbox.
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.dataKey the key name in {@link props.rowData}.
 * @param props.rowIndex the row index.
 * @param props.onChange the onChange event of the checkbox.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
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

/**
 * The React component that displays the table cell with the select input.
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.dataKey the key name in {@link props.rowData}.
 * @param props.rowIndex the row index.
 * @param props.options the select options.
 * @param props.onChange the onChange event of the checkbox.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
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

/**
 * The React component that displays the table cell with the icon button.
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.rowIndex the row index.
 * @param props.onAction the callback function called when the button is clicked.
 * @param props.icon the icon for the button.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
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
