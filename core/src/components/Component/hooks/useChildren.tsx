import {useComponentData} from "../../../utils/ComponenDataContext";
import {Components} from "../../Components";
import {Wrapper} from "../../../utils/Types";

export function useChildren(currentProps: Record<string, any>, Wrapper?: Wrapper) {
    const {componentStore, definition} = useComponentData()

    if (!componentStore.children?.length) return

    const containers = definition.annotations.filter(value => value.isContainer);

    for (let container of containers) {
        const components = componentStore.children.filter(child =>
            container.bindTo ? child.bindTo === componentStore.props[container.bindTo] :
                (child.bindTo === container.key ||
                    !child.bindTo && container.key === "children")
        )

        currentProps[container.key] =
            components.length
                ? <Components parent={componentStore} components={components} Wrapper={Wrapper}/>
                : null
    }
}