import {store} from "./stores/Store";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm} from "./utils/getForm";

export interface FormViewProps {
    getForm: ((code: string) => ComponentStore[])
}

export const FormViewer = observer((props: FormViewProps) => {
    useEffect(() => {
        getForm("test", props.getForm);
    }, []);

    return <div>
        {store.render}
    </div>;
})


