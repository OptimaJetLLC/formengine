import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useState} from 'react'
import {isDesignerLocalStorageEnabled} from '../../../../utils/isDesignerLocalStorageEnabled'
import {NavTab} from './components/NavTab'
import {Properties} from './components/Properties'
import {Section} from './Section'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;

  .placement-left .rs-popover {
    margin-inline-start: -14px;
  }
`

const tabs: Record<Section, boolean> = {
  [Section.Main]: true,
  [Section.Style]: true,
  [Section.Actions]: true,
  [Section.Rules]: true,
}

const localStoragePropertiesActiveTabKey = 'propertiesActiveTab'

const saveActiveTab = (tabName: Section) => {
  if (isDesignerLocalStorageEnabled()) {
    localStorage.setItem(localStoragePropertiesActiveTabKey, tabName)
  }
}

const getActiveTab = () => {
  const defaultTab = Section.Main
  const value = isDesignerLocalStorageEnabled()
    ? localStorage.getItem(localStoragePropertiesActiveTabKey) as Section ?? defaultTab
    : defaultTab
  return tabs[value] ? value : defaultTab
}

const RawPropertiesEditor = () => {
  const [activeTab, setActiveTab] = useState(getActiveTab())

  const handleTabChange = useCallback((tab: Section) => {
    setActiveTab(tab)
    saveActiveTab(tab)
  }, [])

  return <Container>
    <NavTab activeTab={activeTab} setActiveTab={handleTabChange}/>
    <Properties activeTab={activeTab}/>
  </Container>
}

const PropertiesEditor = namedObserver('PropertiesEditor', RawPropertiesEditor)

export {PropertiesEditor}
