import React, {useState} from "react";
import {Node} from "../../utils/Node";
import {store} from "../../stores/Store";
import {Tree} from "rsuite";
import {ItemDataType} from "rsuite/esm/@types/common";
import {observer} from "mobx-react";
import styled from "@emotion/styled";

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
    const onDrop = ({dragNode, dropNode, dropNodePosition}: any) => {
        store.move(dragNode.key, dropNode.key, dropNodePosition - 1);
    };

    return <StyledTree
        draggable onDrop={onDrop}
        onSelect={(activeNode) => store.currentNode = activeNode as Node}
        value={store.currentNode?.data?.key}
        expandItemValues={expandedNodesKeys}
        onExpand={(expandItemValues: any []) => {
            setCurrentExpandedKeys(expandItemValues);

        }}
        renderTreeNode={(node) => {
            return <TreeNode>
                <div>{`${node.key}`}</div>
                <label>{` (${node.definition.name.toLowerCase()})`}</label>
            </TreeNode>
        }}
        labelKey="key"
        valueKey="key"
        style={{maxHeight: 'inherit', height: 'inherit'}}
        data={store.tree.children as ItemDataType[]}
    />
}

const TreeNode = styled.div`
  margin-top: -3px;
  display: flex;
  flex-direction: row;
  font-weight: bold;

  label {
    opacity: 0.4;
    margin-left: 10px;
  }
`

const StyledTree = styled(Tree)``

export default observer(ComponentTree)