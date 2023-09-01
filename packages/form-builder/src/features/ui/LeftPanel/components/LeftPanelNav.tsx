import * as faBolt from '@fortawesome/free-solid-svg-icons/faBolt.js'
import * as faList from '@fortawesome/free-solid-svg-icons/faList.js'
import * as faPlusCircle from '@fortawesome/free-solid-svg-icons/faPlusCircle.js'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap.js'
import {namedObserver} from '@react-form-builder/core'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {NavIconItem, SNav} from '../../../components/NavIconItem'
import {ComponentBar} from '../../ComponentBar'
import {ActionList} from './ActionList'
import {FormList} from './FormList'
import {Tree} from './Tree'

type LeftPanelSection = 'tree' | 'forms' | 'components'

const leftPanelTabs = {
  'tree': <Tree/>,
  'components': <ComponentBar draggable={true}/>,
  'actions': <ActionList/>,
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
    <SNav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}>
      {NavIconItem('tree', title('tree'), faSitemap, {color: 'var(--rs-navs-selected)'})}
      {NavIconItem('components', title('components'), faPlusCircle, {color: 'var(--rs-green-600)'})}
      {NavIconItem('actions', title('actions'), faBolt, {color: 'violet'})}
      {formsTab}
    </SNav>
    {leftPanelTabs[activeTab]}
  </>
})
