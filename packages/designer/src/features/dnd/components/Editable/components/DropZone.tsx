import type {ComponentData} from '@react-form-builder/core'
import {isNull, namedObserver, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {RefCallback} from 'react'
import {useCallback} from 'react'
import type {DropTargetMonitor} from 'react-dnd'
import {useDrop} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {useConnectAsRef} from '../hooks/useConnectAsRef'
import {DropView, InnerDropView} from './DropView'
import styles from './DropZone.module.css'

const useDropZone = (
  isAfter?: boolean,
  isInner?: boolean,
  slot?: string,
  slotCondition?: string
): [DropState, RefCallback<HTMLDivElement>] => {
  const store = useBuilderStore()
  const target = useComponentData()
  const insertPosition = isInner ? 'inner' : isAfter ? 'after' : 'before'

  const handleDrop = useCallback(
    (source: ComponentData, monitor: DropTargetMonitor) => {
      const type = monitor.getItemType() as ItemType
      switch (type) {
        case ItemType.AddedComponent:
          store.add(source, target, insertPosition, slot, slotCondition)
          break
        case ItemType.Component:
          if (store.selected.size > 1) {
            store.multipleMove(target, insertPosition, slot, slotCondition)
          } else {
            store.move(source, target, insertPosition, slot, slotCondition)
          }
          break
      }
    },
    [store, target, insertPosition, slot, slotCondition]
  )

  const handleCanDrop = useCallback(
    (item: ComponentData, monitor: DropTargetMonitor) => {
      const type = monitor.getItemType() as ItemType
      switch (type) {
        case ItemType.AddedComponent:
          return store.canAddComponent(item, target, insertPosition, slot)
        case ItemType.Component:
          if (store.selected.size > 1) {
            return store.canMoveComponents(store.selected, target, insertPosition, slot)
          }
          return store.canMoveComponents(new Set([item]), target, insertPosition, slot)
      }
      return false
    },
    [store, target, insertPosition, slot]
  )

  const [{isActive, isOver, isDragging, canDrop}, drop] = useDrop(
    {
      accept: AcceptDrop,
      drop: handleDrop,
      canDrop: handleCanDrop,
      collect: monitor => ({
        isOver: monitor.isOver(),
        isActive: monitor.isOver() && monitor.canDrop(),
        isDragging: !isNull(monitor.getItemType()),
        canDrop: monitor.canDrop(),
      }),
    },
    [store, target, insertPosition, slot, slotCondition]
  )

  const setDropRef = useConnectAsRef<HTMLDivElement>(drop)

  return [{isActive, isOver, isDragging, canDrop}, setDropRef]
}

interface DropZoneProps {
  isAfter?: boolean
  isInner?: boolean
  slot?: string
  slotCondition?: string
}

const RawDropZone = ({isAfter, isInner, slot, slotCondition}: DropZoneProps) => {
  const componentData = useComponentData()
  const {store, isRoot} = componentData
  const isContainer = Boolean(store.children)

  const inner = isRoot || isInner
  const [{isActive, isOver, isDragging, canDrop}, drop] = useDropZone(isAfter, inner, slot, slotCondition)
  const className = cx({isAfter, isActive, isContainer, isRoot, isInner, isOver, isDragging, canDrop})

  return (
    <>
      {inner ? (
        <InnerDropView ref={drop} className={className} slot={slot} slotCondition={slotCondition} />
      ) : (
        <div ref={drop} className={cx(styles.container, className)} data-testid="dropzone" />
      )}
      {!inner && <DropView className={className} />}
    </>
  )
}

interface DropState {
  isActive: boolean
  isOver: boolean
  isDragging: boolean
  canDrop: boolean
}

export const DropZone = namedObserver('DropZone', RawDropZone)
