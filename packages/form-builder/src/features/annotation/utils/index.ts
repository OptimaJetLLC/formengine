import {FirstParameter} from '../types'
import {Annotation} from '../types/annotations/Annotation'
import {ContainerAn} from '../types/annotations/ContainerAn'
import {EventAn} from '../types/annotations/EventAn'
import {ModuleAn} from '../types/annotations/ModuleAn'
import {StyleAn} from '../types/annotations/StyleAn'
import {AnnotationBuilder} from './builders/AnnotationBuilder'

export const isContainer = (value: Annotation): value is ContainerAn => {
  return value instanceof ContainerAn
}

export const isStyle = (value: Annotation): value is StyleAn => {
  return value instanceof StyleAn
}

export const isFunc = (value: Annotation): value is EventAn => {
  return value instanceof EventAn
}

export const isModule = (value: Annotation): value is ModuleAn => {
  return value instanceof ModuleAn
}

export const createAnnotation = AnnotationBuilder.create

export function createProperty(editor: FirstParameter<typeof createAnnotation>) {
  return createAnnotation(editor).setup({type: 'Property'})
}
