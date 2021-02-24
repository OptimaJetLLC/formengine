import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { isDefined } from 'optimajet-builder-shared';

export default class CustomBlockEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'customblockform')}
                            value={data.key} onChange={handleChange}/>
                <div className="field">
                    <label>{this.getLocalValue('sourcetypefield', 'Source type', 'customblockform')}</label>
                    <Form.Group>
                        <Form.Radio name="sourceType"
                                    label={this.getLocalValue('sourcetypeformfield', 'Form name', 'customblockform')}
                                    value="form" checked={data.sourceType === undefined || data.sourceType == 'form'}
                                    onChange={handleChange}/>
                        <Form.Radio name="sourceType"
                                    label={this.getLocalValue('sourcetypejsonfield', 'JSON source', 'customblockform')}
                                    value="source" checked={data.sourceType === 'source'} onChange={handleChange}/>
                        <Form.Radio name="sourceType"
                                    label={this.getLocalValue('placeholderfield', 'Placeholder', 'customblockform')}
                                    value="placeholder" checked={data.sourceType === 'placeholder'}
                                    onChange={handleChange}/>
                    </Form.Group>
                </div>
            </Form.Group>
            <Form.Input name="formname" label={this.getLocalValue('formnamefield', 'Form name', 'customblockform')}
                        value={data.formname} onChange={handleChange}
                        disabled={isDefined(data.sourceType) && data.sourceType !== 'form'}/>
            <Form.TextArea key="source" label={this.getLocalValue('sourcefield', 'JSON source', 'customblockform')}
                           name="source"
                           value={data['source']} onChange={handleChange} rows={10}
                           disabled={data.sourceType !== 'source'}/>
        </Form>);
    }
}
