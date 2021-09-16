import { ControlEditorItem } from 'optimajet-builder-component-api';
import rSuiteComponentDefinition from './rsuite-components';

const x: ControlEditorItem[] = [
    {
        key: 'button',
        title: 'Button',
        control: rSuiteComponentDefinition['rSuiteButton'],
        defaultValues: { content: 'Button' }
    }
]
