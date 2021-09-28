import {observer} from "mobx-react-lite";
import React, {ReactNode, useEffect, useState} from "react";
import {store} from "./stores/Store";
import {Button, Col, Dropdown, Form, Input as RInput, Input, Nav, Row, Tree} from "rsuite";
import {Control} from "./utils/constants";
import _ from "lodash";
import {configure, toJS} from "mobx";
import {ComponentStore} from "./stores/ComponentStore";
import {ItemDataType} from "rsuite/esm/@types/common";
import {Node} from "./utils/Tree";


export interface FormBuilderProps {
    getForm: ((code: string) => ComponentStore[])
}

export const FormBuilder = observer((props: FormBuilderProps) => {
    const [active, setActive] = useState('');

    const [activeTab, setActiveTab] = useState('main');

    useEffect(() => {
        let a: Node | null = store.tree.find(active);
        store.activeModel = a?.value ?? null
        console.log(active)
    }, [active]);


    useEffect(() => {
        store.fillFormModel("test", props.getForm);
    }, []);


    console.log(store.models)
    //TODO upgrade tree now its so poorly
    return <div>
        <Button onClick={store.download}>Download</Button>
        <Button onClick={store.upload}>Upload</Button>
        <Button onClick={store.clear}>Clear</Button>
        <Dropdown title={"Components"}>
            {_.keys(store.renderer.mapper).map(value =>
                <Dropdown.Item onClick={() => store.add(value)}>{value}</Dropdown.Item>)}
        </Dropdown>

        <br/><br/>

        <Row>
            <Col md={4}>
                <Tree
                    draggable
                    onSelect={(activeNode, value) => setActive(value as string)}
                    value={active}
                    labelKey="key"
                    valueKey="key"
                    style={{maxHeight: 'inherit', height: 'inherit'}}
                    data={store.tree.root.children as unknown as ItemDataType[]}/>
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
                    {/*{Object.keys(store.activeModel?.props ?? {}).map(key => {
                        console.log(toJS(store.activeModel?.props))
                            return <div key={key}>
                                <Form.ControlLabel>{key}</Form.ControlLabel>
                                <RInput
                                    value={_.get(store.activeModel?.props, key, "")}
                                    onChange={value => _.set(store.activeModel?.props as object, key, value)}
                                />
                            </div>;
                        }
                    )}*/}

                    {Object.keys(store.renderer.mapper[store.activeModel?.type ?? ""]?.description ?? {}).map(key => {
                            if (key === "key")
                                return <div key={key}>
                                    <Form.ControlLabel>{key}</Form.ControlLabel>
                                    <RInput
                                        value={_.get(store.activeModel, key, "")}
                                        onChange={value => {
                                            store.activeModel!.key = value as string;
                                            //store.models[0]!.key = value as string;
                                        }}
                                    />
                                </div>;

                            return <div key={key}>
                                <Form.ControlLabel>{key}</Form.ControlLabel>
                                <RInput
                                    value={_.get(store.activeModel?.props, key, "")}
                                    onChange={value => _.set(store.activeModel?.props as object, key, value)}
                                />
                            </div>;
                        }
                    )}

                    {/*{Object.keys(store.models[0]?.props.main ?? {}).map(key =>
                        <div key={key}>
                            <Form.ControlLabel>{key}</Form.ControlLabel>
                            <RInput
                                value={_.get(store.models[0].props.main, key, "")}
                                onChange={value => _.set(store.models[0].props.main as object, key, value)}
                            />
                        </div>
                    )}*/}
                </div>
            </Col>
        </Row>
    </div>;
})

const styles = {width: 150};

//State can be changed from anywhere
configure({enforceActions: "never"})
