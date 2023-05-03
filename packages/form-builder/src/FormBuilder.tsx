import {observer} from 'mobx-react'
import {Suspense} from 'react'
import {Loader} from 'rsuite'
import {BuilderProviders} from './features/ui/BuilderProviders'
import {Container} from './features/ui/Container'
import {Content} from './features/ui/Content'
import {Header} from './features/ui/Header/Header'
import {FormBuilderProps} from './FormBuilderProps'

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
