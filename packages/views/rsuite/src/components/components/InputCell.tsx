import {Input} from 'rsuite'
import type {InputCellProps} from './InputCellProps'
import {SCell} from './SCell'

/**
 * The React component that displays the table cell with the input.
 * @param props the React component properties.
 * @param props.rowData the row data.
 * @param props.dataKey the key name in {@link rowData}.
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
