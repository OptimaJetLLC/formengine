import React from "react";
import { FormGroup, FormControl, ControlLabel, SelectPicker, ErrorMessage, TagPicker, InputGroup } from 'rsuite';

const setDefault = (prop, defaultValue) => (prop != undefined)  ? prop : defaultValue;

const fontSizes = {
  xs: 12,
  sm: "13px",
  md: 14,
  lg: 16
};

const FormInput = ({label, errorMessage, style, children, ...props}) => {
  const size = setDefault(props.size,"sm");
  const labelStyle = {
    fontSize: fontSizes[size]
  };
  const formControl = <FormControl {...props} size={setDefault(size,"sm")}/>;

  return (    
    <FormGroup className={("dwkit-input-form" + ((errorMessage != undefined)  ? " error" : ""))} style={{marginTop: 10, marginBottom: 5, ...style}}>
      <ControlLabel style={labelStyle} >{label}</ControlLabel>
      <div className="rs-form-control-wrapper">    
      {children 
        ? <InputGroup inside style={{width: "auto"}} size={setDefault(size,"sm")}>
          {formControl}
          {children}
        </InputGroup>
        : formControl
      }   
        {!!errorMessage && <ErrorMessage show={!!errorMessage} placement="bottomStart">
              {errorMessage}
        </ErrorMessage>}
      </div>
    </FormGroup>
  );
};

const FormSelect = ({searchable, cleanable, ...props}) => {
  return <FormInput {...props} accepter={SelectPicker} block placement="auto"
                    searchable={setDefault(searchable, false)} cleanable={setDefault(cleanable, false)} />
}
const FormMultiSelect = props => <FormInput {...props} accepter={TagPicker} cleanable={false} creatable block/>

export { FormInput, FormSelect, FormMultiSelect };