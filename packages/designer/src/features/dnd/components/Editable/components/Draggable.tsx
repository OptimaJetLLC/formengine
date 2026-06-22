import type {ComponentData} from '@react-form-builder/core'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {forwardRef, useCallback, useMemo} from 'react'
import {useDragLayer, useDrop} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {useDragWithPreview} from '../hooks/useDragWithPreview'
import styles from './Draggable.module.css'
import {DragPreview} from './DragPreview'
import {DropZone} from './DropZone'

const DefaultContainer = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => (
  <div ref={ref} {...props} className={cx(styles.defaultContainer, props.className)}/>
))
DefaultContainer.displayName = 'DefaultContainer'

interface DndState {
  isDragging: boolean,
  isActive: boolean,
  isOver: boolean,
  canDrop: boolean,
}

const useDnd = (isRoot?: boolean): [DndState, (node: HTMLElement | null) => void] => {
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

  const setDndRef = useCallback(
    (node: HTMLElement | null) => {
      if (!isRoot) drag(node)
      drop(node)
    },
    [drag, drop, isRoot],
  )

  return [state, setDndRef]
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
    return cx(styles.container, className, {
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

  return (
    <>
      {isDraggingCurrent && <DragPreview className={styles.dragPreview}>{key}</DragPreview>}
      <Container ref={dnd} className={clsName} {...props}>
        {showContainerHint && <label className={styles.containerLabel}>{key}</label>}
        {!isTree && <div className={styles.draggableBody}/>}
        {beforeChildren && <DropZone/>}
        {children}
        {afterChildren && <DropZone isAfter={!isInner && true} isInner={isInner}/>}
      </Container>
    </>
  )
}

export const Draggable = namedObserver('Draggable', RawDraggable)
