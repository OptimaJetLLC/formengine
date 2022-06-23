import {FormViewer, FormViewerProps} from "../../../FormViewer";
import React from "react";
import {useStore} from "../../../utils/contexts/StoreContext";
import {observer} from "mobx-react";

export interface FormPreviewProps extends FormViewerProps {
}

export const Preview = observer((props: FormPreviewProps) => {
    const store = useStore()
    store.selected = null

    return <FormViewer {...props}/>
})
