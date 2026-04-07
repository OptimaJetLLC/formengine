import * as faBolt from '@fortawesome/free-solid-svg-icons/faBolt.js'
import * as faCircle from '@fortawesome/free-solid-svg-icons/faCircle.js'
import * as faPaintBrush from '@fortawesome/free-solid-svg-icons/faPaintBrush.js'
import * as faSpellCheck from '@fortawesome/free-solid-svg-icons/faSpellCheck.js'
import {cfDisableStyles, cfDisableWrapperStyles} from '@react-form-builder/core'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {useIsSelectedComponentFeatureEnabled} from '../../../../../utils/useIsSelectedComponentFeatureEnabled'
import {CustomizableTab, SNav} from '../../../../components/NavIconItem'
import {customizableObserver} from '../../../../customization'
import type {CustomizableKey} from '../../../../customization/types'
import {Section} from '../Section'
import styles from './NavTab.module.css'

interface NavProps {
  activeTab: Section,
  setActiveTab: (activeTab: Section) => void
}

const tabsProps: Record<Section, [key: CustomizableKey, icon: any, className: string]> = {
  [Section.Main]: ['Main_Tab', faCircle, styles.mainTab],
  [Section.Style]: ['Style_Tab', faPaintBrush, styles.styleTab],
  [Section.Actions]: ['Actions_Tab', faBolt, styles.actionsTab],
  [Section.Rules]: ['Rules_Tab', faSpellCheck, styles.rulesTab]
}

const Tab = ({section, ...rest}: Record<string, unknown> & { section: Section }) => {
  const {t} = useTranslation()
  const title = t('propertiesEditor.sectionName.' + section)
  const [key, icon, className] = tabsProps[section]
  const props = useMemo(() => ({className, ...rest}), [className, rest])

  return <CustomizableTab eventKey={section} customizableKey={key} title={title} icon={icon} props={props}/>
}

const RawNavTab = ({activeTab, setActiveTab, ...props}: NavProps) => {
  const disableStyles = useIsSelectedComponentFeatureEnabled(cfDisableStyles)
  const disableWrapperStyles = useIsSelectedComponentFeatureEnabled(cfDisableWrapperStyles)
  const disableStylesTab = disableStyles && disableWrapperStyles

  return <SNav activeKey={activeTab} onSelect={setActiveTab} appearance="subtle" {...props}>
    <Tab section={Section.Main}/>
    <Tab section={Section.Style} disabled={disableStylesTab}/>
    <Tab section={Section.Actions}/>
    <Tab section={Section.Rules}/>
  </SNav>
}

export const NavTab = customizableObserver('RightPanel_Nav', RawNavTab)
