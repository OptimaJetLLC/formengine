import {AnnotationTypeMap} from './types'
import {Container} from './utils/annotations/Container'
import {Event} from './utils/annotations/Event'
import {Module} from './utils/annotations/Module'
import {Property} from './utils/annotations/Property'

export const AnnotationMap: AnnotationTypeMap = {
  Property: Property,
  Container: Container,
  Event: Event,
  Module: Module,
}
