import React from 'react';
import { register } from 'optimajet-builder-shared';

register('empty', options => {
    return (<div className="formbuilder-empty" key={options.key}>{options.text}</div>);
});

