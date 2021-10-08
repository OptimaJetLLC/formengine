import {ComponentStore} from "../stores/ComponentStore";
import {mapper} from "../views";
import {observer} from "mobx-react-lite";
import React from "react";
import {hoc} from "./Hoc";
import {Node} from "../utils/Node";


export const Component = ({node}: { node: Node }) => {
    if (!node.item) return null

    const definition = mapper[node.item.type]
    const component = hoc(definition.view)
    const ObservableComponent = observer(component);

    node.item.props.children = node.item.props.children
        || node.children?.map(childNode => <Component key={childNode.key} node={childNode}/>)

    return <ObservableComponent  {...node.item.props} />
}
