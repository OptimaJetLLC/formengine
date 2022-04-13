import {createContext} from "../../../../../../../utils/createContextHook";
import {ActionData} from "../../../../../types";

const [useActionData, ActionDataProvider] = createContext<ActionData>("ActionDataContext")

export {useActionData, ActionDataProvider}