import React from "react";
import { Input, IconButton, Icon } from 'rsuite';

export default class LabeledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      inputValue: props.value || '',
    };
  }
  handleValueClick = () => {
    this.setState(
      {
        typing: true
      },
      () => {
        this.input.focus();
      }
    );
  }
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  }
  handleInputConfirm = () => {
    this.setState({
      typing: false,
    });
    if (this.props.onChange) {
      this.props.onChange(this.state.inputValue);
    }
  }
  renderInput = () => {
    const { typing, inputValue } = this.state;
    const style = { marginLeft: -10, border: 0, display: "inline-block" };

    if (typing) {
      return (
        <Input
          className="tag-input"
          inputRef={ref => {
            this.input = ref;
          }}
          size="xs"
          style={{ flexGrow: 1, ...style }}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      );
    }

    return (
      <a style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", opacity: this.props.disabled ? 0.3 : 1}} onClick={this.props.disabled ? null : this.handleValueClick}>{inputValue || (this.props.disabled ? "" : <Icon icon="pencil"/>)}</a>
    );
  }
  render() {
    return (<div style={{display: "inline-flex", flexWrap: "nowrap"}}>    
      {!!this.props.label && <p style={{display: "inline-flex", marginRight: 10, whiteSpace: "nowrap"}}>{this.props.label}</p>}
      {this.renderInput()}
      {!!this.state.inputValue && <IconButton href={this.props.setUrlFunc(this.state.inputValue)} icon={<Icon icon="arrow-circle-right"/>} style={{marginLeft: 10, flexShrink: 0}} appearance="subtle" circle size="xs"/>}
    </div>);
  }
}