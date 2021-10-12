import { mapper } from "../views";
import { observer } from "mobx-react";
import React from "react";
import {Node} from "../utils/Node";


export const Component = observer(({ node, wrapper }: { node: Node, wrapper?: Function }) => {
    if (!node.data) return null

    const componentDefinition = mapper[node.data.type];
    const { props } = node.data;

    props.children = props.children || node.children?.map(
        childNode => (
            <Component key={childNode.key} node={childNode}
                wrapper={wrapper} />
        )
    )

    const element = React.createElement(componentDefinition.view, node.data.props);

    return wrapper
        ? wrapper({ node, children: element })
        : element;
});
