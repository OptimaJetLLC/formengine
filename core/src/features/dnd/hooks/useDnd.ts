import _ from "lodash/fp";
import {RefObject, useMemo, useRef} from "react";
import {DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import {useComponentData} from "../../../utils/ComponenDataContext";
import {AcceptDrop, ItemType} from "../consts";
import {ComponentMove} from "../../../utils/types";

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
    const data = useComponentData()

    const [dropProps, drop] = useDrop({
        accept: AcceptDrop,
        canDrop: (item: ComponentMove, monitor) => data.componentStore.key !== item.componentStore.key,
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
        item: data,
        collect: (monitor: DragSourceMonitor<ComponentMove, unknown>) => ({
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