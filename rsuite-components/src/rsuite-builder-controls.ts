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
                control: rSuiteViewerControls['rSuiteButton'],
                defaultValues: { content: 'Button' },
            },
        ],
    }
];

export default rSuiteBuilderControls;
