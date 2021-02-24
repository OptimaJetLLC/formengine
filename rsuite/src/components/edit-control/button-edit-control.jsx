import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class ButtonEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const sizedata = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'buttonform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="icon" label={this.getLocalValue('iconfield', 'Icon', 'buttonform')} value={data.icon}
                            onChange={handleChange}
                            action={{
                                icon: 'help',
                                onClick: (e) => {
                                    window.open('https://rsuitejs.com/tools/icons');
                                }
                            }}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="content" label={this.getLocalValue('contentfield', 'Content', 'buttonform')}
                            value={data.content} onChange={handleChange}/>
                <Form.Dropdown name="size" selection fluid options={sizedata} placeholder="Default"
                               label={this.getLocalValue('sizefield', 'Size', 'buttonform')} value={data.size}
                               onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'buttonform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="basic" label={this.getLocalValue('basicfield', 'Basic', 'buttonform')}
                                       checked={data.basic} onChange={handleChange}/>
                        <Form.Checkbox name="circular"
                                       label={this.getLocalValue('circularfield', 'Circular', 'buttonform')}
                                       checked={data.circular} onChange={handleChange}/>
                        <Form.Checkbox name="compact"
                                       label={this.getLocalValue('compactfield', 'Compact', 'buttonform')}
                                       checked={data.compact} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="disabled"
                                       label={this.getLocalValue('disabledfield', 'Disabled', 'buttonform')}
                                       checked={data.disabled} onChange={handleChange}/>
                        <Form.Checkbox name="fluid" label={this.getLocalValue('fluidfield', 'Fluid', 'buttonform')}
                                       checked={data.fluid} onChange={handleChange}/>
                        <Form.Checkbox name="link" label={this.getLocalValue('linkfield', 'Link', "buttonform")} 
                                        checked={data.link } onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="primary"
                                       label={this.getLocalValue('primaryfield', 'Primary', 'buttonform')}
                                       checked={data.primary} onChange={handleChange}/>
                        <Form.Checkbox name="secondary"
                                       label={this.getLocalValue('secondaryfield', 'Secondary', 'buttonform')}
                                       checked={data.secondary} onChange={handleChange}/>
                    </Form.Group>
                </div>
                <div className="field">
                    <label>{this.getLocalValue('floatedfield', 'Floated', 'buttonform')}</label>
                    <Form.Group>
                        <Form.Radio name="floated"
                                    label={this.getLocalValue('floateddefaultfield', 'Default', 'buttonform')} value=''
                                    checked={data.floated === undefined || data.floated === ''}
                                    onChange={handleChange}/>
                        <Form.Radio name="floated" label={this.getLocalValue('floatedleftfield', 'Left', 'buttonform')}
                                    value='left' checked={data.floated === 'left'} onChange={handleChange}/>
                        <Form.Radio name="floated"
                                    label={this.getLocalValue('floatedrightfield', 'Right', 'buttonform')} value='right'
                                    checked={data.floated === 'right'} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onClick'];
    }
}
