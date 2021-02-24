import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class CardEditControl extends BaseEditControl{
    constructor(props) {
      super(props);
    }
    getGeneralDescription(){
      var data = this.props.data;
      var handleChange = this.props.parent.handleChange.bind(this.props.parent);
      
      return (<Form>
          <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', "cardform")} value={data.key} onChange={handleChange} />
          <Form.Input name="header" label={this.getLocalValue('headerfield', 'Header', "cardform")} value={data.header} onChange={handleChange} />
          <Form.Input name="imgurl" label={this.getLocalValue('imgurlfield', 'Image URL', "cardform")} value={data.imgurl} onChange={handleChange} />
        </Form>);
    }
  
    getEventsList(){
      return ["onClick"];
    }
}
