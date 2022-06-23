import type {CSSProperties, FC} from 'react'
import {useDragLayer, XYCoord} from 'react-dnd'
import {ItemType} from "../consts";

const layerStyles: CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
}

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

    const isFromAddElements = itemType === ItemType.AddedComponent;

    const transform = `translate(${x}px, ${y}px) scale(${isFromAddElements ? 1 : 0.8})`
    return {
        transform,
        WebkitTransform: transform,
        width: isFromAddElements ? "max-content" : 400,
        overflow: "hidden",
        background: "white",
        boxShadow: "0 5px 20px 0 rgb(0 0 0 / 35%)",
        borderRadius: 5,
    }
}

export interface CustomDragLayerProps {
}

export const CustomDragLayer: FC<CustomDragLayerProps> = (props) => {
    const {itemType, isDragging, item, initialOffset, currentOffset} =
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
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset, itemType)} id={"fb-drag-preview"}/>
        </div>
    )
}
