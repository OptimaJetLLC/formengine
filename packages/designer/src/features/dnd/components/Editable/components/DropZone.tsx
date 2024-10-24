import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {ComponentData} from '@react-form-builder/core'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {useDrop} from 'react-dnd'
import type {ConnectDropTarget} from 'react-dnd/dist/types/types'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {DropView, InnerDropView} from './DropView'

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
  const [{isActive, isOver}, drop] = useDropZone(isAfter, inner, props.slot, props.slotCondition)
  const className = cx({isAfter, isActive, isContainer, isRoot, isInner, isOver})

  return <>
    {inner
      ? <InnerDropView ref={drop} className={className} {...props}/>
      : <SContainer ref={drop} className={className}/>
    }
    {!inner && <DropView className={className}/>}
  </>
}

interface DropState {
  isActive: boolean,
  isOver: boolean,
}

const useDropZone = (isAfter?: boolean, isInner?: boolean, slot?: string, slotCondition?: string): [DropState, ConnectDropTarget] => {
  const store = useBuilderStore()
  const target = useComponentData()
  const insertPosition = isInner
    ? 'inner'
    : isAfter ? 'after' : 'before'

  const [{isActive, isOver}, drop] = useDrop({
    accept: AcceptDrop,
    drop: (source: ComponentData, monitor) => {
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
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isActive: monitor.isOver() && monitor.canDrop(),
    })
  })

  return [{isActive, isOver}, drop]
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

export const DropZone = namedObserver('DropZone', RawDropZone)
