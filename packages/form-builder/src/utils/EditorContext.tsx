import {Annotation, createNamedContext} from 'fb-core'

type AnnotationContext = {
  annotation: Annotation
  getContext: () => Record<string, any>
}

const [useAnnotation, AnnotationProvider] = createNamedContext<AnnotationContext>('AnnotationContext')

export {useAnnotation, AnnotationProvider}
