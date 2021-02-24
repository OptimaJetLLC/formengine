import React from 'react';
import { register } from 'optimajet-builder-shared';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import { textSizeToNumber } from './utils';
import builderStyles from '../../../builder-styles';

const messageStyles = StyleSheet.create({
    headerContainerStyle: {
        flexDirection: 'row',
        marginTop: 20,
    },
    contentContainerStyle: {
        flexDirection: 'row',
        marginVertical: 10,
    },
});

register('message', options => {
    let status;
    const headerStyle = { fontSize: textSizeToNumber(options.model.size, 24) };
    const contentStyle = { fontSize: textSizeToNumber(options.model.size, 24) / 1.4 };
    if (options.model.error === true || options.model.negative === true) {
        status = 'danger';
    }
    if (options.model.success === true || options.model.positive === true) {   
        status = 'success';
    }
    if (options.model.info === true) {      
        status = 'info';
    }
    if (options.model.warning === true) {    
        status = 'warning';
    }

    const controlParams = builderStyles.controlParams(options.propsControl);
    options.propsControl.style = [controlParams.style, options.propsControl.style];

    return (<Card style={[options.propsControl.style]} status={status}>
        <View {...options.propsControl}>
                <Text style={headerStyle} category='h6'>{options.props.header}</Text>
                <Text style={[messageStyles.contentStyle, contentStyle]} category='s1'>{options.props.content}</Text>
            </View>
    </Card>);
});
