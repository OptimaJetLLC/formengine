import {ComponentDefinition} from "../../../features/annotation/types";
import {ComponentType, ReactElement} from "react";
import {useComponentStore} from "../../../utils/ComponentStoreContext";
import {Components} from "../../Components";

export function useChildren(currentProps: Record<string, any>, definition: ComponentDefinition<any>, wrapper?: ComponentType<{ child: ReactElement }>) {
    const componentStore = useComponentStore()

    if (!componentStore.children?.length) return

    const containers = definition.annotations.filter(value => value.isContainer);

    for (let container of containers) {
        currentProps[container.key] =
            <Components
                components={componentStore.children
                    .filter(child =>
                        child.bindTo === container.key || !child.bindTo && container.key === "children"
                    )} wrapper={wrapper}/>

    }
}