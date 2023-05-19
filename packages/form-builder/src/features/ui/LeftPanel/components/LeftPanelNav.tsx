import * as faList from '@fortawesome/free-solid-svg-icons/faList'
import * as faPlusCircle from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap'
import {namedObserver} from '@react-form-builder/core'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Nav as RNav} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {NavIconItem} from '../../../components/NavIconItem'
import {ComponentBar} from '../../ComponentBar'
import {FormList} from './FormList'
import {Tree} from './Tree'

type LeftPanelSection = 'tree' | 'forms' | 'components'

const leftPanelTabs = {
  'tree': <Tree/>,
  'components': <ComponentBar draggable={true}/>,
  'forms': <FormList/>
}

export const LeftPanelNav = namedObserver('LeftPanelNav', () => {
  const {formStorageEnabled} = useBuilderStore()
  const [activeTab, setActiveTab] = useState<LeftPanelSection>('tree')
  const {t} = useTranslation()
  const title = (key: string) => t('leftPanel.sectionName.' + key)

  const formsTab = formStorageEnabled ?
    NavIconItem('forms', title('forms'), faList, {color: '#f67f1f'})
    : null

  return <>
    <RNav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab} style={{marginBottom: 10}}>
      {NavIconItem('tree', title('tree'), faSitemap, {color: 'var(--rs-navs-selected)'})}
      {NavIconItem('components', title('components'), faPlusCircle, {color: 'var(--rs-green-600)'})}
      {formsTab}
    </RNav>
    {leftPanelTabs[activeTab]}
  </>
})
