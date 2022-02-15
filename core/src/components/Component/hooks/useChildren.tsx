import {useComponentData} from "../../../utils/ComponenDataContext";
import {Components} from "../../Components";
import {Wrapper} from "../../../utils/Types";

export function useChildren(currentProps: Record<string, any>, Wrapper?: Wrapper) {
    const {componentStore, definition} = useComponentData()

    if (!componentStore.children?.length) return

    const containers = definition.annotations.filter(value => value.isContainer);

    for (let container of containers) {
        const components = componentStore.children.filter(child =>
            child.bindTo === container.key || !child.bindTo && container.key === "children"
        )

        if (!components.length) continue

        currentProps[container.key] = <Components parent={componentStore} components={components} Wrapper={Wrapper}/>
    }
}