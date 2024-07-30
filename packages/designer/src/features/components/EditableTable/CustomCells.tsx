import styled from '@emotion/styled'
import type {LabeledValue} from '@react-form-builder/core'
import type {IconProps} from '@rsuite/icons/lib/Icon.js'
import type {ReactElement} from 'react'
import {useCallback} from 'react'
import {Checkbox, IconButton, Input, InputPicker, Table} from 'rsuite'
import type {RowDataType} from 'rsuite-table/lib'
import type {InnerCellProps} from 'rsuite-table/lib/Cell.js'

const {Cell} = Table

/**
 * The React component that displays the table cell with the input. **Internal use only.**
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.dataKey the key name in props.rowData.
 * @param props.rowIndex the row index.
 * @param props.props the other properties of the component.
 * @param props.onChange the onChange callback.
 * @returns the React element.
 */
export const InputCell = ({rowData, dataKey, rowIndex, onChange, ...props}: InputCellProps) => {
  const value = rowData[dataKey] ?? ''

  const handleChange = useCallback((newValue: any) => {
    rowData[dataKey] = newValue
    onChange?.(newValue, dataKey, rowIndex)
  }, [dataKey, onChange, rowData, rowIndex])

  return (
    <SCell {...props}>
      <Input value={value} onChange={handleChange} size="sm"/>
    </SCell>
  )
}

/**
 * The React component that displays the table cell with the checkbox. **Internal use only.**
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.dataKey the key name in props.rowData.
 * @param props.rowIndex the row index.
 * @param props.onChange the onChange event of the checkbox.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
export const CheckCell = ({rowData, dataKey, rowIndex, onChange, ...props}: InputCellProps) => {
  const checked = rowData[dataKey] ?? false

  const handleChange = useCallback((_: any, checked: boolean) => {
    rowData[dataKey] = checked
    onChange?.(checked, dataKey, rowIndex)
  }, [dataKey, onChange, rowData, rowIndex])

  return (
    <SCell {...props}>
      <SCheckbox inline checked={checked} onChange={handleChange}/>
    </SCell>
  )
}

/**
 * The React component that displays the table cell with the select input. **Internal use only.**
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.dataKey the key name in props.rowData.
 * @param props.rowIndex the row index.
 * @param props.options the select options.
 * @param props.onChange the onChange event of the checkbox.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
export const SelectCell = ({rowData, dataKey, rowIndex, options, onChange, ...props}: SelectCellProps) => {
  const value = rowData[dataKey] ?? ''

  const handleChange = useCallback((value: any) => {
    rowData[dataKey] = value
    onChange?.(value, dataKey, rowIndex)
  }, [dataKey, onChange, rowData, rowIndex])

  return (
    <SCell {...props}>
      <InputPicker value={value}
                   data={options}
                   onChange={handleChange}
                   cleanable={false}
                   creatable={true}
                   block size="sm"
                   placement="auto"
      />
    </SCell>
  )
}

/**
 * The React component that displays the table cell with the icon button. **Internal use only.**
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.rowIndex the row index.
 * @param props.onAction the callback function called when the button is clicked.
 * @param props.icon the icon for the button.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
export const ActionCell = ({rowData, rowIndex, onAction, icon, ...props}: ActionCellProps) =>
  (
    <SCell {...props}>
      <IconButton
        appearance="subtle" size="sm"
        onClick={() => onAction(rowIndex)}
        icon={icon()}
      />
    </SCell>
  )

const SCell = styled(Cell<RowDataType, string | number>)`
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

/**
 * The properties of InputCell component.
 */
export interface InputCellProps extends InnerCellProps<RowDataType, string | number> {
  /**
   * The callback function called when the data in a cell is changed.
   * @param value the value.
   * @param dataKey the cell data key.
   * @param rowIndex the cell row index.
   */
  onChange?: (value?: any, dataKey?: string, rowIndex?: number) => void
  /**
   * The cell data key.
   */
  dataKey: string
  /**
   * Rows data.
   */
  rowData: RowDataType
}

/**
 * The properties of SelectCell component.
 */
export interface SelectCellProps extends InputCellProps {
  /**
   * The select options.
   */
  options: LabeledValue[]
}

/**
 * The properties of ActionCell component.
 */
export interface ActionCellProps extends InnerCellProps<RowDataType, string | number> {
  /**
   * The callback function called when the cell is clicked.
   * @param rowIndex the row index.
   */
  onAction: (rowIndex?: number) => void
  /**
   * The cell icon.
   */
  icon: () => ReactElement<IconProps>
}
