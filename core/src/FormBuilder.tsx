import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {store} from "./stores/Store";
import {Button, Col, Dropdown, Nav, Row, Tree} from "rsuite";
import _ from "lodash";
import {configure} from "mobx";
import {ItemDataType} from "rsuite/esm/@types/common";
import {mapper} from "./views";
import {Node} from "./utils/Node";
import {downloadForm} from "./utils/downloadForm";
import {uploadForm} from "./utils/uploadForm";
import {FormViewer, FormViewerProps} from "./FormViewer";


export interface FormBuilderProps extends FormViewerProps {

}

export const FormBuilder = observer((props: FormBuilderProps) => {

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

            <Col md={15}><FormViewer {...props}/></Col>

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
