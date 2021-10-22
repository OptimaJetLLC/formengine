import _ from "lodash";
import {Action, ComponentDefinition, PropertyEditorProps} from "../../Types";
import {Dropdown,Input, InputGroup, InputPicker, Popover, Whisper} from "rsuite";
import {useEffect} from "react";
import {computed} from "mobx";
import {findNode, getAllNodes, store} from "../../../stores/Store";
import {Node} from "../../../utils/Node"
import {ComponentStore} from "../../../stores/ComponentStore";
import {useLocalObservable} from "mobx-react";
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import {Arg} from "../../../utils/Types";


const nodes = computed(() => getAllNodes().map(node => ({label: node.key, value: node.key, item: node})))

export default ({model, annotation}: PropertyEditorProps<Function | undefined>) => {
    const target = useLocalObservable(() => ({
        node: null as Node | null,
        chosenAction: null as Action | null,
        chosenActionArg: [] as Arg[],

        get actions() {
            return this.node?.definition?.actions?.map(action => ({label: action.name, value: action.name, action}))
        }
    }))

    useEffect(() => {
        let action = target.chosenAction
        if (!action) return

        store.addEvent(action, annotation.key, target.chosenActionArg, model, target.node!.data!, true)
    }, [target.chosenAction]);


    //TODO Icon for computed field
    return (
        <div>
            <label>{annotation.title}:</label>
            <InputPicker block placeholder={"Target"} data={nodes.get()}
                         onSelect={(value, item) => target.node = item.item}/>
            {target.actions &&
            <InputPicker block placeholder={"Action"} data={target.actions}
                         onSelect={(value, item) => target.chosenAction = item.action}/>}
            {target.chosenAction?.args?.map(value => {
                return (
                    <>
                        <label>{value}</label>
                        <InputGroup>
                            <InputGroup.Addon>
                                <Whisper
                                    placement="leftEnd" trigger="click"
                                    children={<ArrowDownIcon/>}
                                    speaker={
                                        ({onClose, left, top, className}, ref) => {
                                            const handleSelect = (eventKey: any) => {
                                                onClose();
                                                target.chosenActionArg.push(eventKey)
                                                console.log(eventKey);
                                            };
                                            return (
                                                <Popover ref={ref} className={className} style={{left, top}} full>
                                                    <Dropdown.Menu onSelect={handleSelect}>
                                                        {nodes.get().map((node) =>
                                                            <Dropdown.Menu
                                                                key={node.item.key}
                                                                title={node.item.key}
                                                                children={_.keys((node.item).definition?.annotations).map((key) =>
                                                                    <Dropdown.Item
                                                                        key={key}
                                                                        eventKey={{
                                                                            key: node.item.key,
                                                                            prop: key,
                                                                            name: value
                                                                        } as Arg}
                                                                        children={key}/>)}/>
                                                        )}
                                                    </Dropdown.Menu>
                                                </Popover>
                                            );
                                        }}/>
                            </InputGroup.Addon>
                            <Input/>

                        </InputGroup>
                    </>
                )
            })}
        </div>
    );
}


export function parseFunc(key: string, store: ComponentStore, definition: ComponentDefinition<any>) {
    let event = store.events[key]
    if (!event) return
    let actions = event.targets.map(value => {
        let action = definition.actions?.find((val) => val.name === value.action)
        if (!action) return

        let args = value.args.reduce((acc, arg) => {
            let node = findNode(arg.key)
            if (node?.data?.props[arg.prop])
                acc[arg.name] = node?.data?.props[arg.prop]

            return acc
        }, {} as Record<string, Arg>)

        return _.bind(action.func as (...args: any[]) => any, null, args)
    })

    let func = function (...arg: any[]) {
        actions.forEach(value => {
            value?.(arg)
        })
        debugger
    }

    return func
}
