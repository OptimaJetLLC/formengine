import React, {useState} from "react";
import {Node} from "../../utils/Node";
import {store} from "../../stores/Store";
import {Tree} from "rsuite";
import {ItemDataType} from "rsuite/esm/@types/common";
import {observer} from "mobx-react";

const ComponentTree = () => {
    const [currentExpandedKeys, setCurrentExpandedKeys] = useState<any[]>([]);

    let expandedNodesKeys: string[] | never = [];
    const extractParentNodesKeys = (node: Node | null) => {
        if (node?.parent?.data?.key) {
            expandedNodesKeys.push(node.parent.data.key);
            extractParentNodesKeys(node.parent);
        }
        expandedNodesKeys = expandedNodesKeys.concat(currentExpandedKeys);
    }
    extractParentNodesKeys(store.currentNode);

    return <Tree
        draggable
        onSelect={(activeNode) => store.currentNode = activeNode as Node}
        value={store.currentNode?.data?.key}
        expandItemValues={expandedNodesKeys}
        onExpand={(expandItemValues: any []) => {
            setCurrentExpandedKeys(expandItemValues);

        }}
        labelKey="key"
        valueKey="key"
        style={{maxHeight: 'inherit', height: 'inherit'}}
        data={store.tree.children as ItemDataType[]}
    />
}

export default observer(ComponentTree)