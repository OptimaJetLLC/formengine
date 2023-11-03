import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {ComponentData, namedObserver, useComponentData} from '@react-form-builder/core'
import {merge} from 'lodash/fp.js'
import {ComponentProps, RefObject, useMemo, useRef} from 'react'
import {useDragLayer, useDrop} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {useDragWithPreview} from '../hooks/useDragWithPreview'
import {DragPreview} from './DragPreview'
import {DropZone} from './DropZone'

interface DraggableProps extends ComponentProps<any> {
  isInner?: boolean
  isTree?: boolean
}

const useDirection = () => {
  const {viewMode} = useBuilderStore()
  const {css} = useComponentData().store
  const direction = css?.[viewMode]?.object?.flexDirection ?? css?.any?.object?.flexDirection ?? ''
  return ['row', 'row-reverse', 'initial'].includes(direction as string)
}

export const Draggable = namedObserver('Draggable', ({children, isInner, className, isTree, ...props}: DraggableProps) => {
  const {key, isRoot, model} = useComponentData()
  const isContainer = model.kind === 'container'
  const direction = useDirection()
  const horizontal = !isTree && direction
  const [{isActive, isDragging: isDraggingCurrent}, dnd] = useDnd()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const dragPreview = <DragPreview><SLabel>{key}</SLabel></DragPreview>

  return <>
    {isDraggingCurrent && dragPreview}
    <Container ref={dnd} {...props}
               className={cx(className, {isActive, isContainer, isRoot, isInner, isDraggingCurrent, horizontal})}>
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
    canDrop: (item: ComponentData) => data.store.key !== item.store.key,
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

const SLabel = styled.label`
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: padding-block 200ms ease-in-out;
  transition-delay: 200ms;

  &.isDraggingCurrent > * {
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
  }
`
