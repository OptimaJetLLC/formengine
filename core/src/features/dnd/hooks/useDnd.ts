import {RefObject, useMemo, useRef} from "react";
import {DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import {DragItem} from "../components/DropZone";
import {useComponentStore} from "../../../utils/ComponentStoreContext";
import {AcceptDrop, ItemType} from "../consts";
import _ from "lodash/fp";

interface DndState {
    isDragging: boolean,
    isActive: boolean,
    isOver: boolean,
    canDrop: boolean,
    style: {
        opacity: number,
        padding: number,
    }
}

export const useDnd = (): [DndState, RefObject<any>] => {
    const dnd = useRef(null)
    const {key} = useComponentStore()

    const [dropProps, drop] = useDrop({
        accept: AcceptDrop,
        canDrop: (item: DragItem, monitor) => key !== item.key,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            isActive: monitor.isOver() && monitor.canDrop(),
            style: {
                padding: monitor.isOver() && monitor.canDrop() ? 10 : 0,
            }
        }),
    }, []);

    const [dragState, drag] = useDrag(() => ({
        type: ItemType.Component,
        item: {key},
        collect: (monitor: DragSourceMonitor<DragItem, unknown>) => ({
            isDragging: monitor.isDragging(),
            style: {
                opacity: monitor.isDragging() ? 0.4 : 1,
            }
        }),
    }), []);

    const state: DndState = useMemo(() => (_.merge(dropProps, dragState)), [dropProps, dragState])

    drop(drag(dnd))

    return [state, dnd]
}