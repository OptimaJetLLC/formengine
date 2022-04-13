import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../../features/annotation/types";
import {createContext} from "../createContextHook";

export type ComponentData = {
    readonly parent?: ComponentStore,
    readonly componentStore: ComponentStore,
    readonly definition: ComponentDefinition<any>,
}

const [useComponentData, ComponentDataProvider] = createContext<ComponentData>("ComponentDataContext")

export {useComponentData, ComponentDataProvider}