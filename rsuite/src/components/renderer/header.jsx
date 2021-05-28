import React from 'react';
import { register } from 'optimajet-builder-shared';

register('header', options => {  

    const props = options.props;
    let model = options.model;

    let controlProps = {
        key: model.key,
        className: props.className,
        style: {...props.style},
        children: props.children
    }

    if(options.textAlign){
        controlProps.style.textAlign = options.textAlign
    }

    return <h1 {...controlProps}>{options.content}
        {options.subheader && <p className="formbuilder-header-subheader">{options.subheader}</p>}
        </h1>;
});
