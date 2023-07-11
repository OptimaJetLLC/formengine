import styled from '@emotion/styled'
import {ComponentProps} from 'react'
import {createPortal} from 'react-dom'

const getDragPreview = () => document.getElementById('fb-drag-preview') || document.body

/**
 * The React component that displays a preview for the dragged item.
 * @param props the React component properties.
 * @param props.children the draggable component.
 * @returns the React element.
 */
export const DragPreview = ({children}: ComponentProps<any>) => createPortal(<Container>{children}</Container>, getDragPreview())

const Container = styled.div`
  min-width: 249px;
  max-width: 249px;

  .rs-theme-dark & {
    background-color: #414549;
  }
`
