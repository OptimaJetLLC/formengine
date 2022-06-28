import {DropZone} from "./DropZone";
import styled from "@emotion/styled";
import {useComponentData} from "../../../../../utils/contexts/ComponenDataContext";
import {useDnd} from "../hooks/useDnd";
import {cx} from "@emotion/css";
import React, {ReactElement} from "react";
import {DragPreview} from "./DragPreview";

interface DraggableProps extends React.ComponentProps<any> {
    isInner?: boolean
    viewForDragPreview?: ReactElement
}

export const Draggable = ({children, viewForDragPreview, isInner, className, ...props}: DraggableProps) => {
    const {isContainer, isRoot} = useComponentData().componentStore;
    const [{isActive, isDragging}, dnd] = useDnd();

    return isDragging
        ? <DragPreview>{viewForDragPreview}</DragPreview>
        : <Container ref={dnd} {...props}
                     className={cx(className, {isActive, isContainer, isRoot, isInner})}>
            {!isRoot && !isInner && <DropZone/>}
            {children}
            <DropZone isAfter={!isInner && true} isInner={isInner}/>
        </Container>
}

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
