import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {Suspense} from 'react'
import {Loader} from 'rsuite'
import {BottomPanel} from './features/ui/BottomPanel'
import {BuilderProviders} from './features/ui/BuilderProviders'
import {CentralPanel} from './features/ui/CentralPanel'
import {ComponentsModal} from './features/ui/ComponentBar/ComponentsModal'
import {LeftPanel} from './features/ui/LeftPanel'
import {RightPanel} from './features/ui/RightPanel'
import {FormBuilderProps} from './FormBuilderProps'
import {useBuilderStore} from './utils/BuilderStoreContext'

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

const FormBuilderView = observer(() => {
  const builderStore = useBuilderStore()
  const renderBottomPanel = builderStore.calculatedProperty && builderStore.builderMode === 'builder'

  return <Suspense fallback={<Loader center content="loading"/>}>
    <Container>
      <Content>
        <LeftPanel/>
        <CentralPanel/>
        <RightPanel/>
        <ComponentsModal/>
      </Content>
      {renderBottomPanel && <BottomPanel/>}
    </Container>
  </Suspense>
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  background-color: #f7f7fa;

  .rs-theme-dark & {
    background-color: #3b3f43;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-height: 0;
`


