import type {ReactNode} from 'react'

/**
 * The SortableList component properties.
 */
export interface SortableListProps {
  /**
   * The list value. Each object is the data of one row.
   */
  value: Array<Record<string, unknown>>
  /**
   * The expression or function to conditionally render a list item.
   */
  itemRenderWhen?: string
  /**
   * If true, row reordering is disabled.
   */
  disabled?: boolean
  /**
   * If true, row reordering is disabled.
   */
  readOnly?: boolean
  /**
   * The accessible name for the row drag handle.
   */
  reorderHandleAriaLabel?: string
  /**
   * The list item container class name.
   */
  className?: string
  /**
   * The list container class name.
   */
  wrapperClassName?: string
  /**
   * The React child node. In the viewer this is the cloned row trees.
   */
  children?: ReactNode
}
