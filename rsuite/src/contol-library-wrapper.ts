import { ControlEditorItem, EditorPropertyItem } from 'optimajet-builder-component-api';

export interface BuilderControlDefinition extends ControlEditorItem {
    propertyByName: Map<string, EditorPropertyItem>;
    defaultProps: Map<string, EditorPropertyItem>;
}

export function initControl(definition: ControlEditorItem): BuilderControlDefinition {
    let propertyByName = new Map<string, EditorPropertyItem>();
    let defaultProps = new Map<string, EditorPropertyItem>();
    for (let item of definition.control.propertyTypes) {
        propertyByName.set(item.name, item);
        if (item.defaultValue !== null && typeof item.defaultValue !== 'undefined') {
            defaultProps.set(item.name, item.defaultValue);
        }
    }
    return <BuilderControlDefinition>{
        ...definition,
        propertyByName: propertyByName,
        defaultProps: defaultProps,
    };
}
