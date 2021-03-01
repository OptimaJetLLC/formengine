import React from 'react';
import { DatePicker, register, draw, isDefined, Upload } from 'optimajet-builder-shared';
import DWKitInput from '../edit-control/dwkit/dwkit-input.jsx'
import { View } from 'react-native';
import { FormWidthContext } from './form-width-context';
import { FormSizeContext } from './form-size-context';
import builderStyles from '../../builder-styles';

register('input', options => {

    function drawInput(formSize) {
        let model = options.model;
        const controlParams = builderStyles.controlParams(model);
        let inputProps = {
            placeholder: model.placeholder,
            value: options.props.value ? options.props.value : "",
            onChange: onChange,
            disabled: options.props.readOnly || model.readOnly,
        };

        inputProps.style = 

        options.controlProps.style = [controlParams.style, options.props.style];
        if (formSize) options.controlProps.size = formSize;
        if (options.controlProps.onChange) {
            options.controlProps.onChangeText = options.controlProps.onChange;
            options.controlProps.onValueChange = options.controlProps.onChange;
            delete options.controlProps.onChange;
        }

        if (options.controlProps.type === 'file') {
            options.controlProps.isForm = options.isForm;
            return <Upload {...options.controlProps}
                           downloadUrl={options.props.additionalParams.downloadUrl}
                           uploadUrl={options.props.additionalParams.uploadUrl}/>;
        }
        if (options.controlProps.type === 'date' ||
            options.controlProps.type === 'time' ||
            options.controlProps.type === 'datetime') {
            options.controlProps.isForm = options.isForm;
            return <DatePicker {...options.controlProps} />;
        }
        if (options.controlProps.type === 'number') {
            let stringValue = Number.isInteger(options.controlProps.value) ? options.controlProps.value.toString() : options.controlProps.value;
            return <DWKitInput label={options.controlProps.label} {...options.controlProps} value={stringValue} />;
        }
        if (options.controlProps.type === 'password') {
            options.controlProps.secureTextEntry = true;
        }
        // todo implement (use react-native elements
        return <DWKitInput label={options.label} {...options.controlProps}/>;
    }

    function drawContainer(formWidthStyle, formSize) {
        // todo implement formSizeStyle use context api
        // todo fit dropzone and control bar
        return (<View style={[{flexGrow: 1}, formWidthStyle]}>{drawInput(formSize)}</View>);
    }

    if (options.controlProps.onChange) {
        const onChangeFn = options.controlProps.onChange;
        options.controlProps.onChange = value => onChangeFn(
            value,
            { name: options.controlProps.name, value }
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
