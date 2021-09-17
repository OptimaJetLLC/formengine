import { ControlEditorItem, EditorPropertyArray } from 'optimajet-builder-component-api';

export interface BuilderControlDefinition extends ControlEditorItem {
    propertyByName: any;
    defaultProps: any;
}

export function initControl(definition: ControlEditorItem): BuilderControlDefinition {
    const result: BuilderControlDefinition = {
        ...definition,
        propertyByName: {},
        defaultProps: {},
    };

    let propertyByName: EditorPropertyArray = {};
    let defaultProps: EditorPropertyArray = {};
    for (let item of definition.control.propertyTypes) {
        propertyByName[item.name] = item;
        if (item.defaultValue !== null && typeof item.defaultValue !== 'undefined') {
            defaultProps[item.name] = item.defaultValue;
        }
    }

    result.defaultProps = defaultProps;
    result.propertyByName = propertyByName;
    return result;
}
