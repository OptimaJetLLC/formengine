import React from 'react';
import { StyleSheet } from 'react-native';
import { Toggle } from '@ui-kitten/components';
import { register } from 'optimajet-builder-shared';
import DWKitCheckBox from '../edit-control/dwkit/dwkit-check-box.jsx';
import builderStyles from '../../../builder-styles';

register('checkbox', options => {
    const controlProps = { ...options.propsControl };    
    controlProps.onChange = options.propsControl.readOnly === true
        ? undefined
        : controlProps.onChange.bind(this, null, { name: controlProps.name, checked: !controlProps.checked });

    // todo style
    if (options.propsControl.toggle === true) {        
        controlProps.style = StyleSheet.flatten([controlProps.style, builderStyles.controls.dwKitCheckBox]);
        return <Toggle {...controlProps} children={controlProps.label}/>;
    }

    return (<DWKitCheckBox {...controlProps}/>);
});
