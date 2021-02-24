import React from 'react';
import { View } from 'react-native';
import { useStyleSheet, StyleService } from '@ui-kitten/components';

/**
 * View for use styles with theme variables. 
 * For example { backgroundColor: 'color-primary-default' }.
 */
const ThemedView = (props) => {
    const updatedProps = Object.assign({}, props);
    updatedProps.style = useStyleSheet(StyleService.create({st: updatedProps.style})).st;

    return (
        <View {...updatedProps}>
            {props.children}
        </View>
    );
};

export default ThemedView;