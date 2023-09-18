import type {InnerCellProps} from 'rsuite-table/lib/Cell'

/**
 * React component properties for the {@link InputCell} component.
 */
export interface InputCellProps extends InnerCellProps {
  onChange?: (value?: any, dataKey?: string, rowIndex?: number) => void
  dataKey: string
}
