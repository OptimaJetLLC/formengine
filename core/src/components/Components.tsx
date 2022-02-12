import {ComponentStore} from "../stores/ComponentStore";
import {ComponentDataProvider} from "../utils/ComponenDataContext";
import {Component} from "./Component";
import React, {ComponentType} from "react";
import {observer} from "mobx-react";

interface ComponentsProps {
    parent?: ComponentStore
    components: ComponentStore[]
    wrapper?: ComponentType<any>
}

//TODO passed component definition?
export const Components = observer(({parent, components, wrapper}: ComponentsProps) => {

    return <>
        {components.map(componentStore => (
            <ComponentDataProvider key={componentStore.key} parent={parent} componentStore={componentStore}>
                <Component wrapper={wrapper}/>
            </ComponentDataProvider>
        ))}
    </>
})