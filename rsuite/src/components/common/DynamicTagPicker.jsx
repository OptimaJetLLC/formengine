import React from "react";
import { Tag, TagGroup, Popover, Whisper, IconButton, Icon, Checkbox, CheckboxGroup } from 'rsuite';

export default class DynamicTagPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.value || []
    };
  }
  handleTagRemove(tag) {
    const { tags } = this.state;
    const nextTags = tags.filter(item => item !== tag);
    this.setState({
      tags: nextTags
    });
    this.props.onChange(nextTags)
  }
  renderInput() {
    const style = { marginLeft: 5, border: 0, display: "inline-block" };
    const { options } = this.props;

    const Speaker = (props) => {
      return (
        <Popover {...props}>
          <CheckboxGroup value={this.state.tags} onChange={value => {
              this.setState({ tags: value });
              if (this.props.onChange) this.props.onChange(value);
            }}>
            {options.map(({name, label}) => <Checkbox value={name}>{label}</Checkbox>)}            
          </CheckboxGroup>
        </Popover>
      );
    };

    return (
      <Whisper
        trigger="click"
        placement={"auto"}
        speaker={<Speaker/>}>
        <IconButton
          onClick={this.handleButtonClick}
          icon={<Icon icon="plus" />}
          appearance="subtle"
          style={style}
          size="xs"/>
      </Whisper>
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
          ? tags.map((tag, index) => (
            <Tag
              key={index}
              closable
              onClose={() => {
                this.handleTagRemove(tag);
              }}
            >
              {this.props.options.find(item => (item.name == tag)).label}
            </Tag>))
           :  <p style={{display: "inline-flex"}}>{this.props.placeholder || "Tags"}</p>
        }
        {this.renderInput()}
      </TagGroup>
    );
  }
}