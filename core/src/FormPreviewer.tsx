import {Col, Row} from "rsuite";
import {FormViewer, FormViewerProps} from "./FormViewer";
import React from "react";

export interface FormPreviewProps extends FormViewerProps {

}

export const FormPreviewer = (props: FormPreviewProps) => {

    return <div>
        <Row>
            <Col md={4}> </Col>

            <Col md={15}><FormViewer {...props}/></Col>

            <Col md={5}> </Col>
        </Row>
    </div>;
}
