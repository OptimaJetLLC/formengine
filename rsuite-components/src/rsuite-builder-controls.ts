import { ControlEditorGroup } from 'optimajet-builder-component-api';
import rSuiteViewerControls from './rsuite-viewer-controls';

const rSuiteBuilderControls: ControlEditorGroup[] = [
    {
        key: 'sepControls',
        title: 'Controls',
        items: [
            {
                key: 'button',
                title: 'Button',
                name: 'rSuiteButton',
                // todo control names to enum
                control: rSuiteViewerControls.get('rSuiteButton')!,
                // todo вернуть?
                // defaultValues: { content: 'Button' },
            },
            {
                key: 'input',
                title: 'Input',
                name: 'rSuiteInput',
                control: rSuiteViewerControls.get('rSuiteInput')!,
            },
            {
                key: 'select',
                title: 'Select Dropdown',
                name: 'rSuiteSelectDropdown',
                control: rSuiteViewerControls.get('rSuiteSelectDropdown')!,
            },
        ],
    }
];

export default rSuiteBuilderControls;
