import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class StaticContentEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;
        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'staticcontentform')}
                            value={data.key} onChange={handleChange}/>
                <Form.Input name="style-font-size" placeholder="20px"
                            label={this.getLocalValue('fontsizefield', 'Font size', 'staticcontentform')}
                            value={data['style-font-size']} onChange={handleChange}/>
            </Form.Group>
            <Form.Checkbox name="isHtml" label={this.getLocalValue('allowhtmlfield', 'Allow HTML', 'staticcontentform')}
                           checked={data.isHtml} onChange={handleChange}/>
            <TextArea rows={6} name="content" label={this.getLocalValue('contentfield', 'Content', 'staticcontentform')}
                      value={data.content} onChange={handleChange}/>
        </Form>);
    }
}
