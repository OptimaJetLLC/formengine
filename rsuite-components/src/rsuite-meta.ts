import {
    BoolType,
    ColorType,
    ControlDefinition,
    ControlEditorItem,
    defaultProperty,
    FunctionType, optionalProperty,
    StringType
} from 'optimajet-builder-component-api';
import { Button } from "rsuite";

const rSuiteButton = <ControlDefinition>{
    renderer: Button,
    propertyTypes: [
        defaultProperty('onPress', FunctionType, () => console.log('Set me a handler!')),
        defaultProperty('title', StringType, 'Button'),
        optionalProperty('accessibilityLabel', StringType),
        optionalProperty('color', ColorType),
        optionalProperty('disabled', BoolType),
    ],
};

const rSuiteControlEditorItems: ControlEditorItem[] = [
    {
        key: 'button',
        title: 'Button',
        name: 'rSuiteButton',
        control: rSuiteButton,
        defaultValues: { content: 'Button' },
    }
]

export default rSuiteControlEditorItems;
