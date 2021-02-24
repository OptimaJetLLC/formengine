import {
    CollectionEditor,
    Container,
    Dictionary,
    NumberFormatControl,
    RadioGroup,
    registerItems,
    Repeater,
    SemanticControl,
    StaticContent,
    TabGroup,
    WorkflowBar,
    Card
} from 'optimajet-builder-shared';
import './react-native-registrator';

// const reactNativeItems = [
//     { key: 'sepReactNative', title: 'React native', isseparate: true, defaultopen: false },
//     { key: 'rnactivityindicator', title: 'Activity Indicator', control: RnComponent },
//     { key: 'rnbutton', title: 'Button', control: RnComponent },
//     { key: 'rnflatlist', title: 'Flat List', control: RnComponent },
//     { key: 'rnimage', title: 'Image', control: RnComponent },
//     { key: 'rnimagebackground', title: 'Image Background', control: RnComponent },
//     { key: 'rnkeyboardavoidingview', title: 'Keyboard Avoiding View', control: RnComponent },
//     { key: 'rnmodal', title: 'Modal', control: RnComponent },
//     { key: 'rnpicker', title: 'Picker', control: RnComponent },
//     { key: 'rnrefreshcontrol', title: 'Refresh Control', control: RnComponent },
//     { key: 'rnsafeareaview', title: 'Safe Area View', control: RnComponent },
//     { key: 'rnscrollview', title: 'Scroll View', control: RnComponent },
//     { key: 'rnsectionlist', title: 'Section List', control: RnComponent },
//     { key: 'rnstatusbar', title: 'Status Bar', control: RnComponent },
//     { key: 'rnswitch', title: 'Switch', control: RnComponent },
//     { key: 'rntext', title: 'Text', control: RnComponent },
//     { key: 'rntextinput', title: 'Text Input', control: RnComponent },
//     { key: 'rntouchablehighlight', title: 'Touchable Highlight', control: RnComponent },
//     { key: 'rntouchableopacity', title: 'Touchable Opacity', control: RnComponent },
//     { key: 'rntouchablewithoutfeedback', title: 'Touchable Without Feedback', control: RnComponent },
//     { key: 'rnview', title: 'View', control: RnComponent },
//     { key: 'rnvirtualizedlist', title: 'Virtualized List', control: RnComponent },
// ];

const dwKitItems = [
    { key: 'sepContainers', title: 'Containers', isseparate: true, defaultopen: true },
    { key: 'container', title: 'View', control: Container },
    {
        key: 'staticcontent',
        title: 'Static Content',
        control: StaticContent,
        defaultValues: { content: 'Text...' }
    },
    { key: 'form', title: 'Form', control: SemanticControl },
    {
        key: 'formgroup',
        title: 'Form Group',
        control: SemanticControl,
        defaultValues: { widths: 'equal', orientation: 'grouped' }
    },
    {
        key: 'tab', title: 'Tab', control: TabGroup,
        defaultValues: {
            position: 'top',
            panes: [
                { title: 'Tab 1', psid: 't1' },
                { title: 'Tab 2', psid: 't2' },
                { title: 'Tab 3', psid: 't3' }
            ]
        }
    },
    {
        key: 'card', title: 'Card', control: Card, 
        defaultValues:{ header: "Card", subheader: "Description" }
    },
    {
        key: 'customblock',
        title: 'Custom block',
        control: undefined,
        defaultValues: { sourceType: 'form' }
    },
    { key: 'sepCollection', title: 'Collections', isseparate: true },
    {
        key: 'collectioneditor',
        title: 'Collection Editor',
        control: CollectionEditor,
        defaultValues: {
            columns: [
                { key: 'Id', name: 'ID' },
                { key: 'Title', name: 'Title' },
                { key: 'Count', name: 'Count' }
            ]
        }
    },
    {
        key: 'repeater',
        title: 'Repeater',
        control: Repeater,
        defaultValues: {}
    },
    { key: 'sepControls', title: 'Controls', isseparate: true },
    {
        key: 'header',
        title: 'Header',
        control: SemanticControl,
        defaultValues: { content: 'Header', size: 'medium' }
    },
    {
        key: 'input',
        title: 'Input',
        control: SemanticControl,
        defaultValues: { label: 'Input', onChangeTimeout: 200, fluid: true }
    },
    {
        key: 'numberformat',
        title: 'Number Format',
        control: NumberFormatControl,
        defaultValues: { label: 'NumberFormat', onChangeTimeout: 200 }
    },
    {
        key: 'textarea',
        title: 'TextArea',
        control: SemanticControl,
        defaultValues: { label: 'TextArea' }
    },
    {
        key: 'dictionary',
        title: 'Dictionary',
        control: Dictionary,
        defaultValues: { label: 'Dictionary', selection: true }
    },
    // todo
    /*
        {
            key: 'treepicker',
            title: 'TreePicker',
            control: TreePicker,
            defaultValues: { label: 'TreePicker', selection: true, parentIdField: 'ParentId' }
        },
    */
    {
        key: 'dropdown',
        title: 'Dropdown',
        control: SemanticControl,
        defaultValues: {
            label: 'Dropdown', selection: true,
            fluid: true,
            'data-elements': [
                { value: 1, text: 'Item 1' },
                { value: 2, text: 'Item 2' },
                { value: 3, text: 'Item 3' }
            ]
        }
    },
    {
        key: 'checkbox',
        title: 'CheckBox',
        control: SemanticControl,
        defaultValues: { label: 'Checkbox' }
    },
    {
        key: 'radiogroup',
        title: 'Radio group',
        control: RadioGroup,
        defaultValues: {
            label: 'Radio',
            'data-elements': [
                { value: 1, text: 'Item 1' },
                { value: 2, text: 'Item 2' },
                { value: 3, text: 'Item 3' }
            ]
        }
    },
    {
        key: 'button',
        title: 'Button',
        control: SemanticControl,
        defaultValues: { content: 'Button', fluid: true, floated: 'flex-start', basic: true }
    },
    {
        key: 'label',
        title: 'Label',
        control: SemanticControl,
        defaultValues: { content: 'Label' }
    },
    {
        key: 'message',
        title: 'Message',
        control: SemanticControl,
        defaultValues: { header: 'Message', content: 'Description...', size: 'medium', fluid: true }
    },
    {
        key: 'image',
        title: 'Image',
        control: SemanticControl,
        defaultValues: {
            src: '/images/unknown.png',
            'style-width': 128,
            'style-height': 128,
        }
    },
    // {
    //     key: 'files',
    //     title: 'Files',
    //     control: Files,
    //     defaultValues: {
    //         idField: 'Id',
    //         'columns': [
    //             { title: 'Name', field: 'Name', property: 'Name', showcolumn: true },
    //             { title: 'Length', field: 'Length', property: 'Length', showcolumn: false, control: 'span' },
    //             { title: 'Content Type', field: 'ContentType', property: 'ContentType', showcolumn: false },
    //             { title: 'File', field: 'Token', property: 'Token', showcolumn: true, control: 'file2' }
    //         ]
    //     }
    // },
    {
        key: 'workflowbar',
        title: 'Workflow bar',
        control: WorkflowBar,
        defaultValues: {
            blockSetState: true,
            blockLoadParameters: true,
            events: {
                onCommandClick: { active: true, actions: ['workflowExecuteCommand'] },
                onSetStateClick: { active: true, actions: ['workflowSetState'] },
                onSchemeSelected: { active: true, actions: ['workflowSelectScheme'] }
            }
        }
    },
];

const viewerItems = [
    //...reactNativeItems,
    ...dwKitItems,
];

registerItems(viewerItems);
