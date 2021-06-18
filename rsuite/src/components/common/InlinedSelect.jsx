import React from "react";
import { InputPicker, ControlLabel, Icon } from 'rsuite';

export default (props) => {
  let {label, options, value, onChange, style} = props;

  return (
    <div style={{display: "flex", flexWrap: "nowrap", alignItems: "baseline", marginBottom: 5, marginTop: 5, ...style}}>
      <ControlLabel style={{flexShrink: 0}}>{label}</ControlLabel>
      <InputPicker disabled={!!props.disabled} data={options} value={value} onChange={onChange} cleanable={false} style={{border: 0}} placeholder={props.disabled ? "" : <Icon icon="pencil"/>}/>
    </div>
  );
};