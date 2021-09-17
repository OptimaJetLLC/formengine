import ControlDefinition from './control-definition';

// todo rename
export default interface ControlEditorItem {
    key: string;
    title: string;
    name: string;
    control: ControlDefinition;
}
