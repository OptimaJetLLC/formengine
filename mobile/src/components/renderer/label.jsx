import React from 'react';
import { Text } from '@ui-kitten/components';
import { register } from 'optimajet-builder-shared';
import { textSizeToNumber } from './utils';
import { StyleSheet, View } from 'react-native';

export function Label(props) {
    return (<Text style={StyleSheet.compose(props.style, {paddingBottom: 4})} category='label' appearance='hint' {...props}/>);
}

register('label', options => {
    const style = {
        backgroundColor: '#e8e8e8',
        fontSize: textSizeToNumber(options.model.size, 14),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        marginLeft: 2,
        marginRight: 2,
    };
    if (options.model.basic === true) {
        style.backgroundColor = '#fff';
        style.borderColor = 'rgba(34,36,38,.15)'
        style.borderWidth = 1;
        style.borderStyle = 'solid';
    }
    if (options.model.circular) {
        style.borderRadius = '500rem';
    }
    return (<View style={{ flexDirection: 'row' }}>
        <Label {...options.controlProps} style={StyleSheet.compose(style, options.controlProps.style)}>
            {options.props.content}
        </Label>
    </View>);
});
