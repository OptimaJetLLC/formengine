import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {useDragLayer, XYCoord} from 'react-dnd'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {display: 'none'}
  }

  const {x, y} = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

/**
 * The React component that displays a drag-and-drop container layer.
 * @returns the React element.
 */
export const CustomDragLayer = () => {
  const isMultiSelection = useBuilderStore().selected.size > 1
  const {isDragging, initialOffset, currentOffset} =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  if (!isDragging) {
    return null
  }
  return (
    <Layer>
      <Container className={cx({isMultiSelection})} style={getItemStyles(initialOffset, currentOffset)} id={'fb-drag-preview'}/>
    </Layer>
  )
}

const Layer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 35%);
  width: fit-content;

  &, & > *, &::before, &::after {
    background-color: white;
    border-radius: 5px;
  }

  &.isMultiSelection {
    & > *, &::before, &::after {
      box-shadow: 2px 1px 1px rgba(0, 0, 0, 0.15);
    }

    &::before, &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &::before {
      left: 7px;
      top: 5px;
      z-index: -1;
    }

    &::after {
      left: 12px;
      top: 10px;
      z-index: -2;
    }
  }

  .rs-theme-dark & {
    &, & > *, &::before, &::after {
      background-color: #414549;
    }
  }
`
