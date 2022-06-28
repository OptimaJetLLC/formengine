import {useEffect} from "react";
import {ConnectDragSource, useDrag} from "react-dnd";
import {useComponentData} from "../../../../../utils/contexts/ComponenDataContext";
import {ItemType} from "../../../consts";
import {getEmptyImage} from "react-dnd-html5-backend";

interface DragState {
    isDragging: boolean,
}

export const useDragWithPreview = (type: ItemType): [DragState, ConnectDragSource] => {
    const item = useComponentData();
    const [state, drag, preview] = useDrag(() => ({
        type, item,
        collect: (monitor) => ({isDragging: monitor.isDragging()}),
    }), []);

    useEffect(() => {
        preview(getEmptyImage());
    }, [state.isDragging, preview]);

    return [state, drag]
}
