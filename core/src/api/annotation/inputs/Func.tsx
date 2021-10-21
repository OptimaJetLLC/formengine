import _ from "lodash";
import {Action, ComponentDefinition, PropertyEditorProps} from "../../Types";
import {InputPicker} from "rsuite";
import {useEffect, useState} from "react";
import {computed} from "mobx";
import {getAllNodes, store} from "../../../stores/Store";
import {mapper} from "../../../views";
import {Node} from "../../../utils/Node"
import {ComponentStore} from "../../../stores/ComponentStore";
import {useLocalObservable} from "mobx-react";

const nodes = computed(() => getAllNodes().map(node => ({label: node.key, value: node.key, node})))

export default ({model, annotation}: PropertyEditorProps<Function | undefined>) => {
    const target = useLocalObservable(() => ({
        node: null as Node | null,
        chosenAction: null as Action | null,

        get definition() {
            return mapper[this.node?.data?.type ?? ""] ?? null
        },

        get actions() {
            return this.definition?.actions?.map(action => ({label: action.name, value: action.name, action}))
        },
    }))

    useEffect(() => {
        let action = target.chosenAction
        if (!action) return

        store.addEvent(action, annotation.key, [], model, target.node!.data!, true)
    }, [target.chosenAction]);


    return (
        <div>
            <label>{annotation.title}:</label>
            <InputPicker block placeholder={"Target"} data={nodes.get()}
                         onSelect={(value, item) => target.node = item.node}/>
            {target.actions &&
            <InputPicker block placeholder={"Action"} data={target.actions}
                         onSelect={(value, item) => target.chosenAction = item.action}/>}
            {/*Блок с параметрами от экшина*/}
            {/*<Input
                value={model.props[annotation.key].source}
                onChange={source => {

                    //let b = findNode(a[1])
                    //let func = parseFunc(source)
                    //model.props[annotation.key] = func;
                }}
            />*/}
        </div>
    );
}


export function parseFunc(key: string, store: ComponentStore, definition: ComponentDefinition<any>) {
    let event = store.events[key]
    if (!event) return
    let actions = event.targets.map(value => {
        let action = definition.actions?.find((val) => val.name === value.action)
        if (!action) return

        return _.bind(action.func as (...args: any[]) => any, null, value.args)
    })

    let func = function (...arg: any[]) {
        actions.forEach(value => {
            value?.(arg)
        })
        debugger
    }

    return func
}

