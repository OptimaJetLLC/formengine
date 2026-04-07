import cx from 'clsx'
import type {HTMLAttributes} from 'react'
import {forwardRef} from 'react'
import styles from './Containers.module.css'

/**
 * The React component that displays a set of rows.
 * @param props the React component properties.
 * @param props.style component styles.
 * @param props.className css class name.
 * @param props.gap the gap between rows.
 * @returns the React element.
 */
export const Rows = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cx(styles.rows, className)}
      />
    )
  },
)
Rows.displayName = 'Rows'

interface ColumnsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Flag, if true the columns will be stretched in width, false otherwise.
   */
  stretchElements?: boolean
  /**
   * Flag, if true the columns justify space between, false otherwise.
   */
  spaceBetween?: boolean
}

/**
 * Columns component.
 * @param props {@link ColumnsProps}
 * @param props.gap gap between columns.
 * @param props.stretchElements flag to stretch elements.
 * @param props.spaceBetween flag to include spacer between items.
 * @param props.style wrapper styles.
 * @param props.className wrapper css class name.
 * @returns React component.
 */
export const Columns = forwardRef<HTMLDivElement, ColumnsProps>(
  ({stretchElements, spaceBetween, className, ...props}, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cx(
          styles.columns,
          className,
          stretchElements && styles.columnsStretch,
          spaceBetween && styles.columnsSpaceBetween,
        )}
      />
    )
  },
)
Columns.displayName = 'Columns'

/**
 * Labeled input component.
 * @param props HTMLDivElement properties.
 * @param props.className css class name.
 * @returns React component.
 */
export const LabeledInput = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(styles.labeledInput, className)}
    />
  ),
)
LabeledInput.displayName = 'LabeledInput'

/**
 * List item component.
 * @param props HTMLDivElement properties.
 * @param props.className css class name.
 * @returns React component.
 */
export const ListItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(styles.listItem, className)}
    />
  ),
)
ListItem.displayName = 'ListItem'

/**
 * The React component that displays a list.
 * @param props the React component properties.
 * @param props.className css class name.
 * @param props.clickable flag, if true then the list is clickable, false otherwise.
 * @returns the React element.
 */
export const List = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { clickable?: boolean }>(
  ({clickable = false, className, ...props}, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(styles.list, className, clickable && styles.listClickable)}
    />
  ),
)
List.displayName = 'List'
