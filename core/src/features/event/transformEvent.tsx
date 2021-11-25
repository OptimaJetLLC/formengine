import {ComponentStore} from "../../stores/ComponentStore";
import {ComponentDefinition} from "../annotation/types";
import _ from "lodash";
import {Func, OverArgs, TransformativeType} from "../../utils/Types";
import {findNode} from "../../utils/tree";
import {toJS} from "mobx";

export function transformEvent(key: string, store: ComponentStore, definition: ComponentDefinition<any>): [Func, Func[]] {
    let event = store.events[key]
    let actions: Func[] = []

    if (!event) return [handle, actions]

    actions = event
        .filter(({actionName}) => Boolean(actionName))
        .map(value => {
            let action = definition.actions?.find((val) => val.name === value.actionName)

            if (!action)
                throw Error(`Action ${value.actionName} didn't found!`)


            return _.isEmpty(value.overArgs) ? action.func : withComputedArgs(action.func, value.overArgs)
        })

    /*if (value.targetKey) {
        let node = findNode(value.targetKey);
        if (node) args.target = node?.data;
    }*/

    function handle(...arg: any[]) {
        let addArgs = {source: store}


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
function withComputedArgs(func: Func, overArgs: OverArgs) {
    let ac = _.overArgs(func, (value: OverArgs) => {
        let args = _.transform(value, (result, value, key) => {
            if (typeof value === "object" && value.type === TransformativeType.Foreign) {
                let node = findNode(value.key)
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