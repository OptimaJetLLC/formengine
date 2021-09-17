import { ControlDefinitionArray, ControlEditorGroup } from 'optimajet-builder-component-api';
import { BuilderControlDefinition, initControl } from './contol-library-wrapper';

export default function extractEditorControls(
    builderControls: ControlEditorGroup[]): ControlDefinitionArray<BuilderControlDefinition> {
    const result = <ControlDefinitionArray<BuilderControlDefinition>>{};
    builderControls.forEach(group => group.items
        .forEach(value => result[value.name] = initControl(value)));
    return result;
}
