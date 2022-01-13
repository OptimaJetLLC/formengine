import {ComponentStore} from "../stores/ComponentStore";
import {ComponentStoreProvider} from "../utils/ComponentStoreContext";
import {Component} from "./Component";
import React, {ComponentType} from "react";
import {observer} from "mobx-react";

interface ComponentsProps {
    components: ComponentStore[]
    wrapper?: ComponentType<any>
}

export const Components = observer((props: ComponentsProps) => {

    return <>
        {props.components.map(componentStore => {
            return (
                <ComponentStoreProvider key={componentStore.key} store={componentStore}>
                    <Component key={componentStore.key} wrapper={props.wrapper}/>
                </ComponentStoreProvider>
            )
        })}
    </>
})