import React from 'react';
import { Form, Checkbox, InputGroup, Icon } from 'rsuite';
import { FormInput, FormSelect } from '../common/FormInput';
import BaseEditControl from './base-edit-control';

export default class ButtonEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const sizedata = [
            { label: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { label: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { label: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { label: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { label: this.getLocalValue('sizelarge', 'Large'), value: 'large' }
        ];

        const floatedData = [
            { label: this.getLocalValue('floatedleftfield', 'Left', 'buttonform'), value: 'left' },
            { label: this.getLocalValue('floatedrightfield', 'Right', 'buttonform'), value: 'right' },
        ];

        const appearances = [
            { label: this.getLocalValue('basicfield', 'Basic', 'buttonform'), value: 'basic'},
            { label: this.getLocalValue('primaryfield', 'Primary', 'buttonform'), value: 'primary'},
            { label: this.getLocalValue('secondaryfield', 'Secondary', 'buttonform'), value: 'secondary'},
            { label: this.getLocalValue('subtlefield', 'Subtle', "buttonform"), value: 'subtle'},
            { label: this.getLocalValue('linkfield', 'Link', "buttonform"), value: 'link'},
        ];

        return (<>
            <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                <FormInput name="key" label={this.getLocalValue('namefield', 'Name', 'buttonform')}/>
                <FormInput name="icon" label={this.getLocalValue('iconfield', 'Icon', 'buttonform')}>
                        <InputGroup.Button onClick={_=>window.open('https://rsuitejs.com/tools/icons')}>
                            <Icon icon="question" />
                        </InputGroup.Button>
                    </FormInput>
            </Form>  
             
             <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                 <FormInput name="content" label={this.getLocalValue('contentfield', 'Content', 'buttonform')}/>
                 <FormSelect name="size" data={sizedata} placeholder="Default"
                             label={this.getLocalValue('sizefield', 'Size', 'buttonform')}/>
             </Form>

             <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form" fluid>
                 <FormSelect name="appearance" data={appearances} placeholder="Default"
                             label={this.getLocalValue('appearancefield', 'Appearance', 'buttonform')}/>
                 <FormSelect name="floated" data={floatedData} placeholder="Default"
                             label={this.getLocalValue('floatedfield', 'Floated', 'buttonform')}/>
             </Form>
             <p style={{textAlign: "center", marginTop: 10}}>{this.getLocalValue('optionsfield', 'Options', 'buttonform')}</p>
             <Form formValue={data} onChange={this.formChange} className="dwkit-inline-form checkboxes" fluid>
                <Checkbox name="disabled" onChange={this.checkboxChange} checked={data.disabled}
                          children={this.getLocalValue('disabledfield', 'Disabled', 'inputform')}/>
                <Checkbox name="circular" onChange={this.checkboxChange} checked={data.circular}
                          children={this.getLocalValue('circularfield', 'Circular', 'buttonform')}/>
                {data.icon && <Checkbox name="fluid" onChange={this.checkboxChange} checked={data.fluid}
                          children={this.getLocalValue('fluidfield', 'Fluid', 'inputform')}/>}
             </Form>
        </>);
    }

    getEventsList() {
        return ['onClick'];
    }
}
