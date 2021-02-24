import React from 'react';
import { register } from 'optimajet-builder-shared';

register('style-button', options => {
    let className = 'RichEditor-styleButton';
    if (options.props.active) {
        className += ' RichEditor-activeButton';
    }
    return (<span className={className} onMouseDown={options.me.onToggle}>{options.props.label}</span>);
});
