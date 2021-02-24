import React from 'react';
import BaseEditControl from './base-edit-control';
import { Form } from 'semantic-ui-react';
import { CollectionEditor, isUndefined } from 'optimajet-builder-shared';

export default class DropdownTriggerEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const columns = [
            { key: 'target', name: this.getLocalValue('itemstargetcolumn', 'Target', 'dropdowntriggerform') },
            { key: 'title', name: this.getLocalValue('itemstitlecolumn', 'Title', 'dropdowntriggerform') },
            {
                key: 'visibleCondition',
                name: this.getLocalValue('itemsvisibleconditioncolumn', 'Visible Condition', 'dropdowntriggerform')
            }
        ];

        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'dropdowntriggerform')}
                        value={data.key} onChange={handleChange}/>
            <Form.Input name="defaultValue"
                        label={this.getLocalValue('defaultvaluefield', 'Default Value', 'dropdowntriggerform')}
                        value={isUndefined(data.defaultValue) ? '' : data.defaultValue} onChange={handleChange}/>
            <Form.Input name="imageUrl" label={this.getLocalValue('imageurlfield', 'ImageUrl', 'dropdowntriggerform')}
                        value={isUndefined(data.imageUrl) ? '' : data.imageUrl} onChange={handleChange}/>
            <CollectionEditor key="items"
                              draggable={true}
                              columns={columns}
                              label={this.getLocalValue('itemsfield', 'Items', 'dropdowntriggerform')}
                              name="items"
                              value={data['items']}
                              onChange={handleChange}/>
        </Form>);
    }

    getEventsList() {
        return ['onItemClick'];
    }
}
