import React from 'react'
import {createPortal} from 'react-dom'

const getDragPreview = () => document.getElementById('fb-drag-preview') || document.body
export const DragPreview = ({children}: React.ComponentProps<any>) => createPortal(children, getDragPreview())
