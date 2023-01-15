import {observer} from 'mobx-react'
import React, {Suspense, useState} from 'react'
import {Loader} from 'rsuite'
import {ComponentStore} from '../../stores/ComponentStore'
import {Annotation} from '../annotation/utils/annotations/Annotation'
import {FormViewerProps} from '../form-viewer/FormViewer'
import {BuilderProviders} from './components/BuilderProviders'
import {Container} from './components/Container'
import Content from './components/Content'
import {Header} from './components/Header/Header'
import {PropertyContextProvider, PropertyContextValue} from './components/RightPanel/PropertiesEditor/PropertyContext'

export interface FormBuilderProps extends FormViewerProps {
}

export const FormBuilder = observer((props: FormBuilderProps) => {
  const [propertyContextValue, setPropertyContextValue] = useState<PropertyContextValue>({
    setCurrentProperty: (componentStore: ComponentStore, annotation: Annotation) =>
      setPropertyContextValue({
        property: {
          componentKey: componentStore.key,
          useFn: componentStore.props[annotation.key]?.useFn,
          fnSource: componentStore.props[annotation.key]?.fnSource,
          componentStore: componentStore,
          annotation: annotation,
        },
        setCurrentProperty: propertyContextValue.setCurrentProperty,
        clear: propertyContextValue.clear
      }),
    clear: () => setPropertyContextValue({
      setCurrentProperty: propertyContextValue.setCurrentProperty,
      clear: propertyContextValue.clear
    })
  })

  return <BuilderProviders props={props}>
    <Suspense fallback={<Loader center content="loading"/>}>
      <Container>
        <Header/>
        <PropertyContextProvider value={propertyContextValue}>
          <Content/>
        </PropertyContextProvider>
      </Container>
    </Suspense>
  </BuilderProviders>
})
