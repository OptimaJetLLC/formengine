import React from 'react';
import { View } from 'react-native';
import { register } from 'optimajet-builder-shared';
import { Text } from '@ui-kitten/components';
import { textSizeToNumber } from './utils';

register('header', options => {
    const headerStyle = {
        fontSize: textSizeToNumber(options.model.size, 24),
        textAlign: options.model.textAlign,
    };
    const subHeaderStyle = {
        fontSize: textSizeToNumber(options.model.size, 24) / 1.4,
        textAlign: options.model.textAlign,
    };
    // todo use global styles!
    return (<View>
        <Text style={headerStyle} category='h1'>{options.props.content}</Text>
        <Text style={subHeaderStyle} category='h6'>{options.props.subheader}</Text>
    </View>);
});
