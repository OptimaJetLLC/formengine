import {createNonNullableContext} from '@react-form-builder/core'
import {Annotation} from '../features/annotation/types/annotations/Annotation'

type AnnotationContext = {
  annotation: Annotation
  getContext: () => Record<string, any>
}

const [useAnnotation, AnnotationProvider] = createNonNullableContext<AnnotationContext>('AnnotationContext')

export {useAnnotation, AnnotationProvider}
