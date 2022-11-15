import {FirstParameter, PropertyEditorProps} from '../types'
import {Annotation} from './annotations/Annotation'
import {Container} from './annotations/Container'
import {Event} from './annotations/Event'
import {Module} from './annotations/Module'
import {Property} from './annotations/Property'
import {AnnotationBuilder} from './builders/AnnotationBuilder'

export const isContainer = (value: Annotation): value is Container => {
  return value instanceof Container
}

export const isProperty = (value: Annotation): value is Property => {
  return value instanceof Property
}

export const isFunc = (value: Annotation): value is Event => {
  return value instanceof Event
}

export const isModule = (value: Annotation): value is Module => {
  return value instanceof Module
}

export const createAnnotation = AnnotationBuilder.create

export const makeAnnotationProps = ({componentStore, annotation}: PropertyEditorProps) => {
  const value = componentStore.props[annotation.key] ?? annotation.scheme?.getDefault()
  const onChange = (value: any) => {
    componentStore.props[annotation.key] = value
  }
  return {value, onChange}
}

export function createProperty(editors: FirstParameter<typeof createAnnotation>) {
  return createAnnotation(editors).setup({type: 'Property'})
}
