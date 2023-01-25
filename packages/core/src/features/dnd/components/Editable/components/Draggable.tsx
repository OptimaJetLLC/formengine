import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import React, {ReactNode} from 'react'
import {useDragLayer} from 'react-dnd'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {useDnd} from '../hooks/useDnd'
import {DragPreview} from './DragPreview'
import {DropZone} from './DropZone'

interface DraggableProps extends React.ComponentProps<any> {
  isInner?: boolean
  viewForDragPreview?: ReactNode
}

export const Draggable = observer(({children, viewForDragPreview, isInner, className, ...props}: DraggableProps) => {
  const {isContainer, isRoot} = useComponentData().componentStore
  const [{isActive, isDragging: isDraggingCurrent}, dnd] = useDnd()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  return isDraggingCurrent
    ? <DragPreview>{viewForDragPreview}</DragPreview>
    : <Container ref={dnd} {...props}
                 className={cx(className, {isActive, isContainer, isRoot, isInner})}>
      {isDragging && !isRoot && !isInner && <DropZone/>}
      {children}
      {isDragging && !isRoot && <DropZone isAfter={!isInner && true} isInner={isInner}/>}
    </Container>
})

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  transition: padding-block 200ms ease-in-out;
  transition-delay: 200ms;

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
