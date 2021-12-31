import {createContext, ReactNode, useContext} from "react";
import {ComponentStore} from "../stores/ComponentStore";

const ComponentStoreContext = createContext<ComponentStore | undefined>(undefined);

const useComponentStore = () => {
    const store = useContext(ComponentStoreContext)

    if (store) return store

    throw new Error("Context didn't found!")
}

interface ComponentStoreProviderProps {
    store: ComponentStore
    children: ReactNode
}

const ComponentStoreProvider = ({store, children}: ComponentStoreProviderProps) => {

    return (
        <ComponentStoreContext.Provider value={store}>
            {children}
        </ComponentStoreContext.Provider>
    )
}

export {useComponentStore, ComponentStoreProvider}