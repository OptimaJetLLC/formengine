import React from 'react';
import { Radio, RadioGroup, ControlLabel, Icon } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('radio-group', options => {
    // const fields = options.props.items.map(function (item) {
    //     const key = item.key ? item.key : item.value;

    //     return (<Form.Field key={key + '_formfield'}>
    //         <Form.Radio
    //             key={key}
    //             label={item.text}
    //             name={options.props.name + '_radioGroup'}
    //             value={item.value}
    //             readOnly={options.props.readOnly}
    //             checked={options.props.value === item.value}
    //             onChange={options.onChange}
    //         />
    //     </Form.Field>)
    // }, options);

    // let className = options.props.className;
    // if (!className) {
    //     className = '';
    // }

    // if (options.props.error) {
    //     className += ' error';
    // }

    // if (options.props.direction === 'v') {
    //     className += ' ui form';
    //     return (<div className={className} style={options.props.style}>
    //         <label>{options.props.label}</label>
    //         <Form>
    //             {fields}
    //         </Form>
    //     </div>);
    // }

    // className += ' field';

    // return (<div className="ui form">
    //     <div className={className}>
    //         <label>{options.props.label}</label>
    //         <div style={options.props.style}>
    //             <Form.Group key="group">
    //                 {fields}
    //             </Form.Group>
    //         </div>
    //     </div>
    // </div>);

    let model = options.props.additionalParams.model;

    let inputProps = {};
    if(options.props.error){
        inputProps.className = "formbuilder-input-error";
    }

    if(model.direction != "v"){
        inputProps.inline = true;
    }

    let onChange = function(value, e){
        options.onChange(e, {name: options.props.name, value});
    };

    return <div {...options.controlProps}>
        {options.label && <ControlLabel>{options.label}
            {model["other-required"] && <span className="formbuilder-input-required">*</span>}
            {options.props.error && <span className="formbuilder-input-error"> <Icon icon='exclamation' /> {typeof(options.props.error) == "string" ? options.props.error : ""}</span>}
        </ControlLabel>}
        <div>
            <RadioGroup {...inputProps} 
                name={options.props.name}            
                value={options.props.value}
                onChange={onChange}
                disabled={options.props.readOnly || model.readOnly}
                >
                {options.items.map(c=> {
                    return <Radio value={c.value}>{c.text}</Radio>;
                })}
            </RadioGroup>
        </div>
    </div>
});
