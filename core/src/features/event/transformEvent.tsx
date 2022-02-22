import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../annotation/types";
import _ from "lodash";
import {Func, OverArgs, TransformativeType} from "../../utils/types";
import {Store} from "../../stores/Store";

export function transformEvent(store: Store, key: string, componentStore: ComponentStore, definition: ComponentDefinition<any>): [Func, Func[]] {
    let event = componentStore.events[key]
    let actions: Func[] = []

    if (!event) return [handle, actions]

    actions = event
        .filter(({actionName}) => Boolean(actionName))
        .map(value => {
            let action = definition.actions?.find((val) => val.name === value.actionName)

            if (!action)
                throw Error(`Action ${value.actionName} didn't found!`)


            return _.isEmpty(value.overArgs) ? action.func : withComputedArgs(store, action.func, value.overArgs)
        })

    /*if (value.targetKey) {
        let node = findNode(value.targetKey);
        if (node) args.target = node?.data;
    }*/

    function handle(...arg: any[]) {
        let addArgs = {source: componentStore, store}


        actions.forEach(value => {
            value?.(...arg, addArgs)
        })
    }

    return [handle, actions]
}

//TODO Сделать последовательное применение методов с помощью flow?
/**
 * Врапер, который совмещает в себе overArgs, transform и bind.
 * Принимает функцию и данные для вычисления аргументов.
 * Возвращает функцию, которая первыми параметрами передаст вычесленные аргументы при вызове.
 * Аргументы вычисляются перед вызовом.
 */
function withComputedArgs(store: Store, func: Func, overArgs: OverArgs) {
    let ac = _.overArgs(func, (value: OverArgs) => {
        let args = _.transform(value, (result, value, key) => {
            if (typeof value === "object" && value.type === TransformativeType.Foreign) {
                let node = store.findNode(value.key)
                if (node?.data.props[value.prop])
                    result[key] = node?.data.props[value.prop]
                return
            }

            result[key] = value
        }, {} as Record<string, any>)

        return args
    })

    return _.bind(ac, null, overArgs)
}