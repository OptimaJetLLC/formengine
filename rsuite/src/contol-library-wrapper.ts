import { ControlDefinition, ControlDefinitionArray, EditorPropertyArray } from 'optimajet-builder-component-api';

export interface BuilderControlDefinition extends ControlDefinition {
    propertyByName: any;
    defaultProps: any;
}

function initControl(definition: ControlDefinition): BuilderControlDefinition {
    let propertyByName: EditorPropertyArray = {};
    let defaultProps: EditorPropertyArray = {};
    for (let item of definition.propertyTypes) {
        propertyByName[item.name] = item;
        if (item.defaultValue !== null && typeof item.defaultValue !== 'undefined') {
            defaultProps[item.name] = item.defaultValue;
        }
    }

    return <BuilderControlDefinition>{
        defaultProps: defaultProps,
        propertyByName: propertyByName,
        propertyTypes: definition.propertyTypes,
        renderer: definition.renderer,
    }
}

export function initControls(definitions: ControlDefinitionArray<ControlDefinition>):
    ControlDefinitionArray<BuilderControlDefinition> {
    const result = <ControlDefinitionArray<BuilderControlDefinition>>{};
    for (const key in definitions) {
        const control = definitions[key];
        result[key] = initControl(control);
    }
    return result;
}
