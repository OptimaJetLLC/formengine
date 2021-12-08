import {observer} from "mobx-react";
import {FullActionDefinition, TransformativeType} from "../../../utils/Types";
import React, {useEffect, useState} from "react";
import {IconButton, Input, InputGroup, Nav, Popover, SelectPicker, TreePicker, Whisper} from "rsuite";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import CloseIcon from '@rsuite/icons/Close';
import _ from "lodash";
import {LabeledInput} from "../../../components/UI/Containers";
import {store} from "../../../stores/Store";
import {Node} from "../../../utils/Node";
import {ItemDataType} from "rsuite/esm/@types/common";
import {NavIconItem} from "../../../components/UI/NavIconItem";
import * as faLink from "@fortawesome/free-solid-svg-icons/faLink"
import * as faCode from "@fortawesome/free-solid-svg-icons/faCode"
import styled from "@emotion/styled";

const ActionArgument = ({name, data}: { name: string, data: FullActionDefinition }) => {
    const [value, setValue] = useState("")
    const [node, setNode] = useState<Node>();
    const [prop, setProp] = useState<string>();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const options: any = node ? _.keys(node.definition?.annotations).map((key) =>
        ({value: key, label: key})
    ) : []

    useEffect(() => {
        let arg = data.overArgs[name]
        if (arg) {
            if (typeof arg === "object" && arg.type === TransformativeType.Foreign) {
                setValue(`${arg.key}[${arg.prop}]`)
                return
            }
            setValue(arg.toString())
        }

    }, []);

    const onChange = (prop: string) => {
        if (!node?.key || !prop) return;
        setProp(prop);
        data.overArgs[name] = prop;
        setValue(`${node?.key}[${prop}]`);
    };

    return <LabeledInput style={{display: "flex", flexDirection: "column", flex: 1}}>
        <label>{name}</label>
        <InputGroup size={"sm"}>

            <Input value={value} onChange={(val) => setValue(val as string)}/>
            <Whisper
                trigger="none" placement={"auto"} open={showPopup}
                children={<InputGroup.Button onClick={() => setShowPopup(!showPopup)}><ArrowDownIcon/>
                </InputGroup.Button>}
                speaker={
                    ({onClose, left, top, className}, ref) => {
                        const handleSelect = (activeNode: any) => {
                            onClose();
                            setNode(activeNode);
                            //onChange(activeNode);
                        };
                        return <Popover ref={ref} className={className}
                                        style={{left, top, marginLeft: -217}} full>
                            <Nav appearance="subtle" activeKey={"Linked property"}
                                 style={{marginBottom: 10}}>
                                {NavIconItem("Linked property", faLink)}
                                {NavIconItem("Expression", faCode)}
                            </Nav>
                            <CloseButton icon={<CloseIcon/>} onClick={() => setShowPopup(!showPopup)}
                                         appearance={"primary"} size={"xs"} circle/>
                            <div style={{padding: "0 15px 15px 15px"}}>
                                <LabeledInput>
                                    <label>Element</label>
                                    <TreePicker
                                        defaultExpandAll={true}
                                        onSelect={handleSelect}
                                        value={node?.key}
                                        labelKey="key"
                                        valueKey="key"
                                        style={{maxHeight: 'inherit', height: 'inherit'}}
                                        data={store.tree.children as ItemDataType[]}
                                    />
                                </LabeledInput>
                                <LabeledInput>
                                    <label>Property</label>
                                    <SelectPicker data={options} value={prop}
                                                  onSelect={onChange}/>
                                </LabeledInput>

                            </div>
                        </Popover>;
                    }}/>

        </InputGroup>
    </LabeledInput>
}

const CloseButton = styled(IconButton)`
  right: -11px;
  position: absolute;
  top: -7px;
`

export default observer(ActionArgument)
