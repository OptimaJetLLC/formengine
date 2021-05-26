import React from 'react';
import { Input, ControlLabel, Icon, InputNumber, DatePicker   } from 'rsuite';
import { isNotEmptyString, register, Upload } from 'optimajet-builder-shared';

const paramsMap = options => {
    const block = !!options.model.fluid;
    const style = block ? { flex: 1 } : { width: "initial" };
    const value = options.props.value ? options.props.value : "";
    const dateValue = value?.length ? new Date(value) : new Date();
    return {
        text: {
            control: Input,
            props: { style, value },
        },
        number: {
            control: InputNumber,
            props: { style, value  },
        },
        password: {
            control: Input,
            props: { type: "password", style, value  },
        },
        file: {
            control: Upload,
            props: { 
                ...options.props,
                downloadUrl: options.props.additionalParams.downloadUrl,
                uploadUrl: options.props.additionalParams.uploadUrl,
                value 
            },
        },
        date: {
            control: DatePicker,
            props: { block, value: dateValue },
        },
        time: {
            control: DatePicker,
            props: { 
                format: "hh:mm:ss ",
                ranges: [
                    {
                        label: 'Now',
                        value: new Date()
                    }
                ],
                block, value: dateValue
            },
        },
        datetime: {
            control: DatePicker,
            props: { 
                format: "YYYY-MM-DD HH:mm:ss",
                ranges: [
                    {
                        label: 'Now',
                        value: new Date()
                    }
                ],
                block, value: dateValue
            },
        }
    }    
}

register('input', options => {
    let model = options.model;
    const params = paramsMap(options)[model.type || "text"];
    const InputControl = params.control; 
    let inputProps = {...params.props};
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
        <InputControl {...inputProps} 
            placeholder={model.placeholder} 
            onChange={onChange}
            disabled={options.props.readOnly || model.readOnly}
            />
    </div>;
});
