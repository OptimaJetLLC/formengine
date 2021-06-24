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
    let props = {
        appearance: model.appearance ?? "default",
        size: (model.size && sizes[model.size]) ? sizes[model.size] : undefined,
        style: {
            float: model.floated,
            ...options?.controlProps?.style
        },
        loading: model.loading,
        block: model.fluid,
        onClick: options.onClick,
        children: !model.circular ? options.content : undefined,
        disabled: model.disabled,
        circle: !!model.circular
    };
    
    if (!model.appearance) {
        if(model.primary)
            props.appearance = "primary";
        else if(model.secondary)
            appearance = "ghost";
        else if(model.link)
            appearance = "link";
    }

    if(model.icon){
        return <IconButton {...options.controlProps} {...props} icon={<Icon icon={model.icon} />} />;
    }
    else{
        return <Button {...options.controlProps} {...props} />;
    }
});
