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
import rsButton from './controls/rs-button';

const rSuiteButton = <ControlDefinition>{
    renderer: rsButton,
    propertyTypes: [
        defaultProperty('onPress', FunctionType, () => console.log('Set me a handler!')),
        defaultProperty('content', StringType, 'Button'),
        optionalProperty('accessibilityLabel', StringType),
        optionalProperty('color', ColorType),
        optionalProperty('disabled', BoolType),
    ],
};

const rSuiteViewerControls = <ControlDefinitionArray<ControlDefinition>>{
    'rSuiteButton': rSuiteButton,
};

export default rSuiteViewerControls;
