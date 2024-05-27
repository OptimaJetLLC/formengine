import * as faList from '@fortawesome/free-solid-svg-icons/faList.js'
import * as faPlusCircle from '@fortawesome/free-solid-svg-icons/faPlusCircle.js'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap.js'
import * as faSliders from '@fortawesome/free-solid-svg-icons/faSlidersH.js'
import {namedObserver} from '@react-form-builder/core'
import {ReactNode, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Rows} from '../../../components/Containers'
import {customizableTab, SNav} from '../../../components/NavIconItem'
import {customizable} from '../../../customization'
import type {CustomizableKey} from '../../../customization/types'
import {ComponentBar} from '../../ComponentBar'
import {FormList} from './FormList'
import {FormSettings} from './FormSettings'
import {Tree} from './Tree'

type LeftPanelSection = 'tree' | 'forms' | 'components'

const Nav = customizable('LeftPanel_Nav', SNav)
const NavContent = customizable('LeftPanel_Content', Rows)
const Components = customizable('Components_Tab_Content', ComponentBar)

const tabsProps: Record<string, [content: ReactNode, key: CustomizableKey, icon: any, color: string]> = {
  components: [<Components draggable={true}/>, 'Components_Tab', faPlusCircle, 'var(--rs-green-600)'],
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

export const LeftPanelNav = namedObserver('LeftPanelNav', () => {
  const {formStorageEnabled} = useBuilderStore()
  const [activeTab, setActiveTab] = useState<LeftPanelSection>('components')

  const components = useRenderTab('components')
  const tree = useRenderTab('tree')
  const settings = useRenderTab('settings')
  const forms = useRenderTab('forms')

  return <>
    <Nav appearance="subtle" activeKey={activeTab} onSelect={setActiveTab}>
      {components}
      {tree}
      {settings}
      {formStorageEnabled && forms}
    </Nav>
    <NavContent style={{minHeight: 0, overflow: 'auto', padding: 4}}>
      {tabsProps[activeTab][0]}
    </NavContent>
  </>
})
