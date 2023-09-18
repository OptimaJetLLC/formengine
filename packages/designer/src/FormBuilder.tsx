import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {Suspense} from 'react'
import {Loader} from 'rsuite'
import {BottomPanel} from './features/ui/BottomPanel'
import {BuilderProviders} from './features/ui/BuilderProviders'
import {CentralPanel} from './features/ui/CentralPanel'
import {ComponentsModal} from './features/ui/ComponentBar/ComponentsModal'
import {LeftPanel} from './features/ui/LeftPanel'
import {PromptDialog} from './features/ui/PromptDialog'
import {RightPanel} from './features/ui/RightPanel'
import {FormBuilderProps} from './FormBuilderProps'

/**
 * The React component that displays the form builder.
 * @param props the React component properties.
 * @returns the React element.
 */
export const FormBuilder = observer((props: FormBuilderProps) => {
  return <BuilderProviders props={props}>
    <FormBuilderView/>
  </BuilderProviders>
})

const FormBuilderView = observer(() => (
  <Suspense fallback={<Loader center content="loading"/>}>
    <Container>
      <Content>
        <LeftPanel/>
        <CentralPanel/>
        <RightPanel/>
        <ComponentsModal/>
        <PromptDialog/>
      </Content>
      <BottomPanel/>
    </Container>
  </Suspense>
))

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  background-color: white;

  .rs-theme-dark & {
    background-color: #303336;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-height: 0;
  padding-bottom: 15px;
  overflow: hidden;
`


