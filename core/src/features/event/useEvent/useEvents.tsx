import {EventTuple} from "../types";
import {useEventHandlers} from "./hooks/useEventHandlers";
import {useNotifies} from "./hooks/useNotifies";
import {useActions} from "./hooks/useActions";

export function useEvents(): EventTuple {
    const [handlers, actionsMap] = useEventHandlers()

    useNotifies(actionsMap)
    useActions(actionsMap)

    return [handlers, actionsMap]
}