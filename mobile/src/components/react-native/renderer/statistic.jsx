import React from 'react';
import { register } from 'optimajet-builder-shared';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { textSizeToNumber } from './utils';

register('statistic', options => {

    function renderStatItem(item) {
        const labelStyle = {
            fontSize: textSizeToNumber(options.model.size, 24) / 1.4,
        };
        const valueStyle = {
            fontSize: textSizeToNumber(options.model.size, 24),
        };

        // todo style
        return (<View style={{margin: 10}}>
            <Text style={valueStyle} category='label'>{item.value}</Text>
            <Text style={labelStyle} category='label' appearance='hint'>{item.label}</Text>
        </View>);
    }

    let items = [];
    if (options.items) {
        items = options.items.map(item => renderStatItem(item));
    }
    const viewStyle = options.model.horizontal !== true ? { flexDirection: 'row' } : {}
    return (<View {...options.propsControl} style={[options.propsControl.style, viewStyle]}>
        {items}
    </View>);
});
