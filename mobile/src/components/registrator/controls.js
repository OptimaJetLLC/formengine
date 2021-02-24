import {
    CollectionEditor,
    Container,
    Dictionary,
    NumberFormatControl,
    RadioGroup,
    registerItems,
    Repeater,
    StaticContent,
    TabGroup,
    Card,
    Header,
    Input,
    Textarea,
    Dropdown,
    Checkbox,
    Button,
    Label,
    Message,
    Image,
    Form,
    FormGroup
} from 'optimajet-builder-shared';
import './shared-controls';

const items = [
    { key: 'sepContainers', title: 'Containers', isseparate: true, defaultopen: true },
    { key: 'container', title: 'View', control: Container },
    {
        key: 'staticcontent',
        title: 'Static Content',
        control: StaticContent,
        defaultValues: { content: 'Text...' }
    },
    { key: 'form', title: 'Form', control: Form },
    {
        key: 'formgroup',
        title: 'Form Group',
        control: FormGroup,
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
        control: Header,
        defaultValues: { content: 'Header', size: 'medium' }
    },
    {
        key: 'input',
        title: 'Input',
        control: Input,
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
        control: Textarea,
        defaultValues: { label: 'TextArea' }
    },
    {
        key: 'dictionary',
        title: 'Dictionary',
        control: Dictionary,
        defaultValues: { label: 'Dictionary', selection: true }
    },    
    {
        key: 'dropdown',
        title: 'Dropdown',
        control: Dropdown,
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
        control: Checkbox,
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
        control: Button,
        defaultValues: { content: 'Button', fluid: true, floated: 'flex-start', basic: true }
    },
    {
        key: 'label',
        title: 'Label',
        control: Label,
        defaultValues: { content: 'Label' }
    },
    {
        key: 'message',
        title: 'Message',
        control: Message,
        defaultValues: { header: 'Message', content: 'Description...', size: 'medium', fluid: true }
    },
    {
        key: 'image',
        title: 'Image',
        control: Image,
        defaultValues: {
            src: '/images/unknown.png',
            'style-width': 128,
            'style-height': 128,
        }
    }
];

registerItems(items);
