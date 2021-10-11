import {store} from "./stores/Store";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm} from "./utils/getForm";
import {Component} from "./components/Component";
import { result } from "lodash";

export interface FormViewerProps {

    getForm: ((code: string) => ComponentStore[]),
    wrapper?: Function
}

export const FormViewer = observer((props: FormViewerProps) => {
    useEffect(() => {
        getForm("test", props.getForm);
    }, [props.getForm]);


    const renderNode = (node: any) => {
        const { wrapper } = props;
        const element = React.createElement(Component, {key: node.key, node});
        return wrapper 
            ? wrapper({ node, children: element })
            : element;
    }

    return <div>
        {store.tree.children?.map(renderNode)}
    </div>;
})


