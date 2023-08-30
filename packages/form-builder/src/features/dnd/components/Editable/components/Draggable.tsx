import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {ComponentData, useComponentData} from '@react-form-builder/core'
import {merge} from 'lodash/fp.js'
import {observer} from 'mobx-react'
import {ComponentProps, ReactNode, RefObject, useMemo, useRef} from 'react'
import {useDragLayer, useDrop} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {useDragWithPreview} from '../hooks/useDragWithPreview'
import {DragPreview} from './DragPreview'
import {DropZone} from './DropZone'

interface DraggableProps extends ComponentProps<any> {
  isInner?: boolean
  isTree?: boolean
  viewForDragPreview?: ReactNode
}

export const Draggable = observer(({children, viewForDragPreview, isInner, className, isTree, ...props}: DraggableProps) => {
  const data = useComponentData()
  const isRoot = data.isRoot
  const isContainer = Boolean(data.store.children)
  const store = useBuilderStore()

  const [{isActive, isDragging: isDraggingCurrent}, dnd] = useDnd()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  const hidden = isDragging && store.selected.has(data)

  return <>
    {isDraggingCurrent && <DragPreview>{viewForDragPreview}</DragPreview>}
    <Container ref={dnd} {...props}
               className={cx(className, {isActive, isContainer, isRoot, isInner, hidden})}>
      {!isTree && <DraggableBody/>}
      {isDragging && !isRoot && !isInner && <DropZone/>}
      {children}
      {isDragging && !isRoot && <DropZone isAfter={!isInner && true} isInner={isInner}/>}
    </Container>
  </>
})

interface DndState {
  isDragging: boolean,
  isActive: boolean,
  isOver: boolean,
  canDrop: boolean,
}

const useDnd = (): [DndState, RefObject<any>] => {
  const dnd = useRef(null)
  const data = useComponentData()

  const [dropProps, drop] = useDrop({
    accept: AcceptDrop,
    canDrop: (item: ComponentData, monitor) => data.store.key !== item.store.key,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isActive: monitor.isOver() && monitor.canDrop(),
    }),
  }, [])

  const [dragState, drag] = useDragWithPreview(ItemType.Component)
  const state: DndState = useMemo(() => (merge(dropProps, dragState)), [dropProps, dragState])

  drop(drag(dnd))

  return [state, dnd]
}

const DraggableBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 6;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  transition: padding-block 200ms ease-in-out;
  transition-delay: 200ms;

  &.hidden > * {
    opacity: 0.4;
  }

  &.hovered {
    outline: 2px dashed #3498ff !important;
    cursor: pointer !important;
  }

  &.selected {
    outline: 2px solid #3498ff !important;
    cursor: move !important;
  }

  &:not(.isRoot) {
    &.isActive.isContainer,
    .isContainer .isActive &.isContainer {
      padding-block: 40px;
      padding-inline: 5px;
      outline: 1px dashed rgba(0, 116, 255, 0.25);
    }

    .horizontal > &.isActive.isContainer,
    .isContainer .isActive > .horizontal &.isContainer {
      padding-block: 5px !important;
      padding-inline: 40px !important;
    }
  }

  .horizontal > & {
    flex-direction: row;
    flex: 1;
  }
`
