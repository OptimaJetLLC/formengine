import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {ComponentData} from '@react-form-builder/core'
import {isNull, namedObserver, useComponentData} from '@react-form-builder/core'
import type {ComponentProps, RefCallback} from 'react'
import {useCallback} from 'react'
import {useDrop} from 'react-dnd'
import type {ConnectDropTarget, DropTargetMonitor} from 'react-dnd/dist/types/types'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {DropView, InnerDropView} from './DropView'

const useDropZone = (isAfter?: boolean, isInner?: boolean, slot?: string, slotCondition?: string): [DropState, ConnectDropTarget] => {
  const store = useBuilderStore()
  const target = useComponentData()
  const insertPosition = isInner
    ? 'inner'
    : isAfter ? 'after' : 'before'

  const handleDrop = useCallback((source: ComponentData, monitor: DropTargetMonitor) => {
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
  }, [store, target, insertPosition, slot, slotCondition])

  const handleCanDrop = useCallback((item: ComponentData, monitor: DropTargetMonitor) => {
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
  }, [store, target, insertPosition, slot])

  const [{isActive, isOver, isDragging, canDrop}, drop] = useDrop({
    accept: AcceptDrop,
    drop: handleDrop,
    canDrop: handleCanDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isActive: monitor.isOver() && monitor.canDrop(),
      isDragging: !isNull(monitor.getItemType()),
      canDrop: monitor.canDrop(),
    })
  }, [store, target, insertPosition, slot, slotCondition])

  return [{isActive, isOver, isDragging, canDrop}, drop]
}

const SContainer = styled.div`
  position: absolute;
  top: -5px;
  inset-inline-start: 0;
  height: calc(50% + 5px);
  width: 100%;
  z-index: 10;
  display: flex;

  &.isContainer {
    height: 36px;
    z-index: 9;
  }

  &.isAfter {
    top: initial;
    bottom: -5px;

    &.isRoot {
      position: relative;
      flex: 1;
    }
  }

  .horizontal > * > & {
    top: 0;
    inset-inline-start: -5px;
    height: 100%;
    width: calc(50% + 5px);

    &.isAfter {
      inset-inline-start: initial;
      inset-inline-end: -5px;
    }
  }
`

interface DropZoneProps extends ComponentProps<any> {
  isAfter?: boolean
  isInner?: boolean
  slot?: string
  slotCondition?: string
}

const RawDropZone = ({isAfter, isInner, ...props}: DropZoneProps) => {
  const componentData = useComponentData()
  const {store, isRoot} = componentData
  const isContainer = Boolean(store.children)

  const inner = isRoot || isInner
  const [{isActive, isOver, isDragging, canDrop}, drop] = useDropZone(isAfter, inner, props.slot, props.slotCondition)
  const className = cx({isAfter, isActive, isContainer, isRoot, isInner, isOver, isDragging, canDrop})
  // TODO FE-1065
  const ref = drop as unknown as RefCallback<HTMLDivElement>

  return <>
    {inner
      ? <InnerDropView ref={ref} className={className} {...props}/>
      : <SContainer ref={ref} className={className} data-testid="dropzone"/>
    }
    {!inner && <DropView className={className}/>}
  </>
}

interface DropState {
  isActive: boolean,
  isOver: boolean,
  isDragging: boolean,
  canDrop: boolean,
}

export const DropZone = namedObserver('DropZone', RawDropZone)
