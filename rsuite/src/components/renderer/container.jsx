import React from 'react';
import { register, BaseControls } from 'optimajet-builder-shared';

register('container', options => {

    const props = options.props;
    let model = props.additionalParams.model;
    let parentItem = props.additionalParams.parentItem;

    let controlProps = {
        key: model.key,
        className: props.className,
        style: props.style,
        children: props.children
    }
    
    if (controlProps.style && model['style-display'] === 'flex') {
        if (model['style-display-horizontalalign']) {
            controlProps.style.justifyContent = model['style-display-horizontalalign'];
        }
        controlProps.style.alignItems =  model['style-display-verticalalign'] ? 
            model['style-display-verticalalign'] : 
            'baseline';
    }

    if(model["childrenView"]){
        controlProps.className = (controlProps.className ? controlProps.className + " " : "") + "formbuilder-container-" + model["childrenView"];
    }

    if(parentItem && parentItem["children-style-source"]){
        var parentStyle = {};
        BaseControls.getCustomStyle(parentItem["children-style-source"], parentStyle);

        for(var field in parentStyle){
            if(!controlProps.style[field]){
                controlProps.style[field] = parentStyle[field];
            }
        }
    }
    return (<div {...controlProps} />);
});
