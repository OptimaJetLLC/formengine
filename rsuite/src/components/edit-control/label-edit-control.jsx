import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class LabelEditControl extends BaseEditControl {

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

        const attacheddata = [
            { text: this.getLocalValue('attachednone', 'None'), value: '' },
            { text: this.getLocalValue('attachedtop', 'Top'), value: 'top' },
            { text: this.getLocalValue('attachedbottom', 'Bottom'), value: 'bottom' },
            { text: this.getLocalValue('attachedtopright', 'Top right'), value: 'top right' },
            { text: this.getLocalValue('attachedtopleft', 'Top left'), value: 'top left' },
            { text: this.getLocalValue('attachedbottomleft', 'Bottom left'), value: 'bottom left' },
            { text: this.getLocalValue('attachedbottomright', 'Bottom right'), value: 'bottom right' }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'labelform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Dropdown name="attached" selection fluid options={attacheddata} placeholder={attacheddata[0].text}
                               label={this.getLocalValue('attachedfield', 'Attached', 'labelform')}
                               value={data.attached} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <Form.Input name="content" label={this.getLocalValue('contentfield', 'Content', 'labelform')}
                                value={data.content} onChange={handleChange}/>
                    <Form.Dropdown name="size" selection fluid options={sizedata} placeholder="Default"
                                   label={this.getLocalValue('sizefield', 'Size', 'labelform')} value={data.size}
                                   onChange={handleChange}/>
                </div>
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'labelform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="basic" label={this.getLocalValue('basicfield', 'Basic', 'labelform')}
                                       checked={data.basic} onChange={handleChange}/>
                        <Form.Checkbox name="circular"
                                       label={this.getLocalValue('circularfield', 'Circular', 'labelform')}
                                       checked={data.circular} onChange={handleChange}/>
                        <Form.Checkbox name="corner" label={this.getLocalValue('cornerfield', 'Corner', 'labelform')}
                                       checked={data.corner} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="floating"
                                       label={this.getLocalValue('floatingfield', 'Floating', 'labelform')}
                                       checked={data.floating} onChange={handleChange}/>
                        <Form.Checkbox name="pointing"
                                       label={this.getLocalValue('pointingfield', 'Pointing', 'labelform')}
                                       checked={data.pointing} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
        </Form>);
    }
}
