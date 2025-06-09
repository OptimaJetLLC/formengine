import styled from '@emotion/styled'
import type {ComponentProps} from 'react'
import {createPortal} from 'react-dom'

const Container = styled.div`
  display: flex;
  width: 136px;
  height: 34px;
  align-items: center;
  overflow: hidden;

  .rs-theme-dark & {
    background-color: #414549;
  }
`

const getDragPreview = () => document.getElementById('fb-drag-preview') || document.body

/**
 * The React component that displays a preview for the dragged item.
 * @param props the React component properties.
 * @param props.children the draggable component.
 * @returns the React element.
 */
export const DragPreview = ({children}: ComponentProps<any>) => createPortal(<Container>{children}</Container>, getDragPreview())
