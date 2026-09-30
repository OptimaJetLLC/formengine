import * as faList from '@fortawesome/free-solid-svg-icons/faList.js'
import * as faPlusCircle from '@fortawesome/free-solid-svg-icons/faPlusCircle.js'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap.js'
import * as faSliders from '@fortawesome/free-solid-svg-icons/faSlidersH.js'
import type {ComponentData} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {CanAddComponentProvider} from '../../../../utils/AddComponentContext'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Rows} from '../../../components/Containers'
import {CustomizableTab, SNav} from '../../../components/NavIconItem'
import {customizable} from '../../../customization/customizable'
import type {CustomizableKey} from '../../../customization/types'
import {ComponentBar} from '../../ComponentBar/ComponentBar'
import type {DraggableProps} from '../../ComponentBar/DraggableProps'
import type {LeftPanelSection} from '../leftPanelTab'
import {defaultLeftPanelTab} from '../leftPanelTab'
import {FormList} from './FormList'
import {FormSettings} from './FormSettings'
import styles from './LeftPanelNav.module.css'
import {Tree} from './Tree'

const Nav = customizable('LeftPanel_Nav', SNav)
const NavContent = customizable('LeftPanel_Content', Rows)
const Components = customizable('Components_Tab_Content', ComponentBar)

const ComponentsTab = (props: DraggableProps) => {
  const builderStore = useBuilderStore()

  const canAdd = useCallback(
    (componentData: ComponentData) => {
      const root = builderStore.viewer.form.componentTree
      return builderStore.getAddComponentResult(componentData, root, 'inner')
    },
    [builderStore]
  )

  const handleDoubleClick = useCallback(
    (source: ComponentData) => {
      const root = builderStore.viewer.form.componentTree
      const target = builderStore.selected.values().next().value ?? root
      const insertPosition = root === target ? 'inner' : 'after'
      builderStore.add(source, target, insertPosition)
    },
    [builderStore]
  )

  return (
    <CanAddComponentProvider value={canAdd}>
      <Components {...props} draggable={true} onDoubleClick={handleDoubleClick} />
    </CanAddComponentProvider>
  )
}

const tabsProps: Record<LeftPanelSection, [content: ReactNode, key: CustomizableKey, icon: any, className: string]> = {
  components: [<ComponentsTab key={'components'} />, 'Components_Tab', faPlusCircle, styles.componentsTab],
  tree: [<Tree key={'tree'} />, 'Tree_Tab', faSitemap, styles.treeTab],
  settings: [<FormSettings key={'settings'} />, 'Settings_Tab', faSliders, styles.settingsTab],
  forms: [<FormList key={'forms'} />, 'Forms_Tab', faList, styles.formsTab],
}

const Tab = ({section, ...rest}: Record<string, unknown> & {section: keyof typeof tabsProps}) => {
  const {t} = useTranslation()
  const title = t('leftPanel.sectionName.' + section)
  const [_, key, icon, className] = tabsProps[section]
  const props = useMemo(() => ({className, ...rest}), [className, rest])

  return <CustomizableTab eventKey={section} customizableKey={key} title={title} icon={icon} props={props} />
}

const RawLeftPanelNav = () => {
  const builderStore = useBuilderStore()
  const {formStorageEnabled, leftPanel} = builderStore
  const activeKey = leftPanel.activeTab === 'forms' && !formStorageEnabled ? defaultLeftPanelTab : leftPanel.activeTab

  const handleTabChange = useCallback(
    (tab: LeftPanelSection) => {
      builderStore.leftPanel.setActiveTab(tab)
    },
    [builderStore]
  )

  return (
    <>
      <Nav appearance="subtle" activeKey={activeKey} onSelect={handleTabChange}>
        <Tab section="components" />
        <Tab section="tree" />
        <Tab section="settings" />
        {formStorageEnabled && <Tab section="forms" />}
      </Nav>
      <NavContent className={styles.navContent}>{tabsProps[activeKey][0]}</NavContent>
    </>
  )
}

export const LeftPanelNav = namedObserver('LeftPanelNav', RawLeftPanelNav)
