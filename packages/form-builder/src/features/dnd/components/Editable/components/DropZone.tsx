import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {ComponentProps} from 'react'
import {useDrop} from 'react-dnd'
import {ConnectDropTarget} from 'react-dnd/dist/types/types'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {isRootType} from '../../../../../utils/isRoot'
import {ComponentMove, InsertPosition} from '../../../../../utils/types'
import {AcceptDrop, ItemType} from '../../../consts'
import {DropView} from './DropView'

interface DropZoneProps extends ComponentProps<any> {
  isAfter?: boolean
  isInner?: boolean
  className?: any
  children?: any
  bindTo?: string
  bindCondition?: string
}

const DropZone = observer(({isAfter = false, className, isInner, ...props}: DropZoneProps) => {
  const {store} = useComponentData()
  const isRoot = isRootType(store)
  const isContainer = Boolean(store.children)
  const {bindTo, bindCondition} = props

  const [{isActive, isOver}, drop] = useDropZone(isAfter, isRoot || isInner)
  const dropClassNames = {isAfter, isActive, isContainer, isRoot, isInner}

  const dropView = <DropView {...{...dropClassNames, isOver, bindTo, bindCondition}}/>

  return <>
    <Container ref={drop} {...props} className={cx(dropClassNames, className)}>
      {(isRoot || isInner) && dropView}
    </Container>
    {!isRoot && !isInner && dropView}
  </>
})

interface DropState {
  isActive: boolean,
  isOver: boolean,
}

const useDropZone = (isAfter: boolean, isInner?: boolean): [DropState, ConnectDropTarget] => {
  const {Before, After, Inner} = InsertPosition

  const store = useBuilderStore()
  const target = useComponentData()
  const {bindTo} = target.store
  const insertPosition = isInner
    ? Inner
    : isAfter ? After : Before

  const [{isActive, isOver}, drop] = useDrop({
    accept: AcceptDrop,
    drop: (source: ComponentMove, monitor) => {
      const type = monitor.getItemType() as ItemType
      switch (type) {
        case ItemType.AddedComponent:
          store.add(source, target, insertPosition)
          break
        case ItemType.Component:
          //TODO механизм биндинга свойств
          source.store.bindTo = bindTo
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
