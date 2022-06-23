import {observer} from "mobx-react";
import React from "react";
import {FormViewer, FormViewerProps} from "../../../FormViewer";
import {Editable} from "../../../features/dnd";

export interface FormBuilderProps extends FormViewerProps {
}

const Building = observer((props: FormBuilderProps) => {
    return <FormViewer {...props} Wrapper={Editable}/>
})

export {Building};
