import * as faList from '@fortawesome/free-solid-svg-icons/faList'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap'
import {namedObserver} from 'fb-core'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Nav as RNav} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {NavIconItem} from '../../../components/NavIconItem'
import {FormList} from './FormList'
import {Tree} from './Tree'

type LeftPanelSection = 'tree' | 'forms'

const leftPanelTabs = {
  'tree': <Tree/>,
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
      {formsTab}
    </RNav>
    {leftPanelTabs[activeTab]}
  </>
})
