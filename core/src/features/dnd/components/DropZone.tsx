import React, {CSSProperties} from "react";
import classNames from "classnames";
import {useDrop} from "react-dnd";
import {observer} from "mobx-react";
import {Node} from "../../../utils/Node";
import {useStore} from "../../../utils/StoreContext";
import {useComponentStore} from "../../../utils/ComponentStoreContext";
import {ItemType} from "../consts";

export interface DragItem {
    key: string
}

interface DropZoneProps {
    index: number
    isLast?: any
    className?: any
}

const dropzone: CSSProperties = {
    flex: "0 0 auto",
    height: "40px",
    transition: "200ms all",
    background: "#00a2ff",
}
const active: CSSProperties = {
    background: "#4caf50",
    transition: "100ms all",
}


const DropZone = (({index, isLast, className}: DropZoneProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const key = componentStore.key

    const [{isOver, canDrop, isActive}, drop] = useDrop({
        accept: [ItemType.Component],
        drop: (item: DragItem, monitor) => {
            store.move1(item.key, key, index)
        },
        canDrop: (item, monitor) => key !== item.key,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            isActive: monitor.isOver() && monitor.canDrop(),
        }),
    });

    let height = 0
    let marginTop = 0

    if (isActive) {
        height = 40
    } else if (canDrop) {
        height = 10
        marginTop = 5

    } else {
        height = 0

    }

    const isActiveStyle = isActive ? active : {}

    return (
        <div
            className={classNames(
                "dropZone",
                {active: isActive, isLast},
                className
            )}
            style={{...dropzone, ...isActiveStyle, height, marginTop}}
            ref={drop}
        >
        </div>
    );
});

const DropZone1 = (({index, isLast, className}: DropZoneProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const key = componentStore.key

    const [{isOver, canDrop}, drop] = useDrop({
        accept: "Component",
        drop: (item: DragItem, monitor) => {
            store.move1(item.key, key, index)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        hover: (item, monitor) => {
            let a = 4
        }
    });

    let height = 0
    let marginTop = 0
    const isActive = isOver && canDrop

    if (isActive) {
        height = 40
    } else {
        height = 20
    }

    const isActiveStyle = isActive ? active : {}

    return (
        <div
            className={classNames(
                "dropZone",
                {active: isActive, isLast},
                className
            )}
            style={{...dropzone, ...isActiveStyle, height, marginTop}}
            ref={drop}
        >
        </div>
    );
});

export {DropZone, DropZone1};
