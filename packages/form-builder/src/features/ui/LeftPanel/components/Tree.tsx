import styled from '@emotion/styled'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import {FormViewer} from 'fb-core'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {IsTreeProvider} from '../../../../utils/IsTreeContext'
import {Columns, Rows} from '../../../components/Containers'

const Tree = observer(() => {
  const store = useBuilderStore()
  const {t} = useTranslation()

  return <Rows style={{overflow: 'hidden', flex: 1}}>
    {/*IsTreeProvider можно переоборудовать при необходимости в TreeHandler*/}
    <STreeContainer>
      <IsTreeProvider value={true}>
        <FormViewer {...store.viewer.props} getForm={undefined}/>
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
