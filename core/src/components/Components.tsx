import {ComponentStore} from "../stores/ComponentStore";
import {ComponentDataProvider} from "../utils/contexts/ComponenDataContext";
import {Component} from "./Component";
import {observer} from "mobx-react";
import {Wrapper} from "../utils/types";
import {useStore} from "../utils/contexts/StoreContext";

interface ComponentsProps {
    parent?: ComponentStore
    components: ComponentStore[]
    Wrapper?: Wrapper
}

//TODO passed component definition?
export const Components = observer(({parent, components, Wrapper}: ComponentsProps) => {
    const store = useStore()

    return <>
        {components.map(componentStore => (
            <ComponentDataProvider
                key={componentStore.key}
                value={{componentStore, parent, model: store.view.getModel(componentStore)}}
            >
                <Component Wrapper={Wrapper}/>
            </ComponentDataProvider>
        ))}
    </>
})