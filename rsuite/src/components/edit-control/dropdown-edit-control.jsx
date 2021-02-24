import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor, isDefined } from 'optimajet-builder-shared';

export default class DropdownEditControl extends BaseEditControl {

    constructor(props) {
        super(props);

        this.state.defaultValuePreferInt = true;
    }

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);
        const dataelementsChange = function (e, { name, value }) {
            if (Array.isArray(value)) {
                value.forEach(e => {
                    if (isDefined(e.value) && isDefined(e.value.match) && e.value.match(/^-?\d+$/)) {
                        e.value = parseInt(e.value);
                    }
                });
            }

            handleChange(e, { name, value });
        };

        const dataColumns = [
            { key: 'value', name: this.getLocalValue('datavaluecolumn', 'Value', 'dropdownform') },
            { key: 'text', name: this.getLocalValue('datatextcolumn', 'Text', 'dropdownform') }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'dropdownform')} value={data.key}
                            onChange={handleChange}/>
                <Form.Input name="label" label={this.getLocalValue('labelfield', 'Label', 'dropdownform')}
                            value={data.label} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <CollectionEditor key="data-elements"
                                  draggable={true}
                                  columns={dataColumns}
                                  label={this.getLocalValue('datafield', 'Data', 'dropdownform')}
                                  name="data-elements"
                                  value={data['data-elements']}
                                  onChange={dataelementsChange}/>
                <div className="field">
                    <Form.Input name="placeholder" label="Placeholder" value={data.placeholder}
                                onChange={handleChange}/>
                    <div className="field">
                        <label>{this.getLocalValue('optionsfield', 'Options', 'dropdownform')}</label>
                        <Form.Group>
                            <Form.Checkbox name="multiple"
                                           label={this.getLocalValue('multiplefield', 'Multiple', 'dropdownform')}
                                           checked={data.multiple} onChange={handleChange}/>
                            <Form.Checkbox name="search"
                                           label={this.getLocalValue('searchfield', 'Search', 'dropdownform')}
                                           checked={data.search} onChange={handleChange}/>
                            <Form.Checkbox name="allowAddItems" label={this.getLocalValue(
                                'allowAddItemsfield',
                                'Allow add items',
                                'dropdownform'
                            )} disabled={!(data.search && data.multiple)} checked={data.allowAddItems}
                                           onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Checkbox name="clearable" label={this.getLocalValue('clearablefield', 'Clearable')}
                                           checked={data.clearable} onChange={handleChange}/>
                            <Form.Checkbox name="disabled"
                                           label={this.getLocalValue('disabledfield', 'Disabled', 'dropdownform')}
                                           checked={data.disabled} onChange={handleChange}/>
                            <Form.Checkbox name="fluid"
                                           label={this.getLocalValue('fluidfield', 'Fluid', 'dropdownform')}
                                           checked={data.fluid} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Checkbox name="selection"
                                           label={this.getLocalValue('selectionfield', 'Selection', 'dropdownform')}
                                           checked={data.selection} onChange={handleChange}/>
                            <Form.Checkbox name="readOnly"
                                           label={this.getLocalValue('readonlyfield', 'Read only', 'dropdownform')}
                                           checked={data.readOnly} onChange={handleChange}/>
                        </Form.Group>
                    </div>
                </div>
            </Form.Group>
        </Form>);
    }

    getEventsList() {
        return ['onClick', 'onChange'];
    }
}
