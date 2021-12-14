import {createContext, ReactNode, useContext} from "react";
import {Store} from "../stores/Store";
import {DefineRegistry} from "./DefineRegistry";

//const StoreContext = createContext<Store | undefined>(new Store(new DefineRegistry()));
const StoreContext = createContext<Store | undefined>(undefined);

/*class AppProvider extends Component {

    render() {
        return (
            <StoreContext.Provider>

    }

}*/
const useStore = () => {
    const store = useContext(StoreContext)

    if (store)
        return store

    throw new Error("Context didn't found!")
}

const StoreProvider = ({view, children}: { view: DefineRegistry, children: ReactNode }) => {
    const store = useContext(StoreContext)

    return (
        <StoreContext.Provider value={store ?? new Store(view)}>
            {children}
        </StoreContext.Provider>
    )
}

export {useStore, StoreProvider}