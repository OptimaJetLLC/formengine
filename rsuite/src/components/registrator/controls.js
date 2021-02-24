import './shared-controls';
import {
    Camera,
    ChartView,
    CollectionEditor,
    Container,
    Dictionary,
    Dropzone,
    Files,
    GridLayout,
    GridView,
    MenuGroup,
    NumberFormatControl,
    RadioGroup,
    registerItems,
    Repeater,
    SearchControl,
    SemanticControl,
    SignatureCanvas,
    StaticContent,
    TabGroup,
    Card,
    Breadcrumb,
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
import TreePicker from '../renderer/tree-picker';
import RichTextEditorControl from '../renderer/rich-text-editor';

const controls = [
    { key: 'sepContainers', title: 'Containers', separator: true, defaultopen: true },
    { key: 'container', title: 'Container', control: Container },
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
        defaultValues: { widths: 'equal' }
    },
    {key: "card", title: 'Card', control: Card, 
        defaultValues:{ header: "Card", subheader: "Description" }},
    {
        key: 'tab', title: 'Tab', control: TabGroup,
        defaultValues: {
            panes: [
                { title: 'Tab 1', psid: 't1' },
                { title: 'Tab 2', psid: 't2' },
                { title: 'Tab 3', psid: 't3' }
            ]
        }
    },
    {
        key: 'customblock',
        title: 'Custom block',
        control: undefined,
        defaultValues: { sourceType: 'form' }
    },   
    { key: 'sepCollection', title: 'Collections', separator: true },
    {
        key: 'gridview', title: 'GridView', control: GridView, defaultValues: {
            columns: [
                { key: 'id', name: 'ID' },
                { key: 'title', name: 'Title' },
                { key: 'count', name: 'Count' }
            ]
        }
    },
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
    { key: 'sepControls', title: 'Controls', separator: true },
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
        defaultValues: { label: 'Input', fluid: true, onChangeTimeout: 200 }
    },
    {
        key: 'numberformat',
        title: 'Number Format',
        control: NumberFormatControl,
        defaultValues: { label: 'NumberFormat', fluid: true, onChangeTimeout: 200 }
    },
    {
        key: 'textarea',
        title: 'TextArea',
        control: Textarea,
        defaultValues: { label: 'TextArea', fluid: true }
    },
    {
        key: 'dictionary',
        title: 'Dictionary',
        control: Dictionary,
        defaultValues: { label: 'Dictionary', fluid: true, selection: true }
    },
    {
        key: 'treepicker',
        title: 'TreePicker',
        control: TreePicker,
        defaultValues: { label: 'TreePicker', selection: true, fluid: true, parentIdField: 'ParentId' }
    },
    {
        key: 'dropdown',
        title: 'Dropdown',
        control: Dropdown,
        defaultValues: {
            label: 'Dropdown', fluid: true, selection: true,
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
        defaultValues: { content: 'Button' }
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
        defaultValues: { header: 'Message', content: 'Description...' }
    },
    {
        key: 'image',
        title: 'Image',
        control: Image,
        defaultValues: { src: '/images/unknown.png' }
    },
    {
        key: 'customcontrol',
        title: 'Custom control',
        control: undefined,
        defaultValues: { props: '{  }' }
    },   
    {
        key: 'dropzonecontrol',
        title: 'Dropzone',
        control: Dropzone,
        defaultValues: {
            showFiletypeIcon: false,
            autoProcessQueue: true,
            addRemoveLinks: true,
            multile: true
        }
    },
    {
        key: 'files',
        title: 'Files',
        control: Files,
        defaultValues: {
            idField: 'Id',
            'columns': [
                { title: 'Name', field: 'Name', property: 'Name', showcolumn: true },
                { title: 'Length', field: 'Length', property: 'Length', showcolumn: false, control: 'span' },
                { title: 'Content Type', field: 'ContentType', property: 'ContentType', showcolumn: false },
                { title: 'File', field: 'Token', property: 'Token', showcolumn: true, control: 'file2' }
            ]
        }
    },
    {
        key: 'signaturecanvas',
        title: 'SignatureCanvas',
        control: SignatureCanvas,
        defaultValues: { showPreview: true}
    },
    {
        key: 'camera',
        title: 'Camera',
        control: Camera,
        defaultValues: { showPreview: true }
    },
    {
        key: 'breadcrumb',
        title: 'Breadcrumbs',
        control: Breadcrumb,
        defaultValues: {
            items: [
                { 'text': 'Home', 'url': '/' },
                { 'divider': 'right angle', 'text': 'Page1', 'url': '/page1' },
                { 'text': 'Page2', 'active': true }
            ],
            events: {
                onItemClick: { active: true, actions: ['redirect'] }
            }
        }
    },
    {
        key: 'search',
        title: 'Search',
        control: SearchControl,
        defaultValues: {}
    },
    {
        key: 'menu', title: 'Menu', control: MenuGroup,
        defaultValues: {
            items: [
                { title: 'Menu 1' },
                { title: 'Menu 2' },
                { title: 'Menu 3' }
            ]
        }
    },    
    {
        key: 'richtexteditor',
        title: 'Rich Text Editor',
        control: RichTextEditorControl,
        defaultValues: {}
    },
    // { key: 'sepCharts', title: 'Charts', separator: true },
    // {
    //     key: 'barchart',
    //     title: 'Bar',
    //     control: ChartView,
    //     defaultValues: { chartType: 'bar', datasetLabel: '' }
    // },
    // {
    //     key: 'linechart',
    //     title: 'Line',
    //     control: ChartView,
    //     defaultValues: { chartType: 'line', datasetLabel: '' }
    // },
    // {
    //     key: 'scatterchart',
    //     title: 'Scatter',
    //     control: ChartView,
    //     defaultValues: { chartType: 'scatter', datasetLabel: '' }
    // },
    // {
    //     key: 'doughnutchart',
    //     title: 'Doughnut',
    //     control: ChartView,
    //     defaultValues: { chartType: 'doughnut', datasetLabel: '' }
    // },
    // {
    //     key: 'piechart',
    //     title: 'Pie',
    //     control: ChartView,
    //     defaultValues: { chartType: 'pie', datasetLabel: '' }
    // },
    // {
    //     key: 'radarchart',
    //     title: 'Radar',
    //     control: ChartView,
    //     defaultValues: { chartType: 'radar', datasetLabel: '' }
    // }
];

registerItems(controls);
