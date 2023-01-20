import {createNamedContext} from 'form-viewer'
import {Annotation} from '../../features/annotation/utils/annotations/Annotation'

type AnnotationContext = {
  annotation: Annotation
  getContext: () => Record<string, any>
}

const [useAnnotation, AnnotationProvider] = createNamedContext<AnnotationContext>('AnnotationContext')

export {useAnnotation, AnnotationProvider}
