import ControlEditorItem from './control-editor-item';

export default interface ControlEditorGroup {
    key: string;
    title: string;
    items: ControlEditorItem[];
    // todo rename defaultopen
    defaultopen?: boolean;
}
