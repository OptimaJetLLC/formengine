import cx from 'clsx'
import type {ComponentProps} from 'react'
import {createPortal} from 'react-dom'
import styles from './DragPreview.module.css'

const getDragPreview = () => document.getElementById('fb-drag-preview') || document.body

/**
 * The React component that displays a preview for the dragged item.
 * @param props the React component properties.
 * @returns the React element.
 */
export const DragPreview = (props: ComponentProps<any>) =>
  createPortal(<div {...props} className={cx(styles.container, props.className)} />, getDragPreview())
