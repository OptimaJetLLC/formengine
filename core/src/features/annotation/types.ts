import { FunctionComponent } from 'react';
import { AnnotationBuilder } from './AnnotationBuilder';
import { ComponentStore } from '../../stores/ComponentStore';
import { Annotation } from './Annotation';
import { Action } from '../../utils/types';

export type Annotations<T extends object> =
    {
        [key in keyof OmitUnimportant<T>]:
        T[key] extends (Function | undefined) ?
            AnnotationBuilder<Function | undefined> :
            AnnotationBuilder<T[key]> | undefined;
    };

/** Remove some useless property for annotation defining which we define automatics */
type OmitUnimportant<T extends object> = Omit<T, 'style' | 'className' | 'classPrefix'>;

export interface ComponentDefinition<T extends object> {
    name: string;
    view: FunctionComponent<T>;
    annotations: Annotation<T>[];
    actions?: Action[];
    groupBy?: string;
}

/** Interface for property editor */
export interface PropertyEditorProps<T> {
    componentStore: ComponentStore;
    annotation: Annotation<T>;

    value?: any;
    onChange?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
}
