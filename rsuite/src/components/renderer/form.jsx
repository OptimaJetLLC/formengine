import React from 'react';
import { Form } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('form', options => {
    return (<Form {...options.controlProps}
                  children={options.props.children}/>);
});
