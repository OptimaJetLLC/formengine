import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../../api/types";
import _ from "lodash";
import {TransformativeType} from "../../utils/Types";
import {findNode} from "../../utils/tree";

export function transformEvent(key: string, store: ComponentStore, definition: ComponentDefinition<any>) {
    let event = store.events[key]
    if (!event) return
    let actions = event.map(value => {
        let action = definition.actions?.find((val) => val.name === value.actionName)
        if (!action) return

        //TODO трансформировать непосредственно перед вызовом
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
        return _.bind(action.func as (...args: any[]) => any, null, args)
    })

    let func = function (...arg: any[]) {
        //TODO use object for arg (eventArgs)
        arg.push(store);
        actions.forEach(value => {
            value?.(arg)
        })
    }

    return func
}