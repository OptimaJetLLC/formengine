import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { isUndefined } from 'optimajet-builder-shared';

export default class InputEditControl extends BaseEditControl {

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
            { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' },
            { text: this.getLocalValue('sizemassive', 'Massive'), value: 'massive' }
        ];

        const labelPositions = [
            { text: this.getLocalValue('labeldefault', 'Default'), value: '' },
            { text: this.getLocalValue('labelleft', 'Left'), value: 'left' },
            { text: this.getLocalValue('labelright', 'Right'), value: 'right' },
            { text: this.getLocalValue('labelleftcorner', 'Left corner'), value: 'left corner' },
            { text: this.getLocalValue('labelrightcorner', 'Right corner'), value: 'right corner' }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'inputform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'inputform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <label>{this.getLocalValue('typefield', 'Type', 'inputform')}</label>
                    <Form.Group widths="equal">
                        <Form.Radio name="type" label={this.getLocalValue('typetext', 'Text', 'inputform')} value='text'
                                    checked={isUndefined(data.type) || data.type === 'text'} onChange={handleChange}/>
                        <Form.Radio name="type" label={this.getLocalValue('typenumber', 'Number', 'inputform')}
                                    value='number' checked={data.type === 'number'} onChange={handleChange}/>
                        <Form.Radio name="type" label={this.getLocalValue('typepasswod', 'Password', 'inputform')}
                                    value='password' checked={data.type === 'password'} onChange={handleChange}/>
                        <Form.Radio name="type" label={this.getLocalValue('typefile', 'File', 'inputform')} value='file'
                                    checked={data.type === 'file'} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Radio name="type" label={this.getLocalValue('typedate', 'Date', 'inputform')} value='date'
                                    checked={data.type === 'date'} onChange={handleChange}/>
                        <Form.Radio name="type" label={this.getLocalValue('typetime', 'Time', 'inputform')} value='time'
                                    checked={data.type === 'time'} onChange={handleChange}/>
                        <Form.Radio name="type" label={this.getLocalValue('typedatetime', 'Date & Time', 'inputform')}
                                    value='datetime' checked={data.type === 'datetime'} onChange={handleChange}/>
                    </Form.Group>
                </div>
                <div className="field">
                    <Form.Dropdown name="labelPosition" selection fluid placeholder={labelPositions[0].text}
                                   options={labelPositions}
                                   label={this.getLocalValue('labelpositionfield', 'Label position', 'inputform')}
                                   value={data.labelPosition} onChange={handleChange}/>
                    <Form.Input name="placeholder"
                                label={this.getLocalValue('placeholderfield', 'Placeholder', 'inputform')}
                                value={data.placeholder} onChange={handleChange}/>
                </div>
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
                <div className="field">
                    <Form.Dropdown name="size" selection fluid options={sizedata} placeholder={sizedata[0].text}
                                   label={this.getLocalValue('sizefield', 'Size', 'inputform')} value={data.size}
                                   onChange={handleChange}/>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
