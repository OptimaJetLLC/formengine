import {FormViewerProps} from 'fb-core'
import {observer} from 'mobx-react'
import {Suspense} from 'react'
import {Loader} from 'rsuite'
import {BuilderProviders} from './components/BuilderProviders'
import {Container} from './components/Container'
import {Content} from './components/Content'
import {Header} from './components/Header/Header'

export interface FormBuilderProps extends FormViewerProps {
}

export const FormBuilder = observer((props: FormBuilderProps) => {
  return <BuilderProviders props={props}>
    <Suspense fallback={<Loader center content="loading"/>}>
      <Container>
        <Header/>
        <Content/>
      </Container>
    </Suspense>
  </BuilderProviders>
})
