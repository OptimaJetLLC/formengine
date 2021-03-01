import React from 'react';
import { InputPicker, TagPicker, ControlLabel, Icon, SelectPicker, CheckPicker } from 'rsuite';
import { isNotEmptyString, register, isDefined } from 'optimajet-builder-shared';

register('dropdown', options => {

    let model = options.model;

    let inputProps = {};
    if(options.props.error){
        inputProps.className = "formbuilder-input-error";
    }

    let onChange = function(value, e){
        options && options.onChange(e, {name: options.props.name, value});
    };

    let picker;
    let pickerProps = {
        ...inputProps,
        data: options.items,
        labelKey: "text",
        placeholder: model.placeholder,
        value: options.props.value,
        onChange: onChange,
        disabled: options.props.readOnly || model.readOnly,
        block: model.fluid,
        creatable: model.allowAddItems
    }
    if(model.multiple){
        if(model.search){
            picker = <CheckPicker {...pickerProps} />;
        }
        else{
            picker = <TagPicker {...pickerProps} />;
        }
    }
    else if(model.search){
        picker = <SelectPicker {...pickerProps} />;
    }
    else{
        picker = <InputPicker {...pickerProps} />;
    }

    return <div {...options.controlProps}>
        {options.label && <ControlLabel>{options.label}
            {model["other-required"] && <span className="formbuilder-input-required">*</span>}
            {options.props.error && <span className="formbuilder-input-error"> <Icon icon='exclamation' /> {typeof(options.props.error) == "string" ? options.props.error : ""}</span>}
        </ControlLabel>}
        <div>{picker}</div>
    </div>;
});

