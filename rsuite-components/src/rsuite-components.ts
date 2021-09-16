import {
    BoolType,
    ColorType,
    ControlDefinition,
    ControlDefinitionArray,
    defaultProperty,
    EditorPropertyArray,
    FunctionType,
    optionalProperty,
    StringType
} from 'optimajet-builder-component-api';
import { Button } from 'rsuite';

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

const rSuiteComponentDefinition = <ControlDefinitionArray<ControlDefinition>>{
    'rSuiteButton': rSuiteButton,
}

export default rSuiteComponentDefinition;
