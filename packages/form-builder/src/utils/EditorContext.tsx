import {createNamedContext} from 'fb-core'
import {Annotation} from '../features/annotation/types/annotations/Annotation'

type AnnotationContext = {
  annotation: Annotation
  getContext: () => Record<string, any>
}

const [useAnnotation, AnnotationProvider] = createNamedContext<AnnotationContext>('AnnotationContext')

export {useAnnotation, AnnotationProvider}
