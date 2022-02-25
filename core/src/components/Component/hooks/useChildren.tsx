import {useComponentData} from "../../../utils/contexts/ComponenDataContext";
import {Components} from "../../Components";
import {Wrapper} from "../../../utils/types";
import {ComponentStore} from "../../../stores/ComponentStore";

export function useChildren(currentProps: Record<string, any>, Wrapper?: Wrapper) {
    const {componentStore, definition} = useComponentData()

    if (!componentStore.children?.length) return

    const containers = definition.annotations.filter(value => value.isContainer);

    for (let container of containers) {
        const isChild = (child: ComponentStore) =>
            child.bindTo === container.key || !child.bindTo && container.key === "children"

        const isVisible = (child: ComponentStore) =>
            container.bindTo ? child.visible === componentStore.props[container.bindTo] : true

        const components = componentStore.children.filter(isChild).filter(isVisible)

        currentProps[container.key] =
            components.length
                ? <Components parent={componentStore} components={components} Wrapper={Wrapper}/>
                : null
    }
}