import {observer} from "mobx-react";
import React from "react";
import {ComponentStore} from "../stores/ComponentStore";
import BuilderWrapper from "./components/BuilderWrapper";
import {FormViewer, FormViewerProps} from "../FormViewer";


export interface FormBuilderProps extends FormViewerProps {
    getForm: ((code: string) => ComponentStore[])
}

const BuilderView = observer((props: FormBuilderProps) => {
    return <FormViewer {...props} wrapper={BuilderWrapper}/>;
})

export default BuilderView;