import ControlDefinition from './control-definition';

export default interface ControlEditorItem {
    key: string;
    title: string;
    separator?: boolean;
    defaultopen?: boolean;
    control?: ControlDefinition;
    defaultValues?: any;
}
