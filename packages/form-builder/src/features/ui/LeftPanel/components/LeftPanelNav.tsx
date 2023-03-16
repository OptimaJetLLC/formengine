import * as faList from '@fortawesome/free-solid-svg-icons/faList'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap'
import {observer} from 'mobx-react'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Nav as RNav} from 'rsuite'
import {NavIconItem} from '../../common/NavIconItem'
import {FormList} from './FormList'
import {Tree} from './Tree'

type LeftPanelSection = 'tree' | 'forms'

const leftPanelTabs = {
  'tree': <Tree/>,
  'forms': <FormList/>
}

const _LeftPanelNav = () => {
  const [activeTab, setActiveTab] = useState<LeftPanelSection>('tree')
  const {t} = useTranslation()
  const title = (key: string) => t('leftPanel.sectionName.' + key)

  return <div style={{overflowY: 'auto'}}>
    <RNav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab} style={{marginBottom: 10}}>
      {NavIconItem('tree', title('tree'), faSitemap, {color: 'var(--rs-navs-selected)'})}
      {NavIconItem('forms', title('forms'), faList, {color: '#f67f1f'})}
    </RNav>
    {leftPanelTabs[activeTab]}
  </div>
}

export const LeftPanelNav = observer(_LeftPanelNav)
