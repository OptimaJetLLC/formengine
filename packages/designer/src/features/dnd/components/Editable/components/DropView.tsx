import {useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import cx from 'clsx'
import type {HTMLAttributes, KeyboardEvent, MouseEvent} from 'react'
import {forwardRef, useCallback} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {disarmOtherDraggables} from '../disarmDraggableAncestors'
import styles from './DropView.module.css'

interface DropViewProps {
  className?: string
  slot?: string
  slotCondition?: string
}

const AddButton = ({slot, slotCondition}: {slot?: string; slotCondition?: string}) => {
  const builderStore = useBuilderStore()
  const target = useComponentData()
  const openModal = useCallback(() => {
    builderStore.showComponentsModal(
      source => {
        builderStore.add(source, target, 'inner', slot, slotCondition)
      },
      componentData => builderStore.getAddComponentResult(componentData, target, 'inner', slot)
    )
  }, [builderStore, target, slot, slotCondition])

  // Open on mousedown inside HTML5 drag hosts: the browser cancels click when a drag starts.
  // preventDefault suppresses the follow-up click so we do not open twice.
  const handleMouseDown = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      if (event.button !== 0) return
      stopEvent(event)
      disarmOtherDraggables(event.currentTarget)
      openModal()
    },
    [openModal]
  )

  // Programmatic .click() / fireEvent.click does not fire mousedown.
  const handleClick = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      stopEvent(event)
      openModal()
    },
    [openModal]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLSpanElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        stopEvent(event)
        openModal()
      }
    },
    [openModal]
  )

  return (
    <span
      role="button"
      tabIndex={0}
      className={styles.addControl}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid="add-button"
      aria-label="Add component"
    >
      <PlusIcon className={styles.addIcon} />
    </span>
  )
}

/**
 * The React form builder component that displays the inner container into which you can drag and drop a component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const InnerDropView = forwardRef<HTMLDivElement, DropViewProps>(({slot, slotCondition, className}, ref) => {
  return (
    <div ref={ref} className={cx(styles.innerContainer, className)} data-testid="inner-dropzone">
      <AddButton slot={slot} slotCondition={slotCondition} />
    </div>
  )
})
InnerDropView.displayName = 'InnerDropView'

/**
 * The React form builder component that displays the container into which you can drag and drop a component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const DropView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => {
  return <div {...props} ref={ref} className={cx(styles.dropView, className)} />
})
DropView.displayName = 'DropView'
