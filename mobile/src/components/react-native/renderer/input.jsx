import React from 'react';
import { DatePicker, register, draw, isDefined, Upload } from 'optimajet-builder-shared';
import DWKitInput from '../edit-control/dwkit/dwkit-input.jsx'
import { View } from 'react-native';
import { FormWidthContext } from './form-width-context';
import { FormSizeContext } from './form-size-context';
import builderStyles from '../../../builder-styles';

register('input', options => {

    function drawInput(formSize) {
        const controlParams = builderStyles.controlParams(options.propsControl);
        options.propsControl.style = [controlParams.style, options.propsControl.style];
        if (formSize) options.propsControl.size = formSize;
        if (options.propsControl.onChange) {
            options.propsControl.onChangeText = options.propsControl.onChange;
            options.propsControl.onValueChange = options.propsControl.onChange;
            delete options.propsControl.onChange;
        }

        if (options.propsControl.type === 'file') {
            options.propsControl.isForm = options.isForm;
            return <Upload {...options.propsControl}
                           downloadUrl={options.props.additionalParams.downloadUrl}
                           uploadUrl={options.props.additionalParams.uploadUrl}/>;
        }
        if (options.propsControl.type === 'date' ||
            options.propsControl.type === 'time' ||
            options.propsControl.type === 'datetime') {
            options.propsControl.isForm = options.isForm;
            return <DatePicker {...options.propsControl} />;
        }
        if (options.propsControl.type === 'number') {
            let stringValue = Number.isInteger(options.propsControl.value) ? options.propsControl.value.toString() : options.propsControl.value;
            return <DWKitInput label={options.propsControl.label} {...options.propsControl} value={stringValue} />;
        }
        if (options.propsControl.type === 'password') {
            options.propsControl.secureTextEntry = true;
        }
        // todo implement (use react-native elements
        return <DWKitInput label={options.propsControl.label} {...options.propsControl}/>;
    }

    function drawContainer(formWidthStyle, formSize) {
        // todo implement formSizeStyle use context api
        // todo fit dropzone and control bar
        return (<View style={[{flexGrow: 1}, formWidthStyle]}>{drawInput(formSize)}</View>);
    }

    if (options.propsControl.onChange) {
        const onChangeFn = options.propsControl.onChange;
        options.propsControl.onChange = value => onChangeFn(
            value,
            { name: options.propsControl.name, value }
        );
    }

    return (<FormWidthContext.Consumer>
        {({ formWidthStyle }) => (
            <FormSizeContext.Consumer>
                {({ formSize }) => drawContainer(formWidthStyle, formSize)}
            </FormSizeContext.Consumer>
        )}
    </FormWidthContext.Consumer>);
});
