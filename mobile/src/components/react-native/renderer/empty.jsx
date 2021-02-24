import React from 'react';
import { register } from 'optimajet-builder-shared';
import { Text, View } from 'react-native';
import builderStyles from '../../../builder-styles';

register('empty', options => {
    return <View key={options.key} style={builderStyles.emptyView}>
        <Text style={builderStyles.emptyText}>{options.text}</Text>
    </View>
});

