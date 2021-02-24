import React from 'react';
import builderStyles from '../../../../builder-styles';
import DWKitInput from './dwkit-input.jsx';
import { View } from 'react-native';

export default function DWKitTextArea(props) {
    const viewStyle = {};
    if (props.flex) {
        viewStyle.flex = props.flex;
    }
    const controlProps = {
        ...props,
        ...builderStyles.dwKitTextareaProps,
    }
    return (<View style={viewStyle}>
        <DWKitInput {...controlProps}/>
    </View>);
}
