import {ComponentStore} from '../../stores/ComponentStore'
import {ActionDefinition, ActionEventHandler, DefineActionHelper, EventName} from '../event/types'
import {Annotation} from './utils/Annotation'
import {AnnotationBuilder} from './utils/AnnotationBuilder'

export type Annotations<T extends object> =
  {
    [key in keyof OmitUnimportant<T>]:
    T[key] extends (Function | undefined) ?
      AnnotationBuilder<Function | undefined> :
      AnnotationBuilder<T[key]> | undefined;
  };

/** Remove some useless property for annotation defining which we define automatics */
type OmitUnimportant<T extends object> = Omit<T, 'style' | 'className' | 'classPrefix'>;

/** Interface for property editor */
export interface PropertyEditorProps<T> {
  componentStore: ComponentStore;
  annotation: Annotation<T>;

  value?: any;
  onChange?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
}

//TODO типизация для пропсов
export type ActionsInitializer = (props: ComponentStore['props'], def: DefineActionHelper) => Record<EventName, ActionEventHandler | ActionDefinition>

