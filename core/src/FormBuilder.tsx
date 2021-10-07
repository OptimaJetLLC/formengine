import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {store} from "./stores/Store";
import {Button, Col, Dropdown, Nav, Row, Tree} from "rsuite";
import _ from "lodash";
import {configure} from "mobx";
import {ComponentStore} from "./stores/ComponentStore";
import {ItemDataType} from "rsuite/esm/@types/common";
import {mapper} from "./views";
import {Node} from "./utils/Node";
import {downloadForm} from "./utils/downloadForm";
import {uploadForm} from "./utils/uploadForm";
import {getForm} from "./utils/getForm";


export interface FormBuilderProps {
    getForm: ((code: string) => ComponentStore[])
}

export const FormBuilder = observer((props: FormBuilderProps) => {
    useEffect(() => {
        getForm("test", props.getForm);
    }, []);


    //TODO upgrade tree now its so poorly
    return <div>
        <Button onClick={downloadForm}>Download</Button>
        <Button onClick={uploadForm}>Upload</Button>
        <Button onClick={store.clear}>Clear</Button>
        <Dropdown title={"Components"}>
            {_.keys(mapper).map(value =>
                <Dropdown.Item onClick={() => store.add(value)}>{value}</Dropdown.Item>)}
        </Dropdown>

        <br/><br/>

        <Row>
            <Col md={4}>
                <Tree
                    draggable
                    onSelect={(activeNode) => {
                        store.currentModel = activeNode as Node
                    }}
                    value={store.currentModel?.key ?? ""}
                    labelKey="key"
                    valueKey="key"
                    style={{maxHeight: 'inherit', height: 'inherit'}}
                    data={store.tree.children as ItemDataType[]}/>
            </Col>

            <Col md={15}>{store.render}</Col>

            <Col md={5}>
                <PropertiesEditor/>
            </Col>
        </Row>
    </div>;
})

const PropertiesEditor = () => {
    const [activeTab, setActiveTab] = useState('main');
    const currentModel = store.currentModel?.data

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
                {/*{Object.keys(mapper[store.currentModel?.data?.type ?? ""]?.annotations ?? {}).map(key => {
                        if (key === "key")
                            return <div key={key}>
                                <Form.ControlLabel>{key}</Form.ControlLabel>
                                <RInput
                                    value={_.get(store.currentModel?.data, key, "")}
                                    onChange={value => {
                                        store.currentModel!.data!.key = value as string;
                                        //store.models[0]!.key = value as string;
                                    }}
                                />
                            </div>;

                        return <div key={key}>
                            <Form.ControlLabel>{_.startCase(key)}</Form.ControlLabel>
                            <RInput
                                value={_.get(store.currentModel?.data?.props, key, "")}
                                onChange={value => _.set(store.currentModel?.data?.props as object, key, value)}
                            />
                        </div>;
                    }
                )}*/}
            </div>
        </>
    )
};

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})
