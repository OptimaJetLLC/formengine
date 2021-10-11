import {store} from "./stores/Store";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm as standartGetForm} from "./utils/getForm";
import {Component} from "./components/Component";

export interface FormViewerProps {

    getForm: ((code: string) => ComponentStore[]),
    wrapper?: Function
}

export const FormViewer = observer(({getForm, wrapper}: FormViewerProps) => {
    useEffect(() => {
        standartGetForm("test", getForm);
    }, [getForm]);

    return <div>
        {store.tree.children?.map(node => React.createElement(Component, {key: node.key, node, wrapper}))}
    </div>;
})


