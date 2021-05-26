import React from "react";
import { Button, ControlLabel, Whisper, Popover } from "rsuite";
import { ChromePicker, CirclePicker } from 'react-color'

export default class ColorPicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: props.color
      };
    }

    render() {
      const { Speaker } = this;      
      const { color } = this.state;
      const { style, label, ...props } = this.props
      return (
        <div style={{display: "flex", flexDirection: "column", ...style}} {...props}>
          <ControlLabel>{label}</ControlLabel>                 
          <Whisper
            trigger="click"
            placement={"auto"}
            speaker={<Speaker/>}>
            <Button style={{padding: 4}}>
              <div style={{height: 26, background: color?.hex, borderRadius: 3}}/>
            </Button>
          </Whisper>          
        </div>   
      );
    }

    onChange = (color) => {
      const { onChange } = this.props;

      this.setState({color});
      if (onChange) onChange(color.hex);
    }

    Speaker = (props) => {
      return (
        <div className="dwkit-color-picker-popover">
          <Popover {...props}>
            <div className="dwkit-color-picker">
              <ChromePicker color={ this.state.color } onChange={this.onChange} disableAlpha />
              <CirclePicker color={ this.state.color } onChange={this.onChange} />
            </div>
          </Popover>
        </div>
      );
    };
  }