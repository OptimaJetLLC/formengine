import styled from '@emotion/styled'
import {Section} from 'fb-core'
import {observer} from 'mobx-react'
import {useState} from 'react'
import {NavTab} from './components/NavTab'
import {Properties} from './components/Properties'

const PropertiesEditor = observer(() => {
  const [activeTab, setActiveTab] = useState(Section.Main)

  return <Container>
    <NavTab activeTab={activeTab} setActiveTab={setActiveTab}/>
    <Properties activeTab={activeTab}/>
  </Container>
})

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .placement-left .rs-popover {
    margin-left: -14px;
  }
`

export {PropertiesEditor}
