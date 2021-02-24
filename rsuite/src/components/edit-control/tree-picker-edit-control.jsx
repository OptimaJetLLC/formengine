import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class TreePickerEditControl extends BaseEditControl {

    getStyleDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const stylesource_ps = '/*** Example Code ***/\ncolor:red;\npaddingTop:5px;';
        return (<Form key="styleDescriptionForm">
            <Form.Group widths="equal">
                <Form.Input name="style-width" label={this.getLocalValue('widthfield', 'Width')} placeholder="100px"
                            value={data['style-width']} onChange={handleChange}/>
                <Form.Input name="style-height" label={this.getLocalValue('heightfield', 'Height')} placeholder="100px"
                            value={data['style-height']} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="style-marginTop" label={this.getLocalValue('margintopfield', 'Margin Top')}
                            placeholder="0px" value={data['style-marginTop']} onChange={handleChange}/>
                <Form.Input name="style-marginBottom" label={this.getLocalValue('marginbottomfield', 'Margin Bottom')}
                            placeholder="0px" value={data['style-marginBottom']} onChange={handleChange}/>
                <Form.Input name="style-marginLeft" label={this.getLocalValue('marginleftfield', 'Margin Left')}
                            placeholder="0px" value={data['style-marginLeft']} onChange={handleChange}/>
                <Form.Input name="style-marginRight" label={this.getLocalValue('marginrightfield', 'Margin Right')}
                            placeholder="0px" value={data['style-marginRight']} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="style-customcss" label={this.getLocalValue(
                    'buttoncssclass',
                    'Custom CSS class for button',
                    'treepickerform'
                )} placeholder="dwkit-application-css (without '.')" value={data['style-customcss']}
                            onChange={handleChange}/>
                <Form.Input name="style-custommodalcss"
                            label={this.getLocalValue('modalcssclass', 'Custom CSS class for modal', 'treepickerform')}
                            placeholder="dwkit-application-css (without '.')" value={data['style-custommodalcss']}
                            onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.TextArea name="style-source"
                               label={this.getLocalValue('buttonstyle', 'Button style', 'treepickerform')}
                               placeholder={stylesource_ps} value={data['style-source']} onChange={handleChange}/>
                <Form.TextArea name="style-modalsource"
                               label={this.getLocalValue('modalstyle', 'Modal style', 'treepickerform')}
                               placeholder={stylesource_ps} value={data['style-modalsource']} onChange={handleChange}/>
            </Form.Group>
            <Form.Checkbox name="style-hidden" label={this.getLocalValue('hiddenfield', 'Hidden')}
                           checked={data['style-hidden']} onChange={handleChange}/>
        </Form>);
    }

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const textPlaceholder = 'data.Name + \' \' + data.Email';

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'treepickerform')}
                            value={data.key} onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'treepickerform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="dataModel"
                            label={this.getLocalValue('datamodelfield', 'Data model', 'treepickerform')}
                            value={data.dataModel} onChange={handleChange}/>
                <Form.Input name="parentIdField"
                            label={this.getLocalValue('parentidfield', 'ParentId field', 'treepickerform')}
                            value={data.parentIdField} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <Form.Input name="columns" label={this.getLocalValue(
                        'columnsfield',
                        'Columns (Name ASC, Email)',
                        'treepickerform'
                    )} value={data.columns} onChange={handleChange}/>
                    <Form.Input name="text" label={this.getLocalValue('textfield', 'Text expression', 'treepickerform')}
                                value={data.text} onChange={handleChange} placeholder={textPlaceholder}/>
                </div>
                <div className="field">
                    <Form.Input name="pageSize"
                                label={this.getLocalValue('pagesizefield', 'Page Size', 'treepickerform')}
                                disabled={!data.paging} value={data.pageSize} placeholder="100"
                                onChange={handleChange}/>
                    <label>{this.getLocalValue('optionsfield', 'Options', 'treepickerform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="paging"
                                       label={this.getLocalValue('pagingfield', 'Server pagination', 'treepickerform')}
                                       checked={data.paging} onChange={handleChange}/>
                        <Form.Checkbox name="multiple"
                                       label={this.getLocalValue('multiplefield', 'Multiple', 'treepickerform')}
                                       checked={data.multiple} onChange={handleChange}/>
                        <Form.Checkbox name="fluid" label={this.getLocalValue('fluidfield', 'Fluid', 'treepickerform')}
                                       checked={data.fluid} onChange={handleChange}/>
                        <Form.Checkbox name="selection"
                                       label={this.getLocalValue('selectionfield', 'Selection', 'treepickerform')}
                                       checked={data.selection} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="readOnly"
                                       label={this.getLocalValue('readonlyfield', 'Read only', 'treepickerform')}
                                       checked={data.readOnly} onChange={handleChange}/>
                        <Form.Checkbox name="disabled"
                                       label={this.getLocalValue('disabledfield', 'Disabled', 'treepickerform')}
                                       checked={data.disabled} onChange={handleChange}/>
                        <Form.Checkbox name="clearable"
                                       label={this.getLocalValue('clearablefield', 'Clearable', 'treepickerform')}
                                       checked={data.clearable} onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
