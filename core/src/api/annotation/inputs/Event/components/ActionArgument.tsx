import {observer} from "mobx-react";
import {FullActionDefinition, TransformativeArg, TransformativeType} from "../../../../../utils/Types";
import React, {useEffect, useState} from "react";
import {Dropdown, Input, InputGroup, Popover, Whisper} from "rsuite";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import _ from "lodash";
import {computed} from "mobx";
import {getAllNodes} from "../../../../../utils/tree";

const nodes = computed(() => getAllNodes().map(node => ({label: node.key, value: node.key, item: node})))

const ActionArgument = ({name, data}: { name: string, data: FullActionDefinition }) => {
    const [value, setValue] = useState("")

    useEffect(() => {
        let arg = data.overArgs[name]
        if (arg) {
            if (typeof arg === "object" && arg.type === TransformativeType.Foreign) {
                setValue(`${arg.key}[${arg.prop}]`)
                return
            }
            setValue(arg.toString())
        }

    }, [])

    const onChange = (eventKey: any) => {
        let value = eventKey;
        data.overArgs[name] = eventKey
        if (typeof eventKey === "object") {
            value = `${eventKey.key}[${eventKey.prop}]`;
        }
        setValue(value);
    };

    return <div style={{display: "flex", flexDirection: "column", flex: 1}}>
        <label>{name}</label>
        <InputGroup>

            <Input value={value} onChange={onChange}/>
            <Whisper
                trigger="click" placement={"auto"}
                children={<InputGroup.Button><ArrowDownIcon/>
                </InputGroup.Button>}
                speaker={
                    ({onClose, left, top, className}, ref) => {
                        const handleSelect = (eventKey: any) => {
                            onClose();
                            onChange(eventKey);
                        };
                        return <Popover ref={ref} className={className} style={{left, top}} full>
                            <Dropdown.Menu onSelect={handleSelect}>
                                {nodes.get().map((node) =>
                                    <Dropdown.Menu
                                                key={node.item.key}
                                                title={node.item.key}
                                                children={_.keys((node.item).definition?.annotations).map((key) =>
                                                    <Dropdown.Item
                                                        key={key}
                                                        eventKey={{
                                                            type: TransformativeType.Foreign,
                                                            key: node.item.key,
                                                            prop: key
                                                        } as TransformativeArg}
                                                        children={key}/>)}/>
                                )}
                            </Dropdown.Menu>
                        </Popover>;
                    }}/>

        </InputGroup>
    </div>
}

export default observer(ActionArgument)
