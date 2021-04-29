import React from 'react';
import { Accordion } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('accordion', options => {
    let props = {};

    let model = options.model;
    props.fluid = model.fluid;
    props.styled = model.styled;
    let className = options.props.className;
    return (<div className={className} style={options.props.style}>
        <Accordion {...props} panels={options.panels}/>
    </div>);
});
