import React from 'react';
import { register } from 'optimajet-builder-shared';

register('unknown', options => {
    return (<span>Unknown type '{options.type}' of '{options.props.name}' element.</span>);
});
