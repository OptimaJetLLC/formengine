import { ControlEditorGroup } from 'optimajet-builder-component-api';
import { BuilderControlDefinition, initControl } from './contol-library-wrapper';

export default function extractEditorControls(
    builderControls: ControlEditorGroup[]): Map<string, BuilderControlDefinition> {
    const result = new Map<string, BuilderControlDefinition>();
    builderControls.forEach(group => group.items
        .forEach(value => result.set(value.name, initControl(value))));
    return result;
}
