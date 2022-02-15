import {ComponentStore} from "../stores/ComponentStore";
import {ComponentDataProvider} from "../utils/ComponenDataContext";
import {Component} from "./Component";
import {observer} from "mobx-react";
import {Wrapper} from "../utils/Types";

interface ComponentsProps {
    parent?: ComponentStore
    components: ComponentStore[]
    Wrapper?: Wrapper
}

//TODO passed component definition?
export const Components = observer(({parent, components, Wrapper}: ComponentsProps) => {

    return <>
        {components.map(componentStore => (
            <ComponentDataProvider key={componentStore.key} parent={parent} componentStore={componentStore}>
                <Component Wrapper={Wrapper}/>
            </ComponentDataProvider>
        ))}
    </>
})