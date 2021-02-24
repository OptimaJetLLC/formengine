import React from 'react';
import { Checkbox, ControlLabel, Icon } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('checkbox', options => {   
    let model = options.props.additionalParams.model;

    let inputProps = {};
    if(options.props.error){
        inputProps.className = "formbuilder-input-error";
    }

    let onChange = function(value, checked, e){
        options.onChange(e, {name: options.props.name, value: checked});
    };

    return <div {...options.controlProps}>
        {options.label && <ControlLabel>{options.label}
            {model["other-required"] && <span className="formbuilder-input-required">*</span>}            
        </ControlLabel>}
        <Checkbox {...inputProps} 
            checked={options.props.value}
            inline={true}
            onChange={onChange}
            disabled={options.props.readOnly || model.readOnly}
            />
        {options.props.error && <span className="formbuilder-input-error"> <Icon icon='exclamation' /> {typeof(options.props.error) == "string" ? options.props.error : ""}</span>}
    </div>;
});
