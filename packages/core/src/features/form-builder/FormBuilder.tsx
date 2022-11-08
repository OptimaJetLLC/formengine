import {observer} from 'mobx-react'
import React, {Suspense} from 'react'
import {Loader} from 'rsuite'
import {FormViewerProps} from '../form-viewer/FormViewer'
import {BuilderProviders} from './components/BuilderProviders'
import {CentralPanel} from './components/CentralPanel'
import {Container} from './components/Container'
import {Content} from './components/Content'
import {Header} from './components/Header/Header'
import {LeftPanel} from './components/LeftPanel'
import {RightPanel} from './components/RightPanel'

export interface FormBuilderProps extends FormViewerProps {
}

export const FormBuilder = observer((props: FormBuilderProps) => (
  <BuilderProviders props={props}>
    <Suspense fallback={<Loader center content="loading"/>}>
      <Container>
        <Header/>
        <Content>
          <LeftPanel/> <CentralPanel/> <RightPanel/>
        </Content>
      </Container>
    </Suspense>
  </BuilderProviders>
))
