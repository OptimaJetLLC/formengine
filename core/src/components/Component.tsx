import {mapper} from "../views";
import {observer} from "mobx-react-lite";
import React from "react";
import {Node} from "../utils/Node";


export const Component = observer(({node}: { node: Node }) => {
    if (!node.data) return null

    const componentDefinition = mapper[node.data.type]

    node.data.props.children = node.data.props.children
        || node.children?.map(childNode => <Component key={childNode.key} node={childNode}/>)

    return  React.createElement(componentDefinition.view, node.data.props)
})
