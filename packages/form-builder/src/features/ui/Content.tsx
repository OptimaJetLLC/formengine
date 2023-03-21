import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {BottomPanel} from './BottomPanel'
import {CentralPanel} from './CentralPanel'
import {LeftPanel} from './LeftPanel'
import {RightPanel} from './RightPanel'

const _Content = () => <>
  <Container>
    <LeftPanel/> <CentralPanel/> <RightPanel/>
  </Container>
  <BottomPanel/>
</>

export const Content = observer(_Content)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  min-height: 0;
`
