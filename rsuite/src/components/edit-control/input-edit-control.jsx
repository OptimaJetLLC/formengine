import React from 'react';
import { Form, Checkbox } from 'rsuite';
import { FormInput, FormSelect } from './components/FormInput';
import BaseEditControl from './base-edit-control';
export default class InputEditControl extends BaseEditControl {
    getGeneralDescription() {
        const data = this.props.data;
        return (<>
            <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                <FormInput name="key" label={this.getLocalValue('namefield', 'Name', 'inputform')}/>
                <FormInput name="label" label={this.getLocalValue('labelfield', 'Label', 'inputform')}/>
            </Form>  
             
             <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                 <FormInput name="placeholder" label={this.getLocalValue('placeholderfield', 'Placeholder', 'inputform')}/>
                 <FormSelect name="type" data={this.labelType} label={this.getLocalValue('typefield', 'Type', 'inputform')}/>
             </Form>
             
             <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                 <FormSelect name="labelPosition" data={this.labelPositions} label={this.getLocalValue('labelpositionfield', 'Label position', 'inputform')}/>
                 <FormSelect name="size" data={this.sizeData} label={this.getLocalValue('sizefield', 'Size', 'inputform')}/>
             </Form>
             <p style={{textAlign: "center", marginTop: 10}}>Options</p>
             <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form checkboxes" fluid>
                <Checkbox name="disabled" onChange={this.checkboxChange} checked={data.disabled}
                          children={this.getLocalValue('disabledfield', 'Disabled', 'inputform')}/>
                <Checkbox name="transparent" onChange={this.checkboxChange} checked={data.transparent}
                          children={this.getLocalValue('transparentfield', 'Transparent', 'inputform')}/>
                <Checkbox name="fluid" onChange={this.checkboxChange} checked={data.fluid}
                          children={this.getLocalValue('fluidfield', 'Fluid', 'inputform')}/>
                <Checkbox name="readOnly" onChange={this.checkboxChange} checked={data.readOnly}
                          children={this.getLocalValue('readonlyfield', 'Read only', 'inputform')}/>
             </Form>
        </>);
    }

    getEventsList() {
        return ['onChange'];
    }

    sizeData = [
        { label: this.getLocalValue('sizedefault', 'Default'), value: '' },
        { label: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
        { label: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
        { label: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
        { label: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
        { label: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
        { label: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' },
        { label: this.getLocalValue('sizemassive', 'Massive'), value: 'massive' }
    ];

    labelPositions = [
        { label: this.getLocalValue('labeldefault', 'Default'), value: '' },
        { label: this.getLocalValue('labelleft', 'Left'), value: 'left' },
        { label: this.getLocalValue('labelright', 'Right'), value: 'right' },
        { label: this.getLocalValue('labelleftcorner', 'Left corner'), value: 'left corner' },
        { label: this.getLocalValue('labelrightcorner', 'Right corner'), value: 'right corner' }
    ];

    labelType = [
        { label: this.getLocalValue('typetext', 'Text', 'inputform'), value: 'text' },
        { label: this.getLocalValue('typenumber', 'Number', 'inputform'), value: 'number' },
        { label: this.getLocalValue('typepasswod', 'Password', 'inputform'), value: 'password' },
        { label: this.getLocalValue('typefile', 'File', 'inputform'), value: 'file' },
        { label: this.getLocalValue('typedate', 'Date', 'inputform'), value: 'date' },
        { label: this.getLocalValue('typetime', 'Time', 'inputform'), value: 'time' },
        { label: this.getLocalValue('typedatetime', 'Date & Time', 'inputform'), value: 'datetime' }
    ];
}
