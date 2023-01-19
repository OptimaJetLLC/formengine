import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {CodeEditorPanel} from '../../calculation/components/CodeEditorPanel'
import {CentralPanel} from './CentralPanel'
import {LeftPanel} from './LeftPanel'
import {RightPanel} from './RightPanel'

const _Content = () => {
  return <>
    <Container>
      <LeftPanel/> <CentralPanel/> <RightPanel/>
    </Container>
    <CodeEditorPanel/>
  </>
}

export const Content = observer(_Content)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 0;
`
