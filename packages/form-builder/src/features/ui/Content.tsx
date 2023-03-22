import styled from '@emotion/styled'
import {namedObserver} from 'fb-core'
import {BottomPanel} from './BottomPanel'
import {CentralPanel} from './CentralPanel'
import {LeftPanel} from './LeftPanel'
import {RightPanel} from './RightPanel'

export const Content = namedObserver('Content', () => <>
  <Container>
    <LeftPanel/> <CentralPanel/> <RightPanel/>
  </Container>
  <BottomPanel/>
</>)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  min-height: 0;
`
