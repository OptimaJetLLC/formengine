import {ComponentDefinition, PropertyEditorProps} from "../../Types";
import {Form, Input, InputPicker} from "rsuite";
import {SyntheticEvent, useEffect, useState} from "react";
import {action, autorun, observable, toJS} from "mobx";
import _ from "lodash";
import {findNode, getAllKeys, getAllNodes, store} from "../../../stores/Store";
import {Annotation} from "../Annotation";
import {mapper} from "../../../views";
import {Node} from "../../../utils/Node"
import {Action} from "../../../utils/Types";
import {ComponentStore} from "../../../stores/ComponentStore";

export default ({model, annotation}: PropertyEditorProps<Function | undefined>) => {
    const [target, setTarget] = useState<Node | null>()
    const [targetDefinition, setTargetDefinition] = useState<ComponentDefinition<any> | null>()
    const [targetAction, setTargetAction] = useState<Action | null>()
    const [eventName, setEventName] = useState<string>("")
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!target) return

        setTargetDefinition(mapper[target.data!.type]);
    }, [target])

    useEffect(() => {
        if (!targetDefinition) return

        setCount(count + 1)
    }, [targetDefinition])

    useEffect(() => {
        if (!targetAction) return

        let a = {action: targetAction, eventName, args: [], source: model, target: target?.data!, active: true}
        store.allEvents.push(a)
    }, [targetAction]);




    let nodes = getAllNodes().map(node => {
        return {label: node.key, value: node.key, node}
    })

    let events = _.keys(targetDefinition?.annotations).filter(key => key.startsWith("on")).map(key => {
        return {label: key, value: key}
    })

    let actions = targetDefinition?.actions?.map(action => {
        return {label: action.name, value: action.name, action}
    })


    return (
        <div>
            <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
            <InputPicker data={nodes} onSelect={(value, item) => setTarget(item.node)}/>
            {events && <InputPicker data={events} onSelect={(value, item) => setEventName(value)}/>}
            {actions && <InputPicker data={actions} onSelect={(value, item) => setTargetAction(item.action)}/>}
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

