import {FormViewer, FormViewerProps} from "../FormViewer";
import React from "react";

export interface FormPreviewProps extends FormViewerProps {
}

export const Preview = (props: FormPreviewProps) => {
    return <FormViewer {...props}/>;
}
