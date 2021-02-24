import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class HeaderEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
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
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'headerform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Dropdown name="size" selection fluid options={sizedata} placeholder="Default"
                               label={this.getLocalValue('sizefield', 'Size', 'header')} value={data.size}
                               onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.TextArea name="content" label={this.getLocalValue('contentfield', 'Content', 'headerform')}
                               value={data.content} onChange={handleChange}/>
                <div className="field">
                    <label>{this.getLocalValue('textalignfield', 'Text Align', 'headerform')}</label>
                    <Form.Group widths="equal">
                        <Form.Radio name="textAlign" label={this.getLocalValue('textalignleft', 'Left', 'headerform')}
                                    value='left' checked={data.textAlign === 'left'} onChange={handleChange}/>
                        <Form.Radio name="textAlign"
                                    label={this.getLocalValue('textaligncenter', 'Center', 'headerform')} value='center'
                                    checked={data.textAlign === 'center'} onChange={handleChange}/>
                        <Form.Radio name="textAlign" label={this.getLocalValue('textalignright', 'Right', 'headerform')}
                                    value='right' checked={data.textAlign === 'right'} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
            <Form.Input name="subheader" label={this.getLocalValue('subheaderfield', 'Subheader', 'headerform')}
                        value={data.subheader} onChange={handleChange}/>
        </Form>);
    }
}
