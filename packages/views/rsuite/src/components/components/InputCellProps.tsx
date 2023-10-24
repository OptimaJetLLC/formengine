import type {InnerCellProps} from 'rsuite-table/lib/Cell'

/**
 * React component properties for the {@link InputCell} component.
 */
export interface InputCellProps extends InnerCellProps {
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
}
