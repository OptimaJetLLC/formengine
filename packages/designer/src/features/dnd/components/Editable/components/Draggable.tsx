import type {ComponentData} from '@react-form-builder/core'
import {cfUncoverOverflowScrollbar, namedObserver, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps, CSSProperties, HTMLAttributes, RefCallback} from 'react'
import {forwardRef, useCallback, useMemo, useState} from 'react'
import {useDragLayer, useDrop} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AcceptDrop, ItemType} from '../../../consts'
import {useConnectAsRef} from '../hooks/useConnectAsRef'
import {useDragWithPreview} from '../hooks/useDragWithPreview'
import styles from './Draggable.module.css'
import {DragPreview} from './DragPreview'
import {DropZone} from './DropZone'
import {dragOverlayAttr, uncoverInsetPx, uncoverInsetVar, uncoverOverflowAttr} from './overlayRoot'
import {Toolbar} from './Toolbar'

const DefaultContainer = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => (
  <div ref={ref} {...props} className={cx(styles.defaultContainer, props.className)} />
))
DefaultContainer.displayName = 'DefaultContainer'

interface DndState {
  isDragging: boolean
  isActive: boolean
  isOver: boolean
  canDrop: boolean
}

const useDnd = (isRoot?: boolean): [DndState, RefCallback<HTMLElement>] => {
  const data = useComponentData()

  const [dropProps, drop] = useDrop(
    {
      accept: AcceptDrop,
      canDrop: (item: ComponentData) => data.store.key !== item.store.key,
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isActive: monitor.isOver() && monitor.canDrop(),
      }),
    },
    []
  )

  const [dragState, drag] = useDragWithPreview(ItemType.Component)
  const state: DndState = useMemo(() => ({...dropProps, ...dragState}), [dropProps, dragState])
  const setDropRef = useConnectAsRef<HTMLElement>(drop)

  const setDndRef = useCallback<RefCallback<HTMLElement>>(
    node => {
      if (!isRoot) drag(node)
      setDropRef(node)
    },
    [drag, setDropRef, isRoot]
  )

  return [state, setDndRef]
}

interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  isInner?: boolean
  isTree?: boolean
  showToolbar?: boolean
}

const useDirection = () => {
  const {viewMode} = useBuilderStore()
  const {css} = useComponentData().store
  const direction = css?.[viewMode]?.object?.flexDirection ?? css?.any?.object?.flexDirection ?? ''
  return ['row', 'row-reverse', 'initial'].includes(direction as string)
}

const RawDraggable = ({children, isInner, className, isTree, showToolbar, ...props}: DraggableProps) => {
  const {key, isRoot, model, parent} = useComponentData()
  const isContainer = model.kind === 'container'
  const direction = useDirection()
  const horizontal = !isTree && direction
  const [{isActive, isDragging: isDraggingCurrent}, dnd] = useDnd(isRoot)
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const afterChildren = isDragging && !isRoot
  const beforeChildren = isDragging && !isRoot && !isInner
  const showContainerHint = isContainer && isDragging && !isRoot && !isTree
  const uncoverOverflow = model.isFeatureEnabled(cfUncoverOverflowScrollbar)
  const Container = isContainer && !isTree ? model.component : DefaultContainer

  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null)
  const setOverlayRef = useCallback((node: HTMLDivElement | null) => {
    setOverlay(node)
  }, [])

  const clsName = useMemo(() => {
    const parentType = parent ? `parent-type-${parent?.model.type}` : ''
    const type = `type-${model.type}`
    return cx(
      styles.container,
      className,
      {
        isActive,
        isContainer,
        isRoot,
        isInner,
        isDragging,
        isDraggingCurrent,
        horizontal,
        isTree,
        [styles.uncoverOverflow]: uncoverOverflow,
      },
      parentType,
      type
    )
  }, [
    className,
    horizontal,
    isActive,
    isContainer,
    isDragging,
    isDraggingCurrent,
    isInner,
    isRoot,
    isTree,
    model.type,
    parent,
    uncoverOverflow,
  ])

  const uncoverStyle = useMemo(
    () => (uncoverOverflow ? ({[uncoverInsetVar]: `${uncoverInsetPx}px`} as CSSProperties) : undefined),
    [uncoverOverflow]
  )
  const containerStyle = useMemo(() => {
    const base = typeof props.style === 'object' && props.style ? props.style : undefined
    if (!base && !uncoverStyle) return undefined
    return {...base, ...uncoverStyle}
  }, [props.style, uncoverStyle])
  const uncoverAttrs = useMemo(() => (uncoverOverflow ? {[uncoverOverflowAttr]: ''} : undefined), [uncoverOverflow])
  const overlayAttrs = useMemo(() => ({[dragOverlayAttr]: ''}), [])

  return (
    <>
      {isDraggingCurrent && <DragPreview className={styles.dragPreview}>{key}</DragPreview>}
      <Container className={clsName} {...props} {...uncoverAttrs} style={containerStyle} ref={dnd}>
        {showContainerHint && <label className={styles.containerLabel}>{key}</label>}
        {!isTree && <div ref={setOverlayRef} className={styles.draggableBody} {...overlayAttrs} />}
        {beforeChildren && <DropZone />}
        {children}
        {afterChildren && <DropZone isAfter={!isInner && true} isInner={isInner} />}
      </Container>
      {showToolbar && overlay && <Toolbar anchor={overlay} />}
    </>
  )
}

export const Draggable = namedObserver('Draggable', RawDraggable)
