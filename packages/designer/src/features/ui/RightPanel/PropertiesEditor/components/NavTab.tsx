import * as faBolt from '@fortawesome/free-solid-svg-icons/faBolt.js'
import * as faCircle from '@fortawesome/free-solid-svg-icons/faCircle.js'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush.js'
import * as faSpellCheck from '@fortawesome/free-solid-svg-icons/faSpellCheck.js'
import {namedObserver} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {NavIconItem, SNav} from '../../../../components/NavIconItem'
import {Section} from '../Section'

interface NavProps {
  activeTab: Section,
  setActiveTab: (activeTab: Section) => void
}

export const NavTab = namedObserver('NavTab', ({activeTab, setActiveTab}: NavProps) => {
  const {t} = useTranslation()
  const title = (key: string) => t('propertiesEditor.sectionName.' + key)
  return <SNav activeKey={activeTab} onSelect={setActiveTab} appearance="subtle">
    {NavIconItem(Section.Main, title(Section.Main), faCircle, {color: 'var(--rs-navs-selected)'})}
    {NavIconItem(Section.Style, title(Section.Style), faPaintBrush, {color: '#f67f1f'})}
    {NavIconItem(Section.Actions, title(Section.Actions), faBolt, {color: 'violet'})}
    {NavIconItem(Section.Rules, title(Section.Rules), faSpellCheck, {color: 'var(--rs-green-600)'})}
  </SNav>
})
