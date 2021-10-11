import {store} from "./stores/Store";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm} from "./utils/getForm";
import {Component} from "./components/Component";

export interface FormViewerProps {

    getForm: ((code: string) => ComponentStore[])
}

export const FormViewer = observer((props: FormViewerProps) => {
    useEffect(() => {
        getForm("test", props.getForm);
    }, [props.getForm]);

    return <div>
        {store.tree.children?.map(node => React.createElement(Component, {key: node.key, node}))}
    </div>;
})


