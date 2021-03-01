import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import builderStyles from '../../builder-styles';
import DWKitDropdown from '../edit-control/dwkit/dwkit-dropdown.jsx';

register('dictionary', options => {
    const controlParams = builderStyles.controlParams(options.controlProps);
    const controlProps = { 
        ...options.controlProps,
        style: [options.controlProps.style, controlParams.style] };
    if (options.controlProps.onChange) {
        controlProps.onValueChange = (value) => options.controlProps.onChange(null, { name: controlProps.name, value });
    }
    delete controlProps.onChange;

    return (<DWKitDropdown {...controlProps}/>);
});
