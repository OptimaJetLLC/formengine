import React from 'react';
import { Form, Icon, Popup } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';

export default class DictionaryEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const filterPlaceholder = '[{"column":"columnName","value":"columnValue","term":"="}]';
        const textPlaceholder = 'data.Name + \' \' + data.Email';

        const filterIcon = <Icon link={true} onClick={() => {
            this.props.parent.handleChange.call(
                this.props.parent,
                undefined,
                { name: 'filters', value: filterPlaceholder }
            );
        }} name="idea"/>;

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'dictionaryform')}
                            value={data.key} onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'dictionaryform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input name="dataModel"
                            label={this.getLocalValue('datamodelfield', 'Data model', 'dictionaryform')}
                            value={data.dataModel} onChange={handleChange}/>
                <Form.Input name="placeholder"
                            label={this.getLocalValue('placeholderfield', 'Placeholder', 'dictionaryform')}
                            value={data.placeholder} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <Form.Input name="columns" label={this.getLocalValue(
                        'columnsfield',
                        'Columns (Name ASC, Email)',
                        'dictionaryform'
                    )} value={data.columns} onChange={handleChange}/>
                    <Form.Input name="text" label={this.getLocalValue('textfield', 'Text expression', 'dictionaryform')}
                                value={data.text} onChange={handleChange} placeholder={textPlaceholder}/>
                    <Form.Input name="filters" label={<label>{this.getLocalValue(
                        'filtersfield',
                        'Filters',
                        'dictionaryform'
                    )}{filterIcon}</label>} value={data.filters} onChange={handleChange}
                                placeholder={filterPlaceholder}/>
                    <Form.Input name="pageSize"
                                label={this.getLocalValue('pagesizefield', 'Page Size', 'dictionaryform')}
                                disabled={!data.paging} value={data.pageSize} placeholder="100"
                                onChange={handleChange}/>
                </div>
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'dictionaryform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="paging"
                                       label={this.getLocalValue('pagingfield', 'Server pagination', 'dictionaryform')}
                                       checked={data.paging} onChange={handleChange}/>
                        <Form.Checkbox name="search"
                                       label={this.getLocalValue('searchfield', 'Search', 'dictionaryform')}
                                       checked={data.search} onChange={handleChange}/>
                        <Form.Checkbox name="multiple"
                                       label={this.getLocalValue('multiplefield', 'Multiple', 'dictionaryform')}
                                       checked={data.multiple} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="readOnly"
                                       label={this.getLocalValue('readonlyfield', 'Read only', 'dictionaryform')}
                                       checked={data.readOnly} onChange={handleChange}/>
                        <Form.Checkbox name="disabled"
                                       label={this.getLocalValue('disabledfield', 'Disabled', 'dictionaryform')}
                                       checked={data.disabled} onChange={handleChange}/>
                        <Form.Checkbox name="clearable"
                                       label={this.getLocalValue('clearablefield', 'Clearable', 'dictionaryform')}
                                       checked={data.clearable} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="selection"
                                       label={this.getLocalValue('selectionfield', 'Selection', 'dictionaryform')}
                                       checked={data.selection} onChange={handleChange}/>
                        <Form.Checkbox name="fluid" label={this.getLocalValue('fluidfield', 'Fluid', 'dictionaryform')}
                                       checked={data.fluid} onChange={handleChange}/>
                        <Form.Checkbox name="textAsValue" label={<Popup
                            content={this.getLocalValue('textasvalueinfofield', "The Text will be binded to a property directly", "dictionaryform")}
                            trigger={<label>{this.getLocalValue('textasvaluefield', 'Text as Value', "dictionaryform")}</label>}
                        />} checked={data.textAsValue } onChange={handleChange} />
                    </Form.Group>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onChange', 'onDataReceived'];
    }
}
