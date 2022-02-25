import {observer} from "mobx-react";
import React from "react";
import {ComponentStore} from "../stores/ComponentStore";
import {FormViewer, FormViewerProps} from "../FormViewer";
import {Editable} from "../features/dnd";
import {FormContainer, LeftPanel, RightPanel} from "./FormBuilder";
import {Tree} from "./components/Tree";
import PropertiesEditor from "./components/PropertiesEditor/PropertiesEditor";
import {useStore} from "../utils/contexts/StoreContext";

export interface FormBuilderProps extends FormViewerProps {
    getForm: ((code: string) => ComponentStore[])
}

const BuilderView = observer((props: FormBuilderProps) => {
    const store = useStore()

    return <>
        {store.showLeftPanel && <LeftPanel>
            <Tree/>
        </LeftPanel>}

        <FormContainer>
            <FormViewer {...props} Wrapper={Editable}/>
        </FormContainer>

        {store.showRightPanel && <RightPanel>
            <PropertiesEditor/>
        </RightPanel>}
    </>
})

export {BuilderView};