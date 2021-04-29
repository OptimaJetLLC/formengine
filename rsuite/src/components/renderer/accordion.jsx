import React from 'react';
import { Accordion } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('accordion', options => {
    let props = {};
    props.fluid = options.props.fluid;
    props.styled = options.props.styled;
    let className = options.props.className;
    return (<div className={className} style={options.props.style}>
        <Accordion {...props} panels={options.panels}/>
    </div>);
});
