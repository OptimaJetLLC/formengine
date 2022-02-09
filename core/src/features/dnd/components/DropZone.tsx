import React, {CSSProperties} from "react";
import classNames from "classnames";
import {useDrop} from "react-dnd";
import {useStore} from "../../../utils/StoreContext";
import {useComponentStore} from "../../../utils/ComponentStoreContext";
import {AcceptDrop, ItemType} from "../consts";

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
        accept: AcceptDrop,
        drop: (item: DragItem, monitor) => {
            let type = monitor.getItemType() as ItemType
            switch (type) {
                case ItemType.AddedComponent:
                    store.add(item.key, key, index)
                    break
                case ItemType.Component:
                    store.move1(item.key, key, index)
                    break
            }
        },
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

export {DropZone};
