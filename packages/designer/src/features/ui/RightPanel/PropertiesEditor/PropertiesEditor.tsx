import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import {useState} from 'react'
import {NavTab} from './components/NavTab'
import {Properties} from './components/Properties'
import {Section} from './Section'

const _PropertiesEditor = () => {
  const [activeTab, setActiveTab] = useState(Section.Main)

  return <Container>
    <NavTab activeTab={activeTab} setActiveTab={setActiveTab}/>
    <Properties activeTab={activeTab}/>
  </Container>
}

const PropertiesEditor = namedObserver('PropertiesEditor', _PropertiesEditor)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;

  .placement-left .rs-popover {
    margin-left: -14px;
  }
`

export {PropertiesEditor}
