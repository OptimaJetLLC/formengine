import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import builderStyles from '../../../builder-styles'

export default function DWKitButton(props) {
    const controlProps = {
        ...builderStyles.dwKitButtonProps,
        ...props
    }
    controlProps.children = controlProps.title;
    if (!controlProps.size) controlProps.size = 'small';
    controlProps.style = StyleSheet.compose(controlProps.style, StyleSheet.flatten(builderStyles.controls.button));
    return (<Button {...controlProps}/>);
}
