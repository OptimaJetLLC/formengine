import {FirstParameter} from '../types'
import {Annotation} from './annotations/Annotation'
import {ContainerAn} from './annotations/ContainerAn'
import {EventAn} from './annotations/EventAn'
import {ModuleAn} from './annotations/ModuleAn'
import {StyleAn} from './annotations/StyleAn'
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

export function createProperty(editors: FirstParameter<typeof createAnnotation>) {
  return createAnnotation(editors).setup({type: 'Property'})
}
