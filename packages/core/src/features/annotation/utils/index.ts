import {FirstParameter} from '../types'
import {Annotation} from '../types/annotations/Annotation'
import {ContainerAn} from '../types/annotations/ContainerAn'
import {AnnotationBuilder} from './builders/AnnotationBuilder'

/**
 * Type predicate, asserts that the value is an instance of ContainerAn.
 * @param value the value.
 * @returns true if the value is an instance of ContainerAn, false otherwise.
 */
export const isContainer = (value: Annotation): value is ContainerAn => {
  return value instanceof ContainerAn
}

export const createAnnotation = AnnotationBuilder.create

/**
 * Creates an instance of the builder class to define the property's metadata.
 * @param editor editor type for editing the property.
 * @returns the instance of the builder class to define the property's metadata.
 */
export function createProperty(editor: FirstParameter<typeof createAnnotation>) {
  return createAnnotation(editor).setup({annotationType: 'Property'})
}
