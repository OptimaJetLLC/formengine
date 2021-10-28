import _ from "lodash";
import {observer} from "mobx-react";
import React, {useState} from "react";
import {Col, Nav, Row, Tree} from "rsuite";
import {ItemDataType} from "rsuite/esm/@types/common";
import {ComponentStore} from "../stores/ComponentStore";
import {store} from "../stores/Store";
import {Node} from "../utils/Node";
import {mapper} from "../views";
import BuilderWrapper from "./components/BuilderWrapper";
import {FormViewer, FormViewerProps} from "../FormViewer";


export interface FormBuilderProps extends FormViewerProps {
    getForm: ((code: string) => ComponentStore[])
}

const BuilderView = observer((props: FormBuilderProps) => {
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

    return <Row>
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
            <FormViewer {...props} wrapper={BuilderWrapper}/></Col>
        <Col md={5}> <PropertiesEditor/> </Col>
    </Row>;
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

export default BuilderView;