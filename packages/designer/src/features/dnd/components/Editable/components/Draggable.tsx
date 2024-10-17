import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {ComponentData} from '@react-form-builder/core'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import type {ComponentProps, RefObject} from 'react'
import {useMemo, useRef} from 'react'
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

const RawDraggable = ({children, isInner, className, isTree, ...props}: DraggableProps) => {
  const {key, isRoot, model} = useComponentData()
  const isContainer = model.kind === 'container'
  const direction = useDirection()
  const horizontal = !isTree && direction
  const [{isActive, isDragging: isDraggingCurrent}, dnd] = useDnd(isRoot)
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const dragPreview = <DragPreview><SLabel>{key}</SLabel></DragPreview>
  const afterChildren = isDragging && !isRoot
  const beforeChildren = isDragging && !isRoot && !isInner

  return <>
    {isDraggingCurrent && dragPreview}
    <Container ref={dnd} {...props}
               className={cx(className, {isActive, isContainer, isRoot, isInner, isDragging, isDraggingCurrent, horizontal, isTree})}>
      <label className={'containerLabel'}>{key}</label>
      {!isTree && <DraggableBody/>}
      {beforeChildren && <DropZone/>}
      {children}
      {afterChildren && <DropZone isAfter={!isInner && true} isInner={isInner}/>}
    </Container>
  </>
}

export const Draggable = namedObserver('Draggable', RawDraggable)

interface DndState {
  isDragging: boolean,
  isActive: boolean,
  isOver: boolean,
  canDrop: boolean,
}

const useDnd = (isRoot?: boolean): [DndState, RefObject<any>] => {
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
  const state: DndState = useMemo(() => ({...dropProps, ...dragState}), [dropProps, dragState])

  if (!isRoot) drag(dnd)
  drop(dnd)

  return [state, dnd]
}

const DraggableBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 7;
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
  transition: padding 200ms ease-in-out;

  .containerLabel {
    display: none;
    position: absolute;
    justify-self: center;
    color: var(--rs-primary-300);
    inset: 2px;
    line-height: 13px;

    .rs-theme-dark & {
      color: var(--rs-primary-400);
      opacity: 0.4;
    }
  }

  &.isDraggingCurrent {
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

  &:not(.isRoot):not(.isTree) {
    &.isActive.isContainer {
      outline: 1px dashed rgba(0, 116, 255, 0.25);
    }

    &.isDragging.isContainer {
      padding: 20px 10px;
      background-color: rgb(from var(--rs-primary-200) r g b/20%);
      outline: 1px dashed rgba(0, 116, 255, 0.25);

      .rs-theme-dark & {
        background-color: rgb(from var(--rs-primary-600) r g b/10%);
      }

      & > .containerLabel {
        display: initial;
      }
    }

    .horizontal > &.isDragging.isContainer {
      padding: 10px 20px;
    }
  }

  .horizontal > & {
    flex-direction: row;
  }
`
