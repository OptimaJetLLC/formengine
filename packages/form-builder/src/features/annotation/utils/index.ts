import {FirstParameter} from '../types'
import {Annotation} from '../types/annotations/Annotation'
import {ContainerAn} from '../types/annotations/ContainerAn'
import {AnnotationBuilder} from './builders/AnnotationBuilder'

export const isContainer = (value: Annotation): value is ContainerAn => {
  return value instanceof ContainerAn
}

export const createAnnotation = AnnotationBuilder.create

export function createProperty(editor: FirstParameter<typeof createAnnotation>) {
  return createAnnotation(editor).setup({type: 'Property'})
}
