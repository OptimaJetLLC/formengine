import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import builderStyles from '../../builder-styles';
import DWKitDropdown from '../edit-control/dwkit/dwkit-dropdown.jsx';


register('dropdown', options => {
    let model = options.model;
    const controlParams = builderStyles.controlParams(model);
    const cProps = { 
        ...options.controlProps,
        label: options.label,
        name: options.name,
        value: options.props.value,
        multiple: options.multiple,
        clearable: options.clearable,
        placeholder: options.placeholder,
        options: options.items,
        disabled: options.props.readOnly || model.readOnly,
        style: [options.controlProps.style, controlParams.style] };
    
    if (options.onChange) {
        cProps.onValueChange = (value) => options.onChange(null, { name: cProps.name, value });
    }

    return (<DWKitDropdown {...cProps}/>);
});

