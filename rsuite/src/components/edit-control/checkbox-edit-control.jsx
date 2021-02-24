import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class CheckboxEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;
        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'checkboxform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'checkboxform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="2">
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'checkboxform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="fitted" label={this.getLocalValue('fittedfield', 'Fitted', 'checkboxform')}
                                       checked={data.fitted} onChange={handleChange}/>
                        <Form.Checkbox name="indeterminate"
                                       label={this.getLocalValue('indeterminatefield', 'Indeterminate', 'checkboxform')}
                                       checked={data.indeterminate} onChange={handleChange}/>
                        <Form.Checkbox name="readOnly"
                                       label={this.getLocalValue('readonlyfield', 'ReadOnly', 'checkboxform')}
                                       checked={data.readOnly} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="disabled"
                                       label={this.getLocalValue('disabledfield', 'Disabled', 'checkboxform')}
                                       checked={data.disabled} onChange={handleChange}/>
                        <Form.Checkbox name="slider" label={this.getLocalValue('sliderfield', 'Slider', 'checkboxform')}
                                       checked={data.slider} onChange={handleChange}/>
                        <Form.Checkbox name="toggle" label={this.getLocalValue('togglefield', 'Toggle', 'checkboxform')}
                                       checked={data.toggle} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
