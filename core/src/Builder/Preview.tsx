import {FormViewer, FormViewerProps} from "../FormViewer";
import React from "react";
import {useStore} from "../utils/StoreContext";

export interface FormPreviewProps extends FormViewerProps {
}

export const Preview = (props: FormPreviewProps) => {
    const store = useStore()
    store.currentNode = null
    return <FormViewer {...props}/>;
}
