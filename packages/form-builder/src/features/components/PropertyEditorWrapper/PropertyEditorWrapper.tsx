import {observer} from 'mobx-react'
import {createElement} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {AnnotationProvider} from '../../../utils/EditorContext'
import {EditorMap} from '../../annotation-editors'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {Erroneous} from './Erroneous'

interface ControlProps {
  annotation: Annotation
  getContext: () => object
}

export const PropertyEditorWrapper = observer(({annotation, getContext}: ControlProps) => {
  // custom editors have the highest priority
  const store = useBuilderStore()
  const propertyEditor = store.customPropertyEditor(annotation.editor) ?? EditorMap[annotation.editor]
  const ErrorWrapper = observer(Erroneous)

  return (
    <AnnotationProvider value={{annotation, getContext}}>
      <ErrorWrapper>
        {createElement(observer(propertyEditor))}
      </ErrorWrapper>
    </AnnotationProvider>
  )
})
