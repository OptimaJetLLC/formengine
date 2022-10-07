import * as faCircle from '@fortawesome/free-solid-svg-icons/faCircle'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush'
import {observer} from 'mobx-react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {Nav as RNav} from 'rsuite'
import {NavIconItem} from '../../../../features/ui/NavIconItem'

interface NavProps {
  activeTab: string,
  setActiveTab: (activeTab: string) => void
}

export const NavTab = observer(({activeTab, setActiveTab}: NavProps) => {
  const {t} = useTranslation()
  const title = (key: string) => t('leftPanelTabs.sectionName.' + key)
  return <RNav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}
               style={{marginBottom: 10}}>
    {NavIconItem('Elements', title('elements'), faCircle, {color: 'var(--rs-navs-selected)'})}
    {NavIconItem('Tree', 'Tree', faPaintBrush, {color: '#f67f1f'})}
  </RNav>
})
