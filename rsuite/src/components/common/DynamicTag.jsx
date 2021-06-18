import React from "react";
import { Tag, TagGroup, Input, IconButton, Icon } from 'rsuite';

export default class DynamicTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      inputValue: '',
      tags: props.data || []
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }
  handleButtonClick() {
    this.setState(
      {
        typing: true
      },
      () => {
        this.input.focus();
      }
    );
  }
  handleInputChange(inputValue) {
    this.setState({ inputValue });
  }
  handleInputConfirm() {
    const { inputValue, tags } = this.state;
    const nextTags = inputValue ? [...tags, inputValue] : tags;
    this.setState({
      tags: nextTags,
      typing: false,
      inputValue: ''
    });
    if (this.props.onChange) {
      this.props.onChange(nextTags);
    }
  }
  handleTagRemove(tag) {
    const { tags } = this.state;
    const nextTags = tags.filter(item => item !== tag);
    this.setState({
      tags: nextTags
    });
  }
  renderInput() {
    const { typing, inputValue } = this.state;
    const style = { marginLeft: 5, border: 0, display: "inline-block" };

    if (typing) {
      return (
        <Input
          className="tag-input"
          inputRef={ref => {
            this.input = ref;
          }}
          size="xs"
          style={{ width: 70, ...style }}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      );
    }

    return (
      <IconButton
        className="tag-add-btn"
        onClick={this.handleButtonClick}
        icon={<Icon icon="plus" />}
        appearance="subtle"
        style={style}
        size="xs"
      />
    );
  }
  render() {
    const { tags } = this.state;
    const marginStyle = tags.length ? {} : {margin: 0};    
    const style = {...this.props.style, ...marginStyle}
    return (
      <TagGroup style={style}>
        {!!tags.length && !!this.props.label && <p style={{display: "inline-flex", marginLeft: 10}}>{this.props.label}</p>}
        {tags.length 
          ? tags.map((item, index) => (
            <Tag
              key={index}
              closable
              onClose={() => {
                this.handleTagRemove(item);
              }}
            >
              {item}
            </Tag>))
           :  <p style={{display: "inline-flex"}}>{this.props.placeholder || "Tags"}</p>
        }
        {this.renderInput()}
      </TagGroup>
    );
  }
}