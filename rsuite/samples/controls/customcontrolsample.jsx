import React from "react";
import { ButtonToolbar, Button, Tag } from "rsuite";
import { FormBuilderControls, Window, drawcontrol } from "../../index";

class NewControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  
    render() {
        const controlProps = {
            key: this.props.name,
            className: this.props.className,
            style: this.props.style,
        };
  
        let replaceControlValue = this.props.replaceControlValue;
        let model = this.props.model;       
  
        return <h1 {...controlProps}>This is a custom control: {replaceControlValue(model.content)}</h1>;
    }
  }
  
  class NewControlEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  
    render() {
      return <Window 
          className="formbuilder-editform-default"
          onClose={this.props.onClose.bind(this.props.parent)}
          open={this.props.open} savePosition={true} name="editform">
            <h3>{this.props.data['key']}</h3>
                <Tag className="formbuilder-editform-controltype">{this.props.data['data-buildertype']}</Tag>
                <div className="formbuilder-editform-form">
                    {this.renderPanel()}
                </div>
                <div className="formbuilder-editform-buttons">
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={this.props.onSave.bind(this.props.parent)}>Save</Button>
                        <Button onClick={this.props.onClose.bind(this.props.parent)}>Cancel</Button>
                    </ButtonToolbar>
                </div>
      </Window>
    }

    renderPanel(){
        const data = this.props.data;
        const onChange = this.props.parent.handleChange.bind(this.props.parent);

        return <>
            {drawcontrol('input', {name: "key", value: data.key, label: "Name", onChange: onChange })}
            {drawcontrol('input', {name: "content", value: data.content, label: "Content", onChange: onChange })}
        </>;
    }
  }
  
  var NewControlSetting = {
    key: 'newcontrol',
    title: 'New Control',
    control: NewControlComponent,
    defaultValues: { content: 'Text...' },
    editControl: NewControlEditForm
  };

export { NewControlComponent, NewControlEditForm, NewControlSetting };