import {Store} from "../../stores/Store";
import {createContext} from "../createContextHook";

const [useStore, StoreProvider] = createContext<Store>("StoreContext")

export {useStore, StoreProvider}