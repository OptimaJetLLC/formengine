import {useDrop} from "react-dnd";
import {useComponentData} from "../../../../../utils/contexts/ComponenDataContext";
import {AcceptDrop, ItemType} from "../../../consts";
import {ComponentMove} from "../../../../../utils/types";
import {useStore} from "../../../../../utils/contexts/StoreContext";
import {ConnectDropTarget} from "react-dnd/dist/types/types";

interface DropState {
    isActive: boolean,
    isOver: boolean,
}

export const useDropZone = (isAfter: boolean, isInner?: boolean): [DropState, ConnectDropTarget] => {
    const store = useStore();
    const target = useComponentData();
    const {bindTo} = target.componentStore;

    const [{isActive, isOver}, drop] = useDrop({
        accept: AcceptDrop,
        drop: (source: ComponentMove, monitor) => {
            let type = monitor.getItemType() as ItemType
            switch (type) {
                case ItemType.AddedComponent:
                case ItemType.Component:
                    //TODO механизм биндинга свойств
                    source.componentStore.bindTo = bindTo
                    if (isInner)
                        store.move(source, {
                            componentStore: target.componentStore,
                        }, isAfter, isInner)
                    else
                        store.move(source, target, isAfter, isInner)
                    break
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isActive: monitor.isOver() && monitor.canDrop(),
        })
    });

    return [{isActive, isOver}, drop]
}
