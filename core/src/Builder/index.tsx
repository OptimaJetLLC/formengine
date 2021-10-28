import _ from "lodash";
import { configure } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Button, Col, Dropdown, Nav, Row, Tree } from "rsuite";
import { DragDropContext, DragStart, ResponderProvided, DropResult } from "react-beautiful-dnd";
import { ItemDataType } from "rsuite/esm/@types/common";
import { ComponentStore } from "../stores/ComponentStore";
import { store } from "../stores/Store";
import { downloadForm } from "../utils/downloadForm";
import { Node } from "../utils/Node";
import { uploadForm } from "../utils/uploadForm";
import { mapper } from "../views";
import BuilderWrapper from "./components/BuilderWrapper";
import { FormViewer, FormViewerProps } from "../FormViewer";
import {treeMap, treeSearch} from "../utils/treeFunctions";


export interface FormBuilderProps extends FormViewerProps {

}

export const FormBuilder = observer((props: FormBuilderProps) => {
    const [currentExpandedKeys, setCurrentExpandedKeys] = useState<any[]>([]);
    let expandedNodesKeys: string[] | never = [];
    const extractParentNodesKeys = (node: Node | null) => {
        if (node?.parent?.data?.key) {
            expandedNodesKeys.push(node.parent.data.key);
            extractParentNodesKeys(node.parent);
        }
        expandedNodesKeys = expandedNodesKeys.concat(currentExpandedKeys);
    }
    extractParentNodesKeys(store.currentNode);

    const onDragEnd= (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (source?.droppableId === "TOOLBAR") {
                //console.log('TOOLBAR', draggableId);
            } else {
                store.move(draggableId, destination?.droppableId, destination?.index);
            }
        }

    return <div>
        <Button onClick={downloadForm}>Download</Button>
        <Button onClick={uploadForm}>Upload</Button>
        <Button onClick={store.clear}>Clear</Button>
        <Dropdown title={"Components"}>
            {_.keys(mapper).map(value =>
                <Dropdown.Item key={value} onClick={() => store.add(value)}>{value}</Dropdown.Item>)}
        </Dropdown>

        <br/><br/>
        <DragDropContext onDragEnd={onDragEnd}>
            <Row>
                <Col md={4}>
                    <Tree
                        draggable
                        onSelect={(activeNode) => store.currentNode = activeNode as Node}
                        value={store.currentNode?.data?.key}
                        expandItemValues={expandedNodesKeys}
                        onExpand={(expandItemValues: any []) => {
                            setCurrentExpandedKeys(expandItemValues);

                        }}
                        labelKey="key"
                        valueKey="key"
                        style={{maxHeight: 'inherit', height: 'inherit'}}
                        data={store.tree.children as ItemDataType[]}
                    />
                </Col>

                <Col md={15}>
                    {/*<FormViewer {...props} wrapper={BuilderWrapper}/></Col>*/}
                    <FormViewer {...props} /></Col>
                <Col md={5}> <PropertiesEditor/> </Col>
            </Row>
        </DragDropContext>
    </div>;
})

const PropertiesEditor = observer(() => {
    const [activeTab, setActiveTab] = useState('main');
    const currentModel = store.currentNode?.data

    if (!currentModel) return null

    const annotations = mapper[currentModel.type].annotations

    let a = _.values(annotations).map(value => value.render())

    return (
        <>
            <Nav appearance={"tabs"} activeKey={activeTab} onSelect={setActiveTab} style={{width: 150}}>
                <Nav.Item eventKey={"main"} children={"Main"}/>
                <Nav.Item eventKey={"design"} children={"Design"}/>
                <Nav.Item eventKey={"other"} children={"Other"}/>
            </Nav>
            <div>
                {a}
            </div>
        </>
    )
});

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})

export interface FormBuilderProps {
    getForm: ((code: string) => ComponentStore[])
}
export default FormBuilder;
