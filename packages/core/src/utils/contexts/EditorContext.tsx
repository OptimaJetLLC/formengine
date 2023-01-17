import {Annotation} from '../../features/annotation/utils/annotations/Annotation'
import {createContext} from '../createContextHook'

type AnnotationContext = {
  annotation: Annotation
  getContext: () => Record<string, any>
}

const [useAnnotation, AnnotationProvider] = createContext<AnnotationContext>('AnnotationContext')

export {useAnnotation, AnnotationProvider}
