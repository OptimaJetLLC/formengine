import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../../api/types";
import _ from "lodash";
import {TransformativeType} from "../../utils/Types";
import {findNode} from "../../utils/tree";

export function transformEvent(key: string, store: ComponentStore, definition: ComponentDefinition<any>):
    [(...arg: any[]) => void, ((...arg: any[]) => void)[]]{
    let event = store.events[key]
    let actions: ((...args: any[]) => void)[] = []
    //TODO всегда возвращать обработчик?
    if (!event) return [handle, actions]

    actions = event.filter(({actionName})=> Boolean(actionName)).map(value => {
        let action = definition.actions?.find((val) => val.name === value.actionName)

        if (!action)
            throw Error(`Action ${value.actionName} didn't found!`)

        let ac = _.overArgs(action.func, (value) => {
            if (typeof value === "object" && value.type === TransformativeType.Foreign) {
                let node = findNode(value.key)
                if (node?.data?.props[value.prop])
                    return node?.data?.props[value.prop]
            }
            return value
        })

        return _.bind(ac, null, value.overArgs)

        //TODO check it
        /*//TODO трансформировать непосредственно перед вызовом
        let args = _.transform(value.overArgs, (result, value, key) => {
            if (typeof value === "object" && value.type === TransformativeType.Foreign) {
                let node = findNode(value.key)
                if (node?.data?.props[value.prop])
                    result[key] = node?.data?.props[value.prop]
                return
            }

            result[key] = value
        }, {} as Record<string, any>)

        if (value.targetKey) {
            let node = findNode(value.targetKey);
            if (node) args.target = node?.data;
        }
        return _.bind(action.func as (...args: any[]) => any, null, args)*/
    })


    function handle(...arg: any[]) {
        //TODO First arg is value for on change
        //TODO use object for arg (eventArgs)
        arg.push(store);
        actions.forEach(value => {
            value?.(arg)
        })
    }

    return [handle, actions]
}