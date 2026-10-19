import {RestrictToVerticalAxis} from '@dnd-kit/abstract/modifiers'
import {useSortable} from '@dnd-kit/react/sortable'
import type {CSSProperties, ReactNode} from 'react'
import {useMemo} from 'react'
import styles from './SortableList.module.css'

const verticalModifiers = [RestrictToVerticalAxis]

interface SortableRowProps {
  id: string
  index: number
  reorderHandleAriaLabel: string
  children: ReactNode
}

/**
 * One draggable row with a handle. **Internal use only.**
 * @param props the row properties.
 * @returns the React element.
 */
export const SortableRow = (props: SortableRowProps) => {
  const {id, index, reorderHandleAriaLabel, children} = props
  const {ref, handleRef, isDragging} = useSortable({id, index, modifiers: verticalModifiers})

  const style = useMemo((): CSSProperties => ({opacity: isDragging ? 0.6 : undefined}), [isDragging])

  return (
    <div ref={ref} className={styles.row} style={style}>
      <button
        type="button"
        className={styles.handle}
        aria-label={reorderHandleAriaLabel}
        data-testid="sortable-list-handle"
        ref={handleRef}
      >
        <svg width="12" height="16" viewBox="0 0 12 16" aria-hidden="true">
          <circle cx="3" cy="3" r="1.5" fill="currentColor" />
          <circle cx="9" cy="3" r="1.5" fill="currentColor" />
          <circle cx="3" cy="8" r="1.5" fill="currentColor" />
          <circle cx="9" cy="8" r="1.5" fill="currentColor" />
          <circle cx="3" cy="13" r="1.5" fill="currentColor" />
          <circle cx="9" cy="13" r="1.5" fill="currentColor" />
        </svg>
      </button>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
