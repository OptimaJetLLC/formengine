import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class MessageEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;

        const sizedata = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { text: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
            { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <div className="field">
                    <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'messageform')}
                                value={data.key} onChange={handleChange}/>
                    <Form.Input name="header" label={this.getLocalValue('headerfield', 'Header', 'messageform')}
                                value={data.header} onChange={handleChange}/>
                </div>
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'messageform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="compact"
                                       label={this.getLocalValue('compactfield', 'Compact', 'messageform')}
                                       checked={data.compact} onChange={handleChange}/>
                        <Form.Checkbox name="error" label={this.getLocalValue('errorfield', 'Error', 'messageform')}
                                       checked={data.error} onChange={handleChange}/>
                        <Form.Checkbox name="floating"
                                       label={this.getLocalValue('floatingfield', 'Floating', 'messageform')}
                                       checked={data.floating} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="info" label={this.getLocalValue('infofield', 'Info', 'messageform')}
                                       checked={data.info} onChange={handleChange}/>
                        <Form.Checkbox name="negative"
                                       label={this.getLocalValue('negativefield', 'Negative', 'messageform')}
                                       checked={data.negative} onChange={handleChange}/>
                        <Form.Checkbox name="positive"
                                       label={this.getLocalValue('positivefield', 'Positive', 'messageform')}
                                       checked={data.positive} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="success"
                                       label={this.getLocalValue('successfield', 'Success', 'messageform')}
                                       checked={data.success} onChange={handleChange}/>
                        <Form.Checkbox name="warning"
                                       label={this.getLocalValue('warningfield', 'Warning', 'messageform')}
                                       checked={data.warning} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.TextArea name="content" label={this.getLocalValue('contentfield', 'Content', 'messageform')}
                               value={data.content} onChange={handleChange}/>
                <Form.Dropdown name="size" selection fluid options={sizedata} placeholder={sizedata[0].text}
                               label={this.getLocalValue('sizefield', 'Size', 'messageform')} value={data.size}
                               onChange={handleChange}/>
            </Form.Group>
        </Form>);
    }
}
