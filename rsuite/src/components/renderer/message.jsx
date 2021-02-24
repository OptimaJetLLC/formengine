import React from 'react';
import { Message } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('message', options => {
    return (<Message {...options.controlProps} 
        description={options.content}
        title={options.header}
        >
    </Message>);
});
