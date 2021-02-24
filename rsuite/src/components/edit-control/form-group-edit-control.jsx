import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class FormGroupEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'formgroupform')} value={data.key}
                            onChange={handleChange}/>
                <div className="field">
                    <label>{this.getLocalValue('widthsfield', 'Widths', 'formgroupform')}</label>
                    <Form.Group>
                        <Form.Radio name="widths"
                                    label={this.getLocalValue('widthsequalfield', 'Equal', 'formgroupform')}
                                    value='equal' checked={data.widths === 'equal'} onChange={handleChange}/>
                        <Form.Radio name="widths"
                                    label={this.getLocalValue('widthscustomfield', 'Custom (1 - 16)', 'formgroupform')}
                                    value='custom' checked={data.widths === 'custom'} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
            <Form.Group widths="2">
                <div className="field">
                    <label>{this.getLocalValue('typefield', 'Type', 'formgroupform')}</label>
                    <Form.Group inline>
                        <Form.Radio name="orientation"
                                    label={this.getLocalValue('orientationcolumnsfield', 'Columns', 'formgroupform')}
                                    value="inline"
                                    checked={data.orientation === undefined || data.orientation === 'inline'}
                                    onChange={handleChange}/>
                        <Form.Radio name="orientation"
                                    label={this.getLocalValue('orientationrowsfield', 'Rows', 'formgroupform')}
                                    value="grouped" checked={data.orientation === 'grouped'} onChange={handleChange}/>
                        <Form.Radio name="orientation" 
                                    label={this.getLocalValue('orientationfieldfield', 'Field', "formgroupform")} value="field" checked={data.orientation === "field" } onChange={handleChange} />

                    </Form.Group>
                </div>
                <Form.Input name="widthsCustom" disabled={data.widths !== 'custom'} placeholder="2"
                            value={data.widthsCustom} onChange={handleChange}/>
            </Form.Group>
        </Form>);
    }
}
