import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import builderStyles from '../../../builder-styles';
import DWKitDropdown from '../edit-control/dwkit/dwkit-dropdown.jsx';

register('dictionary', options => {
    const controlParams = builderStyles.controlParams(options.propsControl);
    const controlProps = { 
        ...options.propsControl,
        style: [options.propsControl.style, controlParams.style] };
    if (options.propsControl.onChange) {
        controlProps.onValueChange = (value) => options.propsControl.onChange(null, { name: controlProps.name, value });
    }
    delete controlProps.onChange;

    return (<DWKitDropdown {...controlProps}/>);
});
