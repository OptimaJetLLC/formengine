import * as faBolt from '@fortawesome/free-solid-svg-icons/faBolt.js'
import * as faCircle from '@fortawesome/free-solid-svg-icons/faCircle.js'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush.js'
import * as faSpellCheck from '@fortawesome/free-solid-svg-icons/faSpellCheck.js'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {CustomizableTab, SNav} from '../../../../components/NavIconItem'
import {customizableObserver} from '../../../../customization'
import type {CustomizableKey} from '../../../../customization/types'
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

const Tab = ({section, ...rest}: Record<string, unknown> & { section: Section }) => {
  const {t} = useTranslation()
  const title = t('propertiesEditor.sectionName.' + section)
  const [key, icon, color] = tabsProps[section]
  const props = useMemo(() => ({color, ...rest}), [color, rest])

  return <CustomizableTab eventKey={section} customizableKey={key} title={title} icon={icon} props={props}/>
}

const RawNavTab = ({activeTab, setActiveTab, ...props}: NavProps) =>
  <SNav activeKey={activeTab} onSelect={setActiveTab} appearance="subtle" {...props}>
    <Tab section={Section.Main}/>
    <Tab section={Section.Style}/>
    <Tab section={Section.Actions}/>
    <Tab section={Section.Rules}/>
  </SNav>

export const NavTab = customizableObserver('RightPanel_Nav', RawNavTab)
