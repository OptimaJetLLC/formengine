import * as faList from '@fortawesome/free-solid-svg-icons/faList.js'
import * as faPlusCircle from '@fortawesome/free-solid-svg-icons/faPlusCircle.js'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap.js'
import * as faSliders from '@fortawesome/free-solid-svg-icons/faSlidersH.js'
import type {ComponentData} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {isDesignerLocalStorageEnabled} from '../../../../utils/isDesignerLocalStorageEnabled'
import {Rows} from '../../../components/Containers'
import {CustomizableTab, SNav} from '../../../components/NavIconItem'
import {customizable} from '../../../customization'
import type {CustomizableKey} from '../../../customization/types'
import type {DraggableProps} from '../../ComponentBar'
import {ComponentBar} from '../../ComponentBar'
import {FormList} from './FormList'
import {FormSettings} from './FormSettings'
import styles from './LeftPanelNav.module.css'
import {Tree} from './Tree'

type LeftPanelSection = 'tree' | 'forms' | 'components' | 'settings'

const Nav = customizable('LeftPanel_Nav', SNav)
const NavContent = customizable('LeftPanel_Content', Rows)
const Components = customizable('Components_Tab_Content', ComponentBar)

const ComponentsTab = (props: DraggableProps) => {
  const builderStore = useBuilderStore()

  const handleDoubleClick = useCallback((source: ComponentData) => {
    const root = builderStore.viewer.form.componentTree
    const target = builderStore.selected.values().next().value ?? root
    const insertPosition = root === target ? 'inner' : 'after'
    builderStore.add(source, target, insertPosition)
  }, [builderStore])

  return <Components {...props} draggable={true} onDoubleClick={handleDoubleClick}/>
}

const tabsProps: Record<LeftPanelSection, [content: ReactNode, key: CustomizableKey, icon: any, className: string]> = {
  components: [<ComponentsTab key={'components'}/>, 'Components_Tab', faPlusCircle, styles.componentsTab],
  tree: [<Tree key={'tree'}/>, 'Tree_Tab', faSitemap, styles.treeTab],
  settings: [<FormSettings key={'settings'}/>, 'Settings_Tab', faSliders, styles.settingsTab],
  forms: [<FormList key={'forms'}/>, 'Forms_Tab', faList, styles.formsTab]
}

const Tab = ({section, ...rest}: Record<string, unknown> & { section: keyof typeof tabsProps }) => {
  const {t} = useTranslation()
  const title = t('leftPanel.sectionName.' + section)
  const [_, key, icon, className] = tabsProps[section]
  const props = useMemo(() => ({className, ...rest}), [className, rest])

  return <CustomizableTab eventKey={section} customizableKey={key} title={title} icon={icon} props={props}/>
}

const localStorageLeftPanelActiveTabKey = 'leftPanelActiveTab'

const saveActiveTab = (tabName: LeftPanelSection) => {
  if (isDesignerLocalStorageEnabled()) {
    localStorage.setItem(localStorageLeftPanelActiveTabKey, tabName)
  }
}

const defaultTab = 'components'

const getActiveTab = () => {
  const value = isDesignerLocalStorageEnabled()
    ? localStorage.getItem(localStorageLeftPanelActiveTabKey) as LeftPanelSection ?? defaultTab
    : defaultTab
  return tabsProps[value] ? value : defaultTab
}

const RawLeftPanelNav = () => {
  const {formStorageEnabled} = useBuilderStore()
  const [activeTab, setActiveTab] = useState<LeftPanelSection>(getActiveTab())
  const activeKey = activeTab === 'forms' && !formStorageEnabled ? defaultTab : activeTab

  const handleTabChange = useCallback((tab: LeftPanelSection) => {
    setActiveTab(tab)
    saveActiveTab(tab)
  }, [])

  return <>
    <Nav appearance="subtle" activeKey={activeKey} onSelect={handleTabChange}>
      <Tab section="components"/>
      <Tab section="tree"/>
      <Tab section="settings"/>
      {formStorageEnabled && <Tab section="forms"/>}
    </Nav>
    <NavContent className={styles.navContent}>
      {tabsProps[activeKey][0]}
    </NavContent>
  </>
}

export const LeftPanelNav = namedObserver('LeftPanelNav', RawLeftPanelNav)
