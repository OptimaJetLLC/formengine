import {store} from "./stores/Store";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm as getStandardForm} from "./utils/getForm";
import {Component} from "./components/Component";

export interface FormViewerProps {

    getForm: ((code: string) => ComponentStore[]),
    wrapper?: Function //TODO change type of wrapper
}

export const FormViewer = observer(({getForm, wrapper}: FormViewerProps) => {
    useEffect(() => {
        getStandardForm("test", getForm);
    }, [getForm]);

    return <div>
        {store.tree.children?.map(node => React.createElement(Component, {key: node.key, node, wrapper}))}
    </div>;
})


