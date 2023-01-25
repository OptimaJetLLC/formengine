import styled from '@emotion/styled'
import {useDragLayer, XYCoord} from 'react-dnd'
import {ItemType} from '../consts'

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  itemType: any
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  let {x, y} = currentOffset

  const isFromAddElements = itemType === ItemType.AddedComponent

  const transform = `translate(${x}px, ${y}px) scale(${isFromAddElements ? 1 : 0.8})`
  return {
    transform,
    WebkitTransform: transform,
    width: isFromAddElements ? 'max-content' : 400,
  }
}

export const CustomDragLayer = () => {
  const {itemType, isDragging, initialOffset, currentOffset} =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  if (!isDragging) {
    return null
  }
  return (
    <Layer>
      <Container style={getItemStyles(initialOffset, currentOffset, itemType)} id={'fb-drag-preview'}/>
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
  overflow: hidden;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 35%);
  border-radius: 5px;
  background-color: white;

  .rs-theme-dark & {
    background-color: #414549;
  }
`
