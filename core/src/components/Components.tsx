import {ComponentStore} from "../stores/ComponentStore";
import {ComponentStoreProvider} from "../utils/ComponentStoreContext";
import {Component} from "./Component";
import React from "react";
import {observer} from "mobx-react";

interface ComponentsProps {
    components: ComponentStore[]
    wrapper?: Function
}

export const Components = observer((props: ComponentsProps) => {

    return <>
        {props.components.map(componentStore => {
            return (
                <ComponentStoreProvider store={componentStore}>
                    <Component key={componentStore.key} wrapper={props.wrapper}/>
                </ComponentStoreProvider>
            )
        })}
    </>
})