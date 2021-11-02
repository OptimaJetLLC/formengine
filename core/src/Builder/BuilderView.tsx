import {observer} from "mobx-react";
import React from "react";
import {Col, Row} from "rsuite";
import {ComponentStore} from "../stores/ComponentStore";
import BuilderWrapper from "./components/BuilderWrapper";
import {FormViewer, FormViewerProps} from "../FormViewer";
import PropertiesEditor from "./components/PropertiesEditor";
import ComponentTree from "./components/ComponentTree";


export interface FormBuilderProps extends FormViewerProps {
    getForm: ((code: string) => ComponentStore[])
}

const BuilderView = observer((props: FormBuilderProps) => {
    return <Row>
        <Col md={4}>
            <ComponentTree/>
        </Col>

        <Col md={15}>
            <FormViewer {...props} wrapper={BuilderWrapper}/>
        </Col>

        <Col md={5}>
            <PropertiesEditor/>
        </Col>
    </Row>;
})

export default BuilderView;