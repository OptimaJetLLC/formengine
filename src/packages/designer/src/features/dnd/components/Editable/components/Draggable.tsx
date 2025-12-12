import {css, cx} from '@emotion/css'
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

const DraggableBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 7;
`

const SDragPreview = styled(DragPreview)`
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ContainerLabel = styled.label`
  position: absolute;
  justify-self: center;
  color: var(--rs-primary-300);
  inset: 2px;
  line-height: 13px;

  .rs-theme-dark & {
    color: var(--rs-primary-400);
    opacity: 0.4;
  }
`

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;

  .horizontal > & {
    flex-direction: row;
  }
`

const containerStyle = css`
  position: relative;
  transition: padding 200ms ease-in-out;

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
    }

    .horizontal > &.isDragging.isContainer {
      padding: 10px 20px;
    }
  }
`

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
  const {key, isRoot, model, parent} = useComponentData()
  const isContainer = model.kind === 'container'
  const direction = useDirection()
  const horizontal = !isTree && direction
  const [{isActive, isDragging: isDraggingCurrent}, dnd] = useDnd(isRoot)
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const afterChildren = isDragging && !isRoot
  const beforeChildren = isDragging && !isRoot && !isInner
  const showContainerHint = isContainer && isDragging && !isRoot && !isTree
  const Container = isContainer && !isTree ? model.component : DefaultContainer

  const clsName = useMemo(() => {
    const parentType = parent ? `parent-type-${parent?.model.type}` : ''
    const type = `type-${model.type}`
    return cx(containerStyle, className, {
      isActive,
      isContainer,
      isRoot,
      isInner,
      isDragging,
      isDraggingCurrent,
      horizontal,
      isTree
    }, parentType, type)
  }, [className, horizontal, isActive, isContainer, isDragging, isDraggingCurrent, isInner, isRoot, isTree, model.type, parent])

  return <>
    {isDraggingCurrent && <SDragPreview>{key}</SDragPreview>}
    <Container ref={dnd} className={clsName} {...props}>
      {showContainerHint && <ContainerLabel>{key}</ContainerLabel>}
      {!isTree && <DraggableBody/>}
      {beforeChildren && <DropZone/>}
      {children}
      {afterChildren && <DropZone isAfter={!isInner && true} isInner={isInner}/>}
    </Container>
  </>
}

export const Draggable = namedObserver('Draggable', RawDraggable)
