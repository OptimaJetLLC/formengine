import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class SignatureCanvasEditControl extends BaseEditControl{
    constructor(props) {
      super(props);
    }
    getGeneralDescription(){
      const data = this.props.data;
      const handleChange = this.props.parent.handleChange.bind(this.props.parent);

      return (<Form>
        <Form.Group widths="equal">
          <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', "containerform")} value={data.key} onChange={handleChange} />         
          <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'inputform')} value={data.label} onChange={handleChange}/>  
        </Form.Group>
        <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'inputform')}</label>
                    <Form.Group widths="equal">
                        <Form.Checkbox name="showPreview"
                                       label={this.getLocalValue('showpreviewfield', 'Show preview', 'inputform')}
                                       checked={data.showPreview} onChange={handleChange}/>
                        <Form.Checkbox name="compact"
                                       label={this.getLocalValue('compactfield', 'Compact', 'inputform')}
                                       checked={data.compact} onChange={handleChange}/>
                    </Form.Group>
        </div>
    </Form>);
    }

    getEventsList() {
      return ['onChange'];
    }
}
