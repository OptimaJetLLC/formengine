import {useStore} from "../../../../utils/contexts/StoreContext";
import {useComponentData} from "../../../../utils/contexts/ComponenDataContext";
import {forIn, transform} from "lodash";
import {ActionEventHandler, EventName, Func, WeakArgs, WeakActionData} from "../../types";
import {processBinds} from "../../../substitution/utils";
import {useEffect} from "react";
import {ActionEvent} from "../../utils/ActionEvent";

export const useActions = (actionsMap: Record<EventName, ActionEventHandler[]>) => {
    const store = useStore()
    const {componentStore: {events}} = useComponentData()

    useEffect(() => {
        forIn(events, (weakActions: WeakActionData[], eventName) => {
            weakActions.forEach((data) => {
                const {args, func} = store.findAction(data.actionName, data.targetKey)
                const action = args ? getActionHandler(func, data.weakArgs) : func
                actionsMap[eventName].push(action)
            })
        })
    }, [])


    function getActionHandler(func: Func, weakArgs?: WeakArgs) {
        //TODO init in default value for arguments?
        return function (e: ActionEvent) {
            const actionArgs = !weakArgs ? {} :
                transform(weakArgs, (result: Record<string, any>, value, argumentName) =>
                    result[argumentName] = processBinds(value, store))
            func(actionArgs, e)
        }
    }
}

