import React from "react";
import {ControlLabel, Toggle} from 'rsuite';

export default (props) => {
  let {label, rightLabel, style, ...toggleProps} = props;

  const onClick = (e) => {
    e.stopPropagation();
    props.onChange?.(!props.checked);
  }

  return <div style={{display: "inline-block", ...style}}>
    <ControlLabel onClick={onClick}
                  style={{
                    flexFlow: !rightLabel ? "wrap" : "wrap-reverse",
                    cursor: _.isObject(label) ? "unset" : "pointer",
                    marginRight: rightLabel ? "10px" : 0,
                    display: 'inline-block',
                    verticalAlign: "middle"
                  }}>{label}</ControlLabel>
    <Toggle {...toggleProps} style={{marginLeft: !rightLabel ? "10px" : 0}}/>
  </div>;
};