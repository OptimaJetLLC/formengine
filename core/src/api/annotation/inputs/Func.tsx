import _ from "lodash";
import {ComponentDefinition, PropertyEditorProps} from "../../Types";
import {Dropdown, IconButton, Input, InputGroup, InputPicker, List, Panel, Popover, Whisper} from "rsuite";
import {useEffect, useState} from "react";
import {autorun, computed, reaction, toJS} from "mobx";
import {findNode, getAllNodes, store} from "../../../stores/Store";
import {Node} from "../../../utils/Node"
import {ComponentStore} from "../../../stores/ComponentStore";
import {observer, useLocalObservable} from "mobx-react";
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import PlusIcon from '@rsuite/icons/Plus';
import {Action, ArgDef, Args, ArgType, FullEvent} from "../../../utils/Types";


const nodes = computed(() => getAllNodes().map(node => ({label: node.key, value: node.key, item: node})))

//EventEditor: one event - one editor
export default ({componentStore, annotation}: PropertyEditorProps<Function | undefined>) => {
    const [state, setState] = useState<undefined | FullEvent[]>()
    useEffect(() => {
        autorun(() => {
            setState(store.allEvents.get(componentStore)?.[annotation.key])
            console.log(toJS(store.allEvents.get(componentStore)?.[annotation.key]))
        })
    }, [])

    return <div>
        <label>{annotation.title}:</label>

        {/*TODO Draggable List*/}
        <List>
            {state?.map(data => <ActionItem key={data.action.name} data={data}/>)}
        </List>

        <AddActionButton onSelect={(eventKey: { node: Node, action: Action }) => {
            //TODO hide this
            store.addEvent(eventKey.action, annotation.key, {}, componentStore, eventKey.node.data!)
            console.log(eventKey);
        }}/>
    </div>;
}

const AddActionButton = ({onSelect}: { onSelect: (eventKet: any) => void }) => {


    return <Whisper placement="bottomStart" trigger="click"
                    speaker={({onClose, left, top, className}, ref) =>
                        <Popover ref={ref} className={className} style={{left, top}} full>
                            <Dropdown.Menu onSelect={(eventKey: any) => {
                                onClose();
                                onSelect(eventKey);
                            }}>
                                {getAllNodes()
                                    .filter(node => !_.isEmpty(node.definition?.actions))
                                    .map((node) =>
                                        <Dropdown.Menu
                                            key={node.key}
                                            title={node.key}
                                            children={
                                                node.definition?.actions?.map((action) =>
                                                    <Dropdown.Item
                                                        key={action.name}
                                                        eventKey={{node, action}}
                                                        children={action.name}
                                                    />)
                                            }
                                        />
                                    )}
                            </Dropdown.Menu>
                        </Popover>
                    }>
        <IconButton block icon={<PlusIcon/>} appearance="subtle" placement="left" children="Add another action"/>
    </Whisper>

}

const ActionItem = observer(({data}: { data: FullEvent }) => {

    return <List.Item>
        <Panel header={`${data.target!.key}.${data.action.name}`} collapsible bordered>
            {data.action?.args?.map(argName => <ParameterInput key={argName} name={argName} data={data}/>)}
        </Panel>
    </List.Item>;
})


const ParameterInput = observer(({name, data}: { name: string, data: FullEvent }) => {
    const [value, setValue] = useState("")

    useEffect(() => {
        //let arg = _.find(data.chosenActionArg, ['name', name])
        //if (arg) setValue(`${arg.foreignKey}[${arg.prop}]`)

        let arg = data.args[name]
        if (arg){
            if (typeof arg === "object" && arg.type === ArgType.Foreign) {
                setValue(`${arg.key}[${arg.prop}]`)
                return
            }
            setValue(arg.toString())
        }

    }, [])

    return (
        <>
            <label>{name}</label>
            <InputGroup>
                <InputGroup.Addon>
                    <Whisper
                        placement="leftEnd" trigger="click"
                        children={<ArrowDownIcon/>}
                        speaker={
                            ({onClose, left, top, className}, ref) => {
                                const handleSelect = (eventKey: any) => {
                                    onClose();
                                    data.args[name] = eventKey
                                    setValue(`${eventKey.key}[${eventKey.prop}]`)
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
                                                                type: ArgType.Foreign,
                                                                key: node.item.key,
                                                                prop: key
                                                            } as ArgDef}
                                                            children={key}/>)}/>
                                            )}
                                        </Dropdown.Menu>
                                    </Popover>
                                );
                            }}/>
                </InputGroup.Addon>
                <Input value={value}/>

            </InputGroup>
        </>
    )
})

export function transformEvent(key: string, store: ComponentStore, definition: ComponentDefinition<any>) {
    let event = store.events[key]
    if (!event) return
    let actions = event.map(value => {
        let action = definition.actions?.find((val) => val.name === value.actionName)
        if (!action) return

        //TODO трансформировать непосредственно перед вызовом
        let args = _.transform(value.args, (result, value, key) => {
            if (typeof value === "object" && value.type === ArgType.Foreign) {
                let node = findNode(value.key)
                if (node?.data?.props[value.prop])
                    result[key] = node?.data?.props[value.prop]
                return
            }

            result[key] = value
        }, {} as Record<string, any>)

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
