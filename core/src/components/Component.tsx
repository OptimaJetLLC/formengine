import {mapper} from "../views";
import {observer} from "mobx-react-lite";
import React from "react";
import {hoc} from "./Hoc";
import {Node} from "../utils/Node";


export const Component = ({node}: { node: Node }) => {
    if (!node.data) return null

    const componentDefinition = mapper[node.data.type]
    const component = hoc(componentDefinition.view)
    const ObservableComponent = observer(component);

    node.data.props.children = node.data.props.children
        || node.children?.map(childNode => <Component key={childNode.key} node={childNode}/>)

    return <ObservableComponent  {...node.data.props} />
}
