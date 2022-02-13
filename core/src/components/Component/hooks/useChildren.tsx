import {ComponentType} from "react";
import {useComponentData} from "../../../utils/ComponenDataContext";
import {Components} from "../../Components";
import {EditableProps} from "../../../features/dnd/Editable";

export function useChildren(currentProps: Record<string, any>, Wrapper?: ComponentType<EditableProps>) {
    const {componentStore, definition} = useComponentData()

    if (!componentStore.children?.length) return

    const containers = definition.annotations.filter(value => value.isContainer);

    for (let container of containers) {
        currentProps[container.key] =
            <Components
                parent={componentStore}
                components={componentStore.children
                    .filter(child =>
                        child.bindTo === container.key || !child.bindTo && container.key === "children"
                    )} Wrapper={Wrapper}/>

    }
}