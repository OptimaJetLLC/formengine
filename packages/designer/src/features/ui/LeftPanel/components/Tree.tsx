import styled from '@emotion/styled'
import {FormViewer, useViewerProps} from '@react-form-builder/core'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Columns, Rows} from '../../../components/Containers'
import {DraggableTreeNode} from '../../../dnd'

const Tree = observer(() => {
  const props = useViewerProps()
  const {t} = useTranslation()
  const store = useBuilderStore()
  useEffect(() => {
    store.expanded.add(store.viewer.form.componentTree)
  }, [screen])

  const handleExpand = () => store.expandAll()
  const handleCollapse = () => store.collapseAll()

  return <Rows gap={0} style={{overflow: 'hidden', flex: 1}}>
    <Columns>
      <SubtleIconButton onClick={handleExpand} size={'sm'} appearance={'subtle'}>
        <ExpandOutline/>
        {t('tree.expand')}
      </SubtleIconButton>
      <SubtleIconButton onClick={handleCollapse} size={'sm'} appearance={'subtle'}>
        <CollaspedOutline/>
        {t('tree.collapse')}
      </SubtleIconButton>
    </Columns>
    <STreeContainer>
      <FormViewer {...props} language={store.defaultLanguage} componentWrapper={DraggableTreeNode} getForm={undefined}/>
    </STreeContainer>
  </Rows>
})

const STreeContainer = styled.div`
  display: flex;
  overflow: auto;
`

const SubtleIconButton = styled(Button)`
  display: flex !important;
  align-items: center;
  gap: 10px;
`

export {Tree}
