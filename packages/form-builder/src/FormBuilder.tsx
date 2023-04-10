import {FormViewerProps} from 'fb-core'
import {observer} from 'mobx-react'
import {Suspense} from 'react'
import {Loader} from 'rsuite'
import {BuilderView} from './features/define'
import {BuilderProviders} from './features/ui/BuilderProviders'
import {Container} from './features/ui/Container'
import {Content} from './features/ui/Content'
import {Header} from './features/ui/Header/Header'

export interface FormBuilderProps extends FormViewerProps {
  view: BuilderView
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
