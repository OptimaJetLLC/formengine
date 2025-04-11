import styled from '@emotion/styled'
import {ComponentTree} from '@react-form-builder/core'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import type {ComponentProps} from 'react'
import {useCallback, useEffect, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Columns, Rows} from '../../../components/Containers'
import {customizableObserver} from '../../../customization'
import {DraggableTreeNode} from '../../../dnd'

const treeStyle = {overflow: 'hidden', flex: 1}

const RawTree = (props: ComponentProps<typeof Rows>) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const {componentTree} = builderStore.viewer.form
  const data = useMemo(() => [componentTree], [componentTree])

  const expandAll = useCallback(() => builderStore.expandAll(), [builderStore])
  const collapseAll = useCallback(() => builderStore.collapseAll(), [builderStore])

  useEffect(() => {
    builderStore.expanded.add(componentTree)
  }, [builderStore.expanded, componentTree])

  return <Rows gap={0} style={treeStyle} {...props}>
    <Columns>
      <SubtleIconButton onClick={expandAll} size={'sm'} appearance={'subtle'}>
        <ExpandOutline/>
        {t('tree.expand')}
      </SubtleIconButton>
      <SubtleIconButton onClick={collapseAll} size={'sm'} appearance={'subtle'}>
        <CollaspedOutline/>
        {t('tree.collapse')}
      </SubtleIconButton>
    </Columns>
    <STreeContainer>
      <ComponentTree data={data} componentDataViewer={DraggableTreeNode}/>
    </STreeContainer>
  </Rows>
}

export const Tree = customizableObserver('Tree_Tab_Content', RawTree)

const STreeContainer = styled.div`
  display: flex;
  overflow: auto;
`

const SubtleIconButton = styled(Button)`
  display: flex !important;
  align-items: center;
  gap: 10px;
`
