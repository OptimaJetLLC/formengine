import {Annotation} from './utils/annotations/Annotation'
import {ContainerAn} from './utils/annotations/ContainerAn'
import {EventAn} from './utils/annotations/EventAn'
import {ModuleAn} from './utils/annotations/ModuleAn'
import {PropertyAn} from './utils/annotations/PropertyAn'
import {StyleAn} from './utils/annotations/StyleAn'
import {BaseBuilder} from './utils/builders/BaseBuilder'

/*export type Annotations<T extends object> =
  {
    [key in keyof OmitUnimportant<T>]:
    T[key] extends (Function | undefined) ?
      BaseBuilder<Function | undefined> :
      AnnotationBuilder<T[key]> | undefined;
  };*/
export type Annotations<T extends object> =
  {
    [key in keyof OmitUnimportant<T>]: BaseBuilder<T[key]> | undefined
  }


/*export type Annotations<T extends object> =
    {
        [key in keyof OmitUnimportant<T>]:
        T[key] extends (Function | undefined) ?
            AnnotationBuilder<Function | undefined> :
            AnnotationBuilder<T[key]> | undefined;
    };*/

/** Remove some useless property for annotation defining which we define automatics */
type OmitUnimportant<T extends object> = Omit<T, 'style' | 'className' | 'classPrefix'>

export type Enum<T extends [any, ...any[]]> = T[number]

export type AnnotationType = 'Property' | 'Container' | 'Event' | 'Module' | 'Style'

export const AnnotationMap: Record<AnnotationType, typeof Annotation> = {
  Property: PropertyAn,
  Container: ContainerAn,
  Event: EventAn,
  Module: ModuleAn,
  Style: StyleAn,
}

export type FirstParameter<T extends (...args: any) => any> = Parameters<T>[0]
export type PreAnnotation = Partial<Omit<Annotation, 'key'>> & Pick<Annotation, 'editor'>
