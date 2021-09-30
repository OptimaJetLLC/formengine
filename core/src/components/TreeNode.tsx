import {ComponentStore} from "../stores/ComponentStore";
import {mapper} from "../views";
import {observer} from "mobx-react-lite";
import React from "react";
import {hoc} from "./Hoc";

export const TreeNode = ({store}: { store: ComponentStore }) => {
    const definition = mapper[store.type]

    const component = hoc(definition.view)

    const ObservableComponent = observer(component);

    store.props.children = store.props.children || store.children?.map(value => <TreeNode key={value.key}
                                                                                          store={value}/>)

    return <ObservableComponent  {...store.props} />
}
