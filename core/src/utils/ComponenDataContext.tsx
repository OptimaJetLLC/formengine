import {createContext, ReactNode, useContext, useRef} from "react";
import {ComponentStore} from "../stores/ComponentStore";
import {useStore} from "./StoreContext";
import {ComponentDefinition} from "../features/annotation/types";

type ComponentData = {
    parent?: ComponentStore,
    componentStore: ComponentStore,
    definition: ComponentDefinition<any>,
}

const ComponentDataContext = createContext<ComponentData | undefined>(undefined);

const useComponentData = () => {
    const store = useContext(ComponentDataContext)

    if (store) return store

    throw new Error("Context didn't found!")
}

interface ComponentDataProviderProps {
    parent?: ComponentStore
    componentStore: ComponentStore
    children: ReactNode
}

const ComponentDataProvider = ({componentStore, parent, children}: ComponentDataProviderProps) => {
    const store = useStore()
    const definitionRef = useRef(store.view.get(componentStore.type))

    return (
        <ComponentDataContext.Provider value={{componentStore, parent, definition: definitionRef.current}}>
            {children}
        </ComponentDataContext.Provider>
    )
}

export {useComponentData, ComponentDataProvider}