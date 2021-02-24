import React from 'react';
import { register } from 'optimajet-builder-shared';

register('image', options => {
    return (<img {...options.controlProps} src={options.src} />);
});
