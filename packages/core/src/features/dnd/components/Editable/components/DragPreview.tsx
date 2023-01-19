import styled from '@emotion/styled'
import {createPortal} from 'react-dom'

const getDragPreview = () => document.getElementById('fb-drag-preview') || document.body
export const DragPreview = ({children}: React.ComponentProps<any>) => createPortal(<Container>{children}</Container>, getDragPreview())

const Container = styled.div`
  .rs-theme-dark & {
    background-color: #414549;
  }
`
