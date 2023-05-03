import styled from '@emotion/styled'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import {FormViewer, useViewerProps} from 'fb-core'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {IsTreeProvider} from '../../../../utils/IsTreeContext'
import {Columns, Rows} from '../../../components/Containers'
import {DraggableTreeNode} from '../../../dnd'

const Tree = observer(() => {
  const props = useViewerProps()
  const {t} = useTranslation()

  return <Rows style={{overflow: 'hidden', flex: 1}}>
    <STreeContainer>
      <IsTreeProvider value={true}>
        <FormViewer {...props} componentWrapper={DraggableTreeNode} getForm={undefined}/>
      </IsTreeProvider>
    </STreeContainer>

    <Columns stretchElements>
      <SubtleIconButton size={'sm'} appearance={'subtle'}>
        <ExpandOutline/>
        {t('tree.expand')}
      </SubtleIconButton>
      <SubtleIconButton size={'sm'} appearance={'subtle'}>
        <CollaspedOutline/>
        {t('tree.collapse')}
      </SubtleIconButton>
    </Columns>
  </Rows>
})

const STreeContainer = styled.div`
  flex: 1;
  overflow: auto;
`

const SubtleIconButton = styled(Button)`
  display: flex !important;
  align-items: center;
  gap: 10px;
`

export {Tree}
