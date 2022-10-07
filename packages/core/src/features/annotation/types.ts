import {ComponentStore} from '../../stores/ComponentStore'
import {Annotation} from './utils/annotations/Annotation'
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
  };


/*export type Annotations<T extends object> =
    {
        [key in keyof OmitUnimportant<T>]:
        T[key] extends (Function | undefined) ?
            AnnotationBuilder<Function | undefined> :
            AnnotationBuilder<T[key]> | undefined;
    };*/

/** Remove some useless property for annotation defining which we define automatics */
type OmitUnimportant<T extends object> = Omit<T, 'style' | 'className' | 'classPrefix'>;

/** Interface for property editor */
export interface PropertyEditorProps {
  componentStore: ComponentStore;
  annotation: Annotation;

  value?: any;
  onChange?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
}

export type Enum<T extends [any, ...any[]]> = T[number]

export type AnnotationType = 'Property' | 'Container' | 'Event' | 'Module'

export type AnnotationTypeMap = {
  [key in AnnotationType]: typeof Annotation
}
export type FirstParameter<T extends (...args: any) => any> = Parameters<T>[0]
