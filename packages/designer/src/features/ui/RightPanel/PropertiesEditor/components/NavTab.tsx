import * as faBolt from '@fortawesome/free-solid-svg-icons/faBolt.js'
import * as faCircle from '@fortawesome/free-solid-svg-icons/faCircle.js'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush.js'
import * as faSpellCheck from '@fortawesome/free-solid-svg-icons/faSpellCheck.js'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {customizableTab, SNav} from '../../../../components/NavIconItem'
import {customizableObserver} from '../../../../customization'
import {CustomizableKey} from '../../../../customization/types'
import {Section} from '../Section'

interface NavProps {
  activeTab: Section,
  setActiveTab: (activeTab: Section) => void
}

const tabsProps: Record<Section, [key: CustomizableKey, icon: any, color: string]> = {
  [Section.Main]: ['Main_Tab', faCircle, 'var(--rs-navs-selected)'],
  [Section.Style]: ['Style_Tab', faPaintBrush, '#f67f1f'],
  [Section.Actions]: ['Actions_Tab', faBolt, 'violet'],
  [Section.Rules]: ['Rules_Tab', faSpellCheck, 'var(--rs-green-600)']
}

const useRenderTab = (section: Section) => {
  const {t} = useTranslation()
  return useMemo(() => {
    const title = t('propertiesEditor.sectionName.' + section)
    const [key, icon, color] = tabsProps[section]
    return customizableTab(section, key, title, icon, {color})
  }, [t, section])
}

export const NavTab = customizableObserver('RightPanel_Nav', ({activeTab, setActiveTab, ...props}: NavProps) => {
  return <SNav activeKey={activeTab} onSelect={setActiveTab} appearance="subtle"  {...props}>
    {useRenderTab(Section.Main)}
    {useRenderTab(Section.Style)}
    {useRenderTab(Section.Actions)}
    {useRenderTab(Section.Rules)}
  </SNav>
})
