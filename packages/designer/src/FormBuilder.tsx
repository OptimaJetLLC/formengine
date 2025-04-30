import styled from '@emotion/styled'
import {namedObserver, SuppressResizeObserverErrors} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {Suspense} from 'react'
import {Loader} from 'rsuite'
import {customizableObserver} from './features/customization'
import {BottomPanel} from './features/ui/BottomPanel'
import {BuilderProviders} from './features/ui/BuilderProviders'
import {CentralPanel} from './features/ui/CentralPanel'
import {ComponentsModal} from './features/ui/ComponentBar/ComponentsModal'
import {LeftPanel} from './features/ui/LeftPanel'
import {PromptDialog} from './features/ui/PromptDialog'
import {RightPanel} from './features/ui/RightPanel'
import type {FormBuilderProps} from './FormBuilderProps'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
`

const RawFormBuilderView = (props: ComponentProps<typeof Container>) => (
  <SuppressResizeObserverErrors>
    <Suspense fallback={<Loader center content="loading"/>}>
      <Container>
        <Content {...props}>
          <LeftPanel/>
          <CentralPanel/>
          <RightPanel/>
          <ComponentsModal/>
          <PromptDialog/>
        </Content>
        <BottomPanel/>
      </Container>
    </Suspense>
  </SuppressResizeObserverErrors>
)

const FormBuilderView = customizableObserver('MainContainer', RawFormBuilderView)

/**
 * The React component that displays the form builder.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawFormBuilder = (props: FormBuilderProps) =>
  <BuilderProviders props={props}>
    <FormBuilderView/>
  </BuilderProviders>

export const FormBuilder = namedObserver('FormBuilder', RawFormBuilder)
