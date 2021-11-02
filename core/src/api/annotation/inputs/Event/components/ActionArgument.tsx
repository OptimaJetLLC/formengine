import {observer} from "mobx-react";
import {FullActionDefinition, TransformativeArg, TransformativeType} from "../../../../../utils/Types";
import {useEffect, useState} from "react";
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

    return <>
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
                                data.overArgs[name] = eventKey
                                setValue(`${eventKey.key}[${eventKey.prop}]`)
                                console.log(eventKey);
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
            </InputGroup.Addon>
            <Input value={value}/>

        </InputGroup>
    </>
}

export default observer(ActionArgument)
