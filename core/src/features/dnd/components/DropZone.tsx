import React, {CSSProperties, useMemo} from "react";
import classNames from "classnames";
import {useDrop} from "react-dnd";
import {useStore} from "../../../utils/StoreContext";
import {useComponentData} from "../../../utils/ComponenDataContext";
import {AcceptDrop, ItemType} from "../consts";
import {ComponentStore} from "../../../stores/ComponentStore";
import {ComponentDefinition} from "../../annotation/types";
import {observer} from "mobx-react";

export interface DragItem {
    key: string
}

interface DropZoneProps {
    isBefore: boolean
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

export type NodeData = {
    readonly componentStore: ComponentStore
    readonly parent?: ComponentStore
}

const DropZone = observer(({isBefore, isLast, className}: DropZoneProps) => {
    const store = useStore()
    const target = useComponentData()

    const [{isOver, isActive}, drop] = useDrop({
        accept: AcceptDrop,
        drop: (source: NodeData, monitor) => {
            let type = monitor.getItemType() as ItemType
            switch (type) {
                case ItemType.AddedComponent:
                case ItemType.Component:
                    store.move(source, target, isBefore)
                    break
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            //canDrop: monitor.canDrop(),
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
