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
import {Rows} from '../../../components/Containers'
import {customizableTab, SNav} from '../../../components/NavIconItem'
import {customizable} from '../../../customization'
import type {CustomizableKey} from '../../../customization/types'
import type {DraggableProps} from '../../ComponentBar'
import {ComponentBar} from '../../ComponentBar'
import {FormList} from './FormList'
import {FormSettings} from './FormSettings'
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

const tabsProps: Record<LeftPanelSection, [content: ReactNode, key: CustomizableKey, icon: any, color: string]> = {
  components: [<ComponentsTab/>, 'Components_Tab', faPlusCircle, 'var(--rs-green-600)'],
  tree: [<Tree/>, 'Tree_Tab', faSitemap, 'var(--rs-navs-selected)'],
  settings: [<FormSettings/>, 'Settings_Tab', faSliders, 'violet'],
  forms: [<FormList/>, 'Forms_Tab', faList, '#f67f1f']
}

const useRenderTab = (section: keyof typeof tabsProps) => {
  const {t} = useTranslation()
  return useMemo(() => {
    const title = t('leftPanel.sectionName.' + section)
    const [_, key, icon, color] = tabsProps[section]
    return customizableTab(section, key, title, icon, {color})
  }, [t, section])
}

const localStorageLeftPanelActiveTabKey = 'leftPanelActiveTab'

const saveActiveTab = (tabName: LeftPanelSection) => {
  localStorage.setItem(localStorageLeftPanelActiveTabKey, tabName)
}

const getActiveTab = () => {
  const defaultTab = 'components'
  const value = localStorage.getItem(localStorageLeftPanelActiveTabKey) as LeftPanelSection ?? defaultTab
  return tabsProps[value] ? value : defaultTab
}

const RawLeftPanelNav = () => {
  const {formStorageEnabled} = useBuilderStore()
  const [activeTab, setActiveTab] = useState<LeftPanelSection>(getActiveTab())

  const components = useRenderTab('components')
  const tree = useRenderTab('tree')
  const settings = useRenderTab('settings')
  const forms = useRenderTab('forms')

  const handleTabChange = useCallback((tab: LeftPanelSection) => {
    setActiveTab(tab)
    saveActiveTab(tab)
  }, [])

  return <>
    <Nav appearance="subtle" activeKey={activeTab} onSelect={handleTabChange}>
      {components}
      {tree}
      {settings}
      {formStorageEnabled && forms}
    </Nav>
    <NavContent style={{minHeight: 0, overflow: 'auto', padding: 4}}>
      {tabsProps[activeTab][0]}
    </NavContent>
  </>
}

export const LeftPanelNav = namedObserver('LeftPanelNav', RawLeftPanelNav)
