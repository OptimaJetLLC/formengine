import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class TextAreaEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;
        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'textareaform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'textareaform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="rows" placeholder="3" type="number"
                            label={this.getLocalValue('rowsfield', 'Rows', 'textareaform')} value={data.rows}
                            onChange={handleChange}/>
                <div className="field">
                    <Form.Input name="placeholder"
                                label={this.getLocalValue('placeholderfield', 'Placeholder', 'textareaform')}
                                value={data.placeholder} onChange={handleChange}/>
                    <label>{this.getLocalValue('optionsfield', 'Options', 'textareaform')}</label>
                    <Form.Group widths="equal">
                        <Form.Checkbox name="readOnly"
                                       label={this.getLocalValue('readonlyfield', 'Read only', 'textareaform')}
                                       checked={data.readOnly} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
