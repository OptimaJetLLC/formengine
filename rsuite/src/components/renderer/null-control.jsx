import React from 'react';
import { register } from 'optimajet-builder-shared';

register('null-control', options => {
    return (<div key={options.key}>{options.text}</div>);
});

