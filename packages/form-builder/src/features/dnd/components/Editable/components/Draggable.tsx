import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {useComponentData} from 'fb-core'
import {observer} from 'mobx-react'
import {ComponentProps, ReactNode} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useDnd} from '../hooks/useDnd'
import {DragPreview} from './DragPreview'
import {DropZone} from './DropZone'

interface DraggableProps extends ComponentProps<any> {
  isInner?: boolean
  viewForDragPreview?: ReactNode
}

export const Draggable = observer(({children, viewForDragPreview, isInner, className, ...props}: DraggableProps) => {
  const {isContainer, isRoot, key} = useComponentData().componentStore
  const store = useBuilderStore()
  const [{isActive, isDragging: isDraggingCurrent}, dnd] = useDnd()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  const hidden = isDragging && store.isNodeSelected(key)

  return <>
    {isDraggingCurrent && <DragPreview>{viewForDragPreview}</DragPreview>}
    <Container ref={dnd} {...props}
               className={cx(className, {isActive, isContainer, isRoot, isInner, hidden})}>
      {isDragging && !isRoot && !isInner && <DropZone/>}
      {children}
      {isDragging && !isRoot && <DropZone isAfter={!isInner && true} isInner={isInner}/>}
    </Container>
  </>
})

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  transition: padding-block 200ms ease-in-out;
  transition-delay: 200ms;

  &.hidden {
    opacity: 0.4;
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
