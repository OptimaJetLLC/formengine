import {FormViewer, FormViewerProps} from "../FormViewer";
import React from "react";
import {store} from "../stores/Store";

export interface FormPreviewProps extends FormViewerProps {
}

export const Preview = (props: FormPreviewProps) => {
    store.currentNode = null
    return <FormViewer {...props}/>;
}
