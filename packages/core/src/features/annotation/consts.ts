import {AnnotationType} from './types'
import {Annotation} from './types/annotations/Annotation'
import {ContainerAn} from './types/annotations/ContainerAn'
import {EventAn} from './types/annotations/EventAn'
import {ModuleAn} from './types/annotations/ModuleAn'
import {PropertyAn} from './types/annotations/PropertyAn'
import {StyleAn} from './types/annotations/StyleAn'

export const AnnotationMap: Record<AnnotationType, typeof Annotation> = {
  Property: PropertyAn,
  Container: ContainerAn,
  Event: EventAn,
  Module: ModuleAn,
  Style: StyleAn,
}
