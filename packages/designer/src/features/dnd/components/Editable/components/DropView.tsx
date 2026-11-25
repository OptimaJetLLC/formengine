import {useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import cx from 'clsx'
import type {HTMLAttributes, KeyboardEvent, PointerEvent} from 'react'
import {forwardRef, useCallback} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import styles from './DropView.module.css'

interface DropViewProps {
  className?: string
  slot?: string
  slotCondition?: string
}

function collectDraggableAncestors(from: HTMLElement): HTMLElement[] {
  const roots: HTMLElement[] = []
  let el: HTMLElement | null = from.parentElement
  while (el) {
    if (el.getAttribute('draggable') === 'true') roots.push(el)
    el = el.parentElement
  }
  return roots
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

  // Open on pointerdown: parent wrappers are HTML5 drag sources, so a click is often canceled
  // when the browser starts a drag. pointerdown runs before that.
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (event.button !== 0) return
      event.preventDefault()
      event.stopPropagation()

      const roots = collectDraggableAncestors(event.currentTarget)
      for (const root of roots) root.setAttribute('draggable', 'false')
      const restore = () => {
        for (const root of roots) root.setAttribute('draggable', 'true')
        window.removeEventListener('pointerup', restore)
        window.removeEventListener('pointercancel', restore)
        window.removeEventListener('dragend', restore)
      }
      window.addEventListener('pointerup', restore)
      window.addEventListener('pointercancel', restore)
      window.addEventListener('dragend', restore)

      openModal()
    },
    [openModal]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLSpanElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        event.stopPropagation()
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
      onPointerDown={handlePointerDown}
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
