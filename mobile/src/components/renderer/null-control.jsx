import React from 'react';
import { Text } from 'react-native-elements';
import { register } from 'optimajet-builder-shared';

register('null-control', options => {
    let s = '' + options['data-buildertype'];
    return (<Text style={{ color: 'red', fontSize: 24 }}>{options.text} null-control {s}</Text>);
});

