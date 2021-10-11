import { mapper } from "../views";
import { observer } from "mobx-react-lite";
import React from "react";
import { hoc } from "./Hoc";
import { Node } from "../utils/Node";


export const Component = ({ node, wrapper }: { node: Node, wrapper?: Function }) => {
    if (!node.data) return null

    const componentDefinition = mapper[node.data.type]
    const component = hoc(componentDefinition.view)
    const ObservableComponent = observer(component);

    const { props } = node.data;

    props.children = props.children || node.children?.map(
        childNode => (
            <Component key={childNode.key} node={childNode}
                wrapper={wrapper} />
        )
    )

    let result = <ObservableComponent  {...props} />;
    if (wrapper) result = wrapper({ node, children: result });
    return result
}
