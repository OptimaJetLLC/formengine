import React from 'react';
import { Input, ControlLabel, Icon } from 'rsuite';
import { isNotEmptyString, register } from 'optimajet-builder-shared';

register('input', options => {
    let model = options.props.additionalParams.model;

    let inputProps = {};
    if(options.props.error){
        inputProps.className = "formbuilder-input-error";
    }

    let onChange = function(value, e){
        options.onChange(e, {name: options.props.name, value});
    };

    return <div {...options.controlProps}>
        {options.label && <ControlLabel>{options.label}
            {model["other-required"] && <span className="formbuilder-input-required">*</span>}
            {options.props.error && <span className="formbuilder-input-error"> <Icon icon='exclamation' /> {typeof(options.props.error) == "string" ? options.props.error : ""}</span>}
        </ControlLabel>}
        <Input {...inputProps} 
            placeholder={model.placeholder} 
            value={options.props.value ? options.props.value : ""}
            onChange={onChange}
            disabled={options.props.readOnly || model.readOnly}
            />
    </div>;
});
