import { ControlDefinition, ControlDefinitionArray, ControlEditorGroup } from 'optimajet-builder-component-api';

export default function extractViewerControls(
    builderControls: ControlEditorGroup[]): ControlDefinitionArray<ControlDefinition> {
    const result = <ControlDefinitionArray<ControlDefinition>>{};
    builderControls
        .forEach(group => group.items
            .forEach(value => result[value.name] = value.control)
        );
    return result;
}
