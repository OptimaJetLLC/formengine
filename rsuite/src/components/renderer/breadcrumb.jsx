import React from 'react';
import { Breadcrumb } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('breadcrumb', options => {
    let itemIndex = 0;
    let model = options.model;
    return <Breadcrumb {...options.controlProps} separator={model.separator ? model.separator : undefined}>
            {options.children.map((c)=>{
                let key = options.controlProps.key + "_" + itemIndex++;
                return <Breadcrumb.Item key={key} onClick={(e)=>{options.onClick && options.onClick(c.url, e)}} active={!c.url}>{c.text}</Breadcrumb.Item>
            })}
        </Breadcrumb>;
});
