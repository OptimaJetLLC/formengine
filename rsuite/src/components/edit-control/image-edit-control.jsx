import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class ImageEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        return (<Form>
            <Form.Group widths="equal">
                <div className="field">
                    <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'imageform')} value={data.key}
                                onChange={handleChange}/>
                    <Form.Input name="src" label={this.getLocalValue('srcfield', 'Src', 'imageform')} value={data.src}
                                onChange={handleChange}/>
                    <Form.Input name="href" label={this.getLocalValue('hreffield', 'Href', 'imageform')}
                                value={data.href} onChange={handleChange}/>
                </div>
                <div className="field">
                    <div className="field">
                        <label>{this.getLocalValue('optionsfield', 'Options', 'imageform')}</label>
                        <Form.Group>
                            <Form.Checkbox name="avatar"
                                           label={this.getLocalValue('avatarfield', 'Avatar', 'imageform')}
                                           checked={data.avatar} onChange={handleChange}/>
                            <Form.Checkbox name="bordered"
                                           label={this.getLocalValue('borderedfield', 'Bordered', 'imageform')}
                                           checked={data.bordered} onChange={handleChange}/>
                            <Form.Checkbox name="centered"
                                           label={this.getLocalValue('centeredfield', 'Centered', 'imageform')}
                                           checked={data.centered} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Checkbox name="disabled"
                                           label={this.getLocalValue('disabledfield', 'Disabled', 'imageform')}
                                           checked={data.disabled} onChange={handleChange}/>
                            <Form.Checkbox name="inline"
                                           label={this.getLocalValue('inlinefield', 'Inline', 'imageform')}
                                           checked={data.inline} onChange={handleChange}/>
                            <Form.Checkbox name="spaced"
                                           label={this.getLocalValue('spacedfield', 'Spaced', 'imageform')}
                                           checked={data.spaced} onChange={handleChange}/>
                        </Form.Group>
                    </div>
                    <div className="field">
                        <label>{this.getLocalValue('floatedfield', 'Floated', 'imageform')}</label>
                        <Form.Group>
                            <Form.Radio name="floated"
                                        label={this.getLocalValue('floatedleftfield', 'Left', 'imageform')} value='left'
                                        checked={data.floated === 'left' || data.floated === ''}
                                        onChange={handleChange}/>
                            <Form.Radio name="floated"
                                        label={this.getLocalValue('floatedrightfield', 'Right', 'imageform')}
                                        value='right' checked={data.floated === 'right'} onChange={handleChange}/>
                        </Form.Group>
                        <label>{this.getLocalValue('verticalalignfield', 'Vertical align', 'imageform')}</label>
                        <Form.Group>
                            <Form.Radio name="verticalAlign"
                                        label={this.getLocalValue('verticalaligntopfield', 'Top', 'imageform')}
                                        value="top" checked={data.verticalAlign === 'top'} onChange={handleChange}/>
                            <Form.Radio name="verticalAlign"
                                        label={this.getLocalValue('verticalalignmiddlefield', 'Middle', 'imageform')}
                                        value='middle' checked={data.verticalAlign === 'middle'}
                                        onChange={handleChange}/>
                            <Form.Radio name="verticalAlign"
                                        label={this.getLocalValue('verticalalignbottomfield', 'Bottom', 'imageform')}
                                        value='bottom' checked={data.verticalAlign === 'bottom'}
                                        onChange={handleChange}/>
                        </Form.Group>
                    </div>
                </div>
            </Form.Group>
        </Form>);
    }
}
