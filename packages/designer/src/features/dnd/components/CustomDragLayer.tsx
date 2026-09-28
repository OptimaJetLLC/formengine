import cx from 'clsx'
import type {XYCoord} from 'react-dnd'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import styles from './CustomDragLayer.module.css'

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {display: 'none'}
  }

  const {x, y} = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

/**
 * The React component that displays a drag-and-drop container layer.
 * @returns the React element.
 */
export const CustomDragLayer = () => {
  const isMultiSelection = useBuilderStore().selected.size > 1
  const {isDragging, initialOffset, currentOffset} = useDragLayer(monitor => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  if (!isDragging) {
    return null
  }
  return (
    <div className={styles.layer}>
      <div
        className={cx(styles.container, {isMultiSelection})}
        style={getItemStyles(initialOffset, currentOffset)}
        id={'fb-drag-preview'}
      />
    </div>
  )
}
