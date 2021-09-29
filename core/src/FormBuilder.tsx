import {observer} from "mobx-react-lite";
import React, {ReactNode, useEffect, useState} from "react";
import {store} from "./stores/Store";
import {Button, Col, Dropdown, Form, Input as RInput, Input, Nav, Row, Tree} from "rsuite";
import _ from "lodash";
import {configure, toJS} from "mobx";
import {ComponentStore} from "./stores/ComponentStore";
import {ItemDataType} from "rsuite/esm/@types/common";
import {mapper} from "./views";
import {Node} from "./utils/Renderer";


export interface FormBuilderProps {
    getForm: ((code: string) => ComponentStore[])
}

export const FormBuilder = observer((props: FormBuilderProps) => {
    const [activeTab, setActiveTab] = useState('main');


    useEffect(() => {
        store.fillFormModel("test", props.getForm);
    }, []);


    //TODO upgrade tree now its so poorly
    return <div>
        <Button onClick={store.download}>Download</Button>
        <Button onClick={store.upload}>Upload</Button>
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

            {/*<Col md={15}>{store.components}</Col>*/}
            <Col md={15}>{store.renderer.render()}</Col>

            <Col md={5}>
                <Nav appearance={"tabs"} activeKey={activeTab} onSelect={setActiveTab} style={styles}>
                    <Nav.Item eventKey={"main"} children={"Main"}/>
                    <Nav.Item eventKey={"design"} children={"Design"}/>
                    <Nav.Item eventKey={"other"} children={"Other"}/>
                </Nav>
                <div>
                    {Object.keys(mapper[store.currentModel?.data?.type ?? ""]?.description ?? {}).map(key => {
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
                                <Form.ControlLabel>{key}</Form.ControlLabel>
                                <RInput
                                    value={_.get(store.currentModel?.data?.props, key, "")}
                                    onChange={value => _.set(store.currentModel?.data?.props as object, key, value)}
                                />
                            </div>;
                        }
                    )}
                </div>
            </Col>
        </Row>
    </div>;
})

const styles = {width: 150};

//State can be changed from anywhere
configure({enforceActions: "never"})
