import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {ComponentData, namedObserver, useComponentData} from '@react-form-builder/core'
import {ComponentProps} from 'react'
import {useDrop} from 'react-dnd'
import {ConnectDropTarget} from 'react-dnd/dist/types/types'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {DropView} from './DropView'

interface DropZoneProps extends ComponentProps<any> {
  isAfter?: boolean
  isInner?: boolean
  className?: any
  children?: any
  slot?: string
  slotCondition?: string
}

const RawDropZone = ({isAfter = false, className, isInner, ...props}: DropZoneProps) => {
  const componentData = useComponentData()
  const store = componentData.store
  const isRoot = componentData.isRoot
  const isContainer = Boolean(store.children)
  const {slot, slotCondition} = props

  const [{isActive, isOver}, drop] = useDropZone(isAfter, isRoot || isInner, slot)
  const dropClassNames = {isAfter, isActive, isContainer, isRoot, isInner}

  const dropView = <DropView {...{...dropClassNames, isOver, slot, slotCondition}}/>

  return <>
    <Container ref={drop} {...props} className={cx(dropClassNames, className)}>
      {(isRoot || isInner) && dropView}
    </Container>
    {!isRoot && !isInner && dropView}
  </>
}

const DropZone = namedObserver('DropZone', RawDropZone)

interface DropState {
  isActive: boolean,
  isOver: boolean,
}

const useDropZone = (isAfter: boolean, isInner?: boolean, slot?: string): [DropState, ConnectDropTarget] => {

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
          store.add(source, target, insertPosition, slot)
          break
        case ItemType.Component:
          source.store.slot = slot
          if (store.selected.size > 1) {
            store.multipleMove(target, insertPosition)
          } else {
            store.move(source, target, insertPosition)
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

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 50%;
  width: 100%;
  z-index: 10;
  display: flex;

  &.isContainer {
    height: 40px;
    z-index: 9;
  }

  &.isAfter {
    top: 50%;

    &.isContainer {
      top: initial;
      bottom: 0;
    }

    &.isRoot {
      position: relative;
      flex: 1;
    }
  }

  .horizontal > * > & {
    height: 100%;
    width: 50%;
    top: 0;
    inset-inline-start: 0;
  }

  .horizontal > * > & {
    &.isContainer {
      width: 40px;
    }

    &.isAfter {
      inset-inline-start: 50%;

      &.isContainer {
        inset-inline-start: initial;
        inset-inline-end: 0;
      }
    }
  }

  &.isInner {
    position: relative;
    top: 0;
    padding: 10px;
    min-height: 40px;
  }
`

export {DropZone}
