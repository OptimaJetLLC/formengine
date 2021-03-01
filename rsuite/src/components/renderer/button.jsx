import React from 'react';
import { Button, Icon, IconButton } from 'rsuite';
import { register } from 'optimajet-builder-shared';

const sizes = {
    large: "lg",
    medium: "md",
    small: "sm",        
    mini: "xs"
};

register('button', options => {
    let model = options.model;

    let appearance = "default";
    if(model.primary)
        appearance = "primary";
    else if(model.secondary)
        appearance = "ghost";
    
    let size;
    if(model.size && sizes[model.size])
        size = sizes[model.size];

    if(model.link){
        options.controlProps.style.cursor = "pointer";
        return <a {...options.controlProps} onClick={options.onClick}>{options.content}</a>;
    }
    else if(model.icon){
        return <IconButton {...options.controlProps}
            appearance={appearance}
            icon={<Icon icon={model.icon} />}
            size={size}
            loading={model.loading}
            block={model.fluid}
            onClick={options.onClick}
            >{options.content}</IconButton>;
    }
    else{
        return <Button {...options.controlProps}
            appearance={appearance}
            size={size}
            loading={model.loading}
            block={model.fluid}
            onClick={options.onClick}
            >{options.content}</Button>;
    }
});
