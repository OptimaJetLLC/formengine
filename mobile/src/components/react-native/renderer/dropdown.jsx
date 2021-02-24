import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import builderStyles from '../../../builder-styles';
import DWKitDropdown from '../edit-control/dwkit/dwkit-dropdown.jsx';


register('dropdown', options => {
    const controlParams = builderStyles.controlParams(options.propsControl);
    const controlProps = { 
        ...options.propsControl,
        style: [options.propsControl.style, controlParams.style] };
    if (options.propsControl.onChange) {
        controlProps.onValueChange = (value) => options.propsControl.onChange(null, { name: controlProps.name, value });
    }
    delete controlProps.onChange;

    // todo form
    // if (options.isForm) {
    //     return (<Form.Dropdown {...options.propsControl} />);
    // }
    // todo style
    // let divClass = 'ui labeled input';
    // if (options.propsControl.fluid) {
    //     divClass += ' fluid';
    // }
    //
    // if (options.propsControl.error) {
    //     divClass += ' error';
    // }
    //
    // if (isNotEmptyString(options.props.className)) {
    //     divClass += ' ' + options.props.className;
    // }

    return (<DWKitDropdown {...controlProps}/>);
});

