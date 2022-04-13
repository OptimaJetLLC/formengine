import React, {useState} from "react";
import {Node} from "../../../../utils/Node";
import {Button, Tree as RTree} from "rsuite";
import {ItemDataType} from "rsuite/esm/@types/common";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {Columns, Rows} from "../../../../features/ui/Containers";
import {FaIcon} from "../../../../features/ui/Icons";
import * as faCaretDown from "@fortawesome/free-solid-svg-icons/faCaretDown";
import * as faCaretUp from "@fortawesome/free-solid-svg-icons/faCaretUp";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {useStore} from "../../../../utils/contexts/StoreContext";
import {useTranslation} from 'react-i18next';
import {DropData} from "rsuite/esm/Tree/Tree";

const Tree = observer(() => {
    const store = useStore();
    const {t} = useTranslation();
    const [currentExpandedKeys, setCurrentExpandedKeys] = useState<string[]>([]);

    let expandedNodesKeys: string[] | never = [];
    const extractParentNodesKeys = (node: Node | null) => {
        if (node?.parent?.data?.key) {
            expandedNodesKeys.push(node.parent.data.key);
            extractParentNodesKeys(node.parent);
        }
        expandedNodesKeys = expandedNodesKeys.concat(currentExpandedKeys);
    }
    extractParentNodesKeys(store.selected);

    //TODO починить перенос по дереву. Проблема связана со Suspense
    //TODO учитывать dropNodePosition, чтобы вычислить позицию isBefore
    //TODO учитывать новые параметры для move
    const onDrop = ({dragNode, dropNode, dropNodePosition}: DropData<ItemDataType>) => {
        //store.move(dragNode as Node, dropNode as Node, true);
    };

    return <Rows style={{width: "100%"}}>
        <RTree
            draggable onDrop={onDrop}
            onSelect={(activeNode) => store.selected = activeNode as Node}
            value={store.selected?.data?.key}
            expandItemValues={expandedNodesKeys}
            onExpand={(expandItemValues: any []) => {
                setCurrentExpandedKeys(expandItemValues);

            }}
            renderTreeNode={(node) =>
                <TreeNode>
                    <div>{`${node.key}`}</div>
                    <label>{` (${node.definition.name.toLowerCase()})`}</label>
                </TreeNode>}
            labelKey="key"
            valueKey="key"
            style={{maxHeight: 'inherit', height: 'inherit'}}
            data={[store.tree] as ItemDataType[]}
        />

        <Columns>
            <SubtleIconButton
                onClick={() => {
                    const keys: string[] = [];
                    //TODO
                    store.treeMap(store.screen, (node) => keys.push(node.key))
                    setCurrentExpandedKeys(keys)
                }}
                size={"sm"} appearance={"subtle"}><ExpandIcon/>{t('tree.expand')}</SubtleIconButton>
            <SubtleIconButton
                onClick={() => setCurrentExpandedKeys([])}
                size={"sm"} appearance={"subtle"}><CollapseIcon/>{t('tree.collapse')}</SubtleIconButton>
        </Columns>
    </Rows>
})

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

const SubtleIconButton = styled(Button)`
  display: flex;
  align-items: center;

  & > *:first-of-type {
    margin-right: 3px;
  }
`

const CombineIconsVertical = styled.div`
  display: flex;
  flex-direction: column;
`

const CollapseIcon = (p: any) => <CombineIconsVertical {...p} style={{transform: "scale(1.3)"}}>
    <FaIcon icon={faCaretDown as unknown as IconDefinition} height={"0.4em"} viewBox={"0 160 320 200"}/>
    <FaIcon icon={faCaretUp as unknown as IconDefinition} height={"0.4em"} viewBox={"0 150 320 200"}/>
</CombineIconsVertical>

const ExpandIcon = (p: any) => <CombineIconsVertical {...p} style={{transform: "scale(1.3)"}}>
    <FaIcon icon={faCaretUp as unknown as IconDefinition} height={"0.4em"} viewBox={"0 170 320 200"}/>
    <FaIcon icon={faCaretDown as unknown as IconDefinition} height={"0.4em"} viewBox={"0 170 320 200"}/>
</CombineIconsVertical>

export {Tree}
