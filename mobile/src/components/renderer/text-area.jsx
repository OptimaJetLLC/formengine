import React from 'react';
import DWKitInput from '../edit-control/dwkit/dwkit-input.jsx'
import { register } from 'optimajet-builder-shared';

register('textarea', options => {
    let model = options.model;
    const controlProps = {
        multiline: true,
        numberOfLines: model.rows ? model.rows : 3,
        disabled: options.props.readOnly || model.readOnly,
        onChange: value => options.onChange(
            value,
            { name: options.props.name, value }
        ),
        value: options.props.value,
        placeholder: model.placeholder,
        style: {marginTop: 7},
        error: options.props.error
    };
    // todo remove all styles from renderer code!!!!
    return <DWKitInput label={options.label} {...controlProps}/>;
});
