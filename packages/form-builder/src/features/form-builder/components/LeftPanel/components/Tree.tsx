import styled from '@emotion/styled'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import {Columns, Node, Rows, useBuilderStore} from 'fb-core'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Tree as RTree} from 'rsuite'
import {ItemDataType} from 'rsuite/esm/@types/common'
import {DropData} from 'rsuite/esm/Tree/Tree'

const Tree = observer(() => {
  const store = useBuilderStore()
  const {t} = useTranslation()
  const [currentExpandedKeys, setCurrentExpandedKeys] = useState<string[]>([])

  let expandedNodesKeys: string[] | never = []
  const extractParentNodesKeys = (node?: Node) => {
    if (node?.parent?.data?.key) {
      expandedNodesKeys.push(node.parent.data.key)
      extractParentNodesKeys(node.parent)
    }
    expandedNodesKeys = expandedNodesKeys.concat(currentExpandedKeys)
  }
  extractParentNodesKeys(store.selected)
  useEffect(() => extractParentNodesKeys(store.tree.children?.[0]), [])

  //TODO починить перенос по дереву. Проблема связана со Suspense
  //TODO учитывать dropNodePosition, чтобы вычислить позицию isBefore
  //TODO учитывать новые параметры для move
  const onDrop = ({dragNode, dropNode, dropNodePosition}: DropData<ItemDataType>) => {
    //store.move(dragNode as Node, dropNode as Node, true);
  }

  return <Rows style={{width: '100%'}}>
    <RTree
      draggable onDrop={onDrop}
      onSelect={(activeNode) => store.selected = activeNode as Node}
      value={store.selected?.data?.key}
      expandItemValues={expandedNodesKeys}
      onExpand={(expandItemValues: any []) => {
        setCurrentExpandedKeys(expandItemValues)

      }}
      renderTreeNode={(node) =>
        <TreeNode>
          <div>{`${node.key}`}</div>
          <label>{`${node.model.name}`}</label>
        </TreeNode>}
      labelKey="key"
      valueKey="key"
      style={{maxHeight: 'inherit', height: 'inherit'}}
      data={[store.tree] as ItemDataType[]}
    />

    <Columns>
      <SubtleIconButton
        onClick={() => {
          const keys: string[] = []
          //TODO
          store.treeMap(store.viewer.screen, (node) => keys.push(node.key))
          setCurrentExpandedKeys(keys)
        }}
        size={'sm'} appearance={'subtle'}><ExpandOutline/>{t('tree.expand')}</SubtleIconButton>
      <SubtleIconButton
        onClick={() => setCurrentExpandedKeys([])}
        size={'sm'} appearance={'subtle'}><CollaspedOutline/>{t('tree.collapse')}</SubtleIconButton>
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
  display: flex !important;
  align-items: center;

  & > *:first-of-type {
    margin-right: 10px;
  }
`

export {Tree}
