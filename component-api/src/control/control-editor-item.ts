import ControlDefinition from './control-definition';

export default interface ControlEditorItem {
    key: string;
    title: string;
    name: string;
    control: ControlDefinition;
    defaultValues?: any;
}
