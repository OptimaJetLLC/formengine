import {RefObject, useMemo, useRef} from "react";
import {DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import {DragItem} from "../components/DropZone";
import {DropResult} from "react-beautiful-dnd";
import {useComponentStore} from "../../../utils/ComponentStoreContext";
import {ItemType} from "../consts";

interface Collect {
    isDragging: boolean,
    isActive: boolean,
    isOver: boolean,
    canDrop: boolean,
    opacity: number,
    padding: number
}

export const useDnd = (): [Collect, RefObject<any>] => {
    const dnd = useRef(null)
    const {key} = useComponentStore()

    const [dropProps, drop] = useDrop({
        accept: [ItemType.Component],
        canDrop: (item: DragItem, monitor) => key !== item.key,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            isActive: monitor.isOver() && monitor.canDrop(),
            padding: monitor.isOver() && monitor.canDrop() ? 10 : 0,

        }),
    }, []);

    const [dragProps, drag] = useDrag(() => ({
        type: ItemType.Component,
        item: {key},
        collect: (monitor: DragSourceMonitor<DragItem, DropResult>) => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    }), []);

    const collect: Collect = useMemo(() => ({...dropProps, ...dragProps}), [dropProps, dragProps])

    drop(drag(dnd))

    return [collect, dnd]
}