import { mapper } from "../views";
import { observer } from "mobx-react-lite";
import React from "react";
import {Node} from "../utils/Node";


export const Component = observer(({node}: { node: Node }) => {
    if (!node.data) return null

    const componentDefinition = mapper[node.data.type]

    return  React.createElement(componentDefinition.view, node.data.props)
})
