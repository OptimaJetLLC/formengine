import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class NumberFormatEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const data = this.props.data;

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'inputform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'inputform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="format" label={this.getLocalValue('formatfield', 'Format', 'inputform')}
                            value={data.format} onChange={handleChange}/>
                <Form.Input name="mask" disabled={!Boolean(data.format)}
                            label={this.getLocalValue('maskfield', 'Mask', 'inputform')} value={data.mask}
                            onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="prefix" disabled={Boolean(data.format)}
                            label={this.getLocalValue('prefixfield', 'Prefix', 'inputform')} value={data.prefix}
                            onChange={handleChange}/>
                <Form.Input name="suffix" disabled={Boolean(data.format)}
                            label={this.getLocalValue('suffixfield', 'Suffix', 'inputform')} value={data.suffix}
                            onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Checkbox name="thousandSeparator"
                               label={this.getLocalValue('thousandSeparatorfield', 'Thousand Separator', 'inputform')}
                               checked={data.thousandSeparator} onChange={handleChange}/>
                <Form.Input name="placeholder"
                            label={this.getLocalValue('placeholderfield', 'Placeholder', 'inputform')}
                            value={data.placeholder} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'inputform')}</label>
                    <Form.Group widths="equal">
                        <Form.Checkbox name="disabled"
                                       label={this.getLocalValue('disabledfield', 'Disabled', 'inputform')}
                                       checked={data.disabled} onChange={handleChange}/>
                        <Form.Checkbox name="transparent"
                                       label={this.getLocalValue('transparentfield', 'Transparent', 'inputform')}
                                       checked={data.transparent} onChange={handleChange}/>
                        <Form.Checkbox name="fluid" label={this.getLocalValue('fluidfield', 'Fluid', 'inputform')}
                                       checked={data.fluid} onChange={handleChange}/>
                        <Form.Checkbox name="readOnly"
                                       label={this.getLocalValue('readonlyfield', 'Read only', 'inputform')}
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
