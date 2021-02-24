import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('collection-input', options => {
    return <Input {...options.props.inputProps} onChange={options.me.handleChange}/>;
});
