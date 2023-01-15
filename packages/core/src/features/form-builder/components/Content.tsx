import styled from '@emotion/styled'
import React from 'react'
import {CodeEditorPanel} from '../CodeEditorPanel'
import {CentralPanel} from './CentralPanel'
import {LeftPanel} from './LeftPanel'
import {RightPanel} from './RightPanel'
import {usePropertyContext} from './RightPanel/PropertiesEditor/PropertyContext'

export default () => {
  const {property, clear} = usePropertyContext()
  return <>
    <Container>
      <LeftPanel/> <CentralPanel/> <RightPanel/>
    </Container>
    {property && <CodeEditorPanel property={property} onClose={clear}/>}
  </>
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 0;
`
