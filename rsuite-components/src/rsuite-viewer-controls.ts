import {
    BoolType,
    ColorType,
    ControlDefinition,
    ControlDefinitionArray,
    defaultProperty,
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

const rSuiteViewerControls = <ControlDefinitionArray<ControlDefinition>>{
    'rSuiteButton': rSuiteButton,
}

export default rSuiteViewerControls;
