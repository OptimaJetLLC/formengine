import {FormViewer, FormViewerProps} from "../FormViewer";
import React from "react";
import {useStore} from "../utils/contexts/StoreContext";
import {FormContainer, LeftPanel, RightPanel} from "./FormBuilder";
import {Errors} from "./components/Errors";
import {observer} from "mobx-react";

export interface FormPreviewProps extends FormViewerProps {
}

export const Preview = observer((props: FormPreviewProps) => {
    const store = useStore()
    store.selected = null

    return <>
        {store.showLeftPanel && <LeftPanel>
            <Errors style={{margin: 20}}/>
        </LeftPanel>}

        <FormContainer>
            <FormViewer {...props}/>
        </FormContainer>

        {store.showRightPanel && <RightPanel>
        </RightPanel>}
    </>
})
