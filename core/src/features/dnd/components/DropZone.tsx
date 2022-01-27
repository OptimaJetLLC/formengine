import React, {CSSProperties} from "react";
import classNames from "classnames";
import {useDrop} from "react-dnd";
import {observer} from "mobx-react";
import {Node} from "../../../utils/Node";
import {useStore} from "../../../utils/StoreContext";
import {useComponentStore} from "../../../utils/ComponentStoreContext";

export interface DragItem {
    key: string
    node: Node
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
    background: "#00a2ff",
    transition: "100ms all",
}


const DropZone = (({index, isLast, className}: DropZoneProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const key = componentStore.key

    const [{isOver, canDrop}, drop] = useDrop({
        accept: "Component",
        drop: (item: DragItem, monitor) => {
            store.move1(item.key, key, index)
        },
        canDrop: (item, monitor) => {
            if (key === item.key) return false

            return true
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

export {DropZone};
