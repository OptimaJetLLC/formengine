import {createContext, ReactNode, useContext} from "react";
import {Store} from "../stores/Store";

const StoreContext = createContext<Store | undefined>(undefined);

const useStore = () => {
    const store = useContext(StoreContext)

    if (store) return store

    throw new Error("Context didn't found!")
}

interface StoreProviderProps {
    store: Store
    children: ReactNode
}

const StoreProvider = ({store, children}: StoreProviderProps) => {

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export {useStore, StoreProvider}