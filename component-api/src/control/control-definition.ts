import EditorPropertyItem from '../property/editor-property-item';

export default interface ControlDefinition {
    renderer: any;
    propertyTypes: EditorPropertyItem[];
    // todo event types
    // todo styles
}
