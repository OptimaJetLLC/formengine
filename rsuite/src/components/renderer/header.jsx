import React from 'react';
import { register } from 'optimajet-builder-shared';

register('header', options => {
    if(options.textAlign){
        options.controlProps.style.textAlign = options.textAlign
    }

    return <h1 {...options.controlProps}>{options.content}
        {options.subheader && <p className="formbuilder-header-subheader">{options.subheader}</p>}
        </h1>;
});
