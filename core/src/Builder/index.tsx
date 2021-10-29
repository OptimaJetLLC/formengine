import _ from "lodash";
import {configure} from "mobx";
import {observer} from "mobx-react";
import React from "react";
import {Button, Col, Dropdown, Row} from "rsuite";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {store} from "../stores/Store";
import download from "./utils/download";
import upload from "./utils/upload";
import {mapper} from "../views";
import BuilderWrapper from "./components/BuilderWrapper";
import {FormViewer, FormViewerProps} from "../FormViewer";
import PropertiesEditor from "./components/PropertiesEditor";
import ComponentTree from "./components/ComponentTree";

export interface FormBuilderProps extends FormViewerProps {

}

const FormBuilder = (props: FormBuilderProps) => {

    const onDragEnd = (result: DropResult) => {
        const {source, destination, draggableId} = result;

        if (source?.droppableId === "TOOLBAR") {
            //console.log('TOOLBAR', draggableId);
        } else {
            store.move(draggableId, destination?.droppableId, destination?.index);
        }
    }

    return <div>
        <Button onClick={download}>Download</Button>
        <Button onClick={upload}>Upload</Button>
        <Button onClick={store.clear}>Clear</Button>
        <Dropdown title={"Components"}>
            {_.keys(mapper).map(value =>
                <Dropdown.Item key={value} onClick={() => store.add(value)}>{value}</Dropdown.Item>)}
        </Dropdown>

        <br/><br/>

        <DragDropContext onDragEnd={onDragEnd}>
            <Row>
                <Col md={4}> <ComponentTree/> </Col>

                <Col md={15}>
                    <FormViewer {...props} wrapper={BuilderWrapper}/>
                    {/*<FormViewer {...props} />*/}
                </Col>

                <Col md={5}> <PropertiesEditor/> </Col>
            </Row>
        </DragDropContext>
    </div>;
}

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})

export default observer(FormBuilder);
