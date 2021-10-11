import _ from "lodash";
import { configure } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Col, Dropdown, Nav, Row, Tree } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import { ComponentStore } from "../stores/ComponentStore";
import { store } from "../stores/Store";
import { downloadForm } from "../utils/downloadForm";
import { Node } from "../utils/Node";
import { uploadForm } from "../utils/uploadForm";
import { mapper } from "../views";
import wrapper from "./components/BuilderWrapper";
import { FormViewer, FormViewerProps } from "../FormViewer";
import BuilderWrapper from './components/BuilderWrapper'


export interface FormBuilderProps extends FormViewerProps {

}

export const FormBuilder = observer((props: FormBuilderProps) => {
    store.wrapper = wrapper;
    return <div>
        <Button onClick={downloadForm}>Download</Button>
        <Button onClick={uploadForm}>Upload</Button>
        <Button onClick={store.clear}>Clear</Button>
        <Dropdown title={"Components"}>
            {_.keys(mapper).map(value =>
                <Dropdown.Item key={value} onClick={() => store.add(value)}>{value}</Dropdown.Item>)}
        </Dropdown>

        <br/><br/>

        <Row>
            <Col md={4}>
                <Tree
                    draggable
                    onSelect={(activeNode) => store.currentNode = activeNode as Node}
                    value={store.currentNode?.data?.key}
                    labelKey="key"
                    valueKey="key"
                    style={{maxHeight: 'inherit', height: 'inherit'}}
                    data={store.tree.children as ItemDataType[]}
                />
            </Col>

            <Col md={15}><FormViewer {...props} wrapper={BuilderWrapper}/></Col>

            <Col md={5}> <PropertiesEditor/> </Col>
        </Row>
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