import styled from '@emotion/styled'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import {FormViewer} from 'fb-core'
import {observer} from 'mobx-react'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {IsTreeProvider} from '../../../../utils/IsTreeContext'
import {Columns, Rows} from '../../../components/Containers'

const Tree = observer(() => {
  const store = useBuilderStore()
  const {t} = useTranslation()
  const [currentExpandedKeys, setCurrentExpandedKeys] = useState<string[]>([])

  return <Rows style={{overflow: 'hidden', flex: 1}}>
    {/*IsTreeProvider можно переоборудовать при необходимости в TreeHandler*/}
    <STreeContainer>
      <IsTreeProvider value={true}>
        <FormViewer {...store.viewer.props}/>
      </IsTreeProvider>
    </STreeContainer>

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

const STreeContainer = styled.div`
  flex: 1;
  overflow: auto;
`

const SubtleIconButton = styled(Button)`
  display: flex !important;
  align-items: center;

  & > *:first-of-type {
    margin-right: 10px;
  }
`

export {Tree}
