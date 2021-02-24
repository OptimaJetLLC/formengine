import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class CollectionEditorEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const columns = [
            { key: 'key', name: this.getLocalValue('keycolumn', 'Key', 'collectioneditorform') },
            { key: 'name', name: this.getLocalValue('namecolumn', 'Name', 'collectioneditorform') },
            {
                key: 'control',
                name: this.getLocalValue('controlcolumn', 'Control', 'collectioneditorform'),
                dataList: ['input', 'checkbox', 'span', 'number', 'file', 'camera', 'signature', 'date', 'datetime', 'custom']
            },
            { key: 'width', name: this.getLocalValue('widthcolumn', 'Width', 'collectioneditorform') }
        ];

        return (<Form>
            <Form.Group widths="equal">
                <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'collectioneditorform')}
                            value={data.key} onChange={handleChange}/>
                <Form.Input name="idField" label={this.getLocalValue('idfield', 'Id field', 'collectioneditorform')}
                            value={data.idField} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
                <div className="field">
                    <label>{this.getLocalValue('optionsfield', 'Options', 'collectioneditorform')}</label>
                    <Form.Group>
                        <Form.Checkbox name="readOnly"
                                       label={this.getLocalValue('readonlyfield', 'ReadOnly', 'collectioneditorform')}
                                       checked={data.readOnly} onChange={handleChange}/>
                        <Form.Checkbox name="draggable"
                                       label={this.getLocalValue('draggablefield', 'Draggable', 'collectioneditorform')}
                                       checked={data.draggable} onChange={handleChange}/>
                        <Form.Checkbox name="hierarchical" label={this.getLocalValue(
                            'hierarchicalfield',
                            'Hierarchical',
                            'collectioneditorform'
                        )} checked={data.hierarchical} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Checkbox name="disableAdd"
                                       label={this.getLocalValue('disableAdd', 'Disable Add', 'collectioneditorform')}
                                       checked={data.disableAdd} onChange={handleChange}/>
                        <Form.Checkbox name="disableCopy"
                                       label={this.getLocalValue('disableCopy', 'Disable Copy', 'collectioneditorform')}
                                       checked={data.disableCopy} onChange={handleChange}/>
                        <Form.Checkbox name="disableDelete"
                                       label={this.getLocalValue('disableDelete', 'Disable Delete', 'collectioneditorform')}
                                       checked={data.disableDelete} onChange={handleChange}/>
                        <Form.Checkbox name="collapseAll" label={this.getLocalValue(
                            'collapseallfield',
                            'Collapse all',
                            'collectioneditorform'
                        )} disabled={data.hierarchical != true} checked={data.collapseAll} onChange={handleChange}/>
                    </Form.Group>
                </div>
                <div className="field">
                    <Form.Input name="parentIdField"
                                label={this.getLocalValue('parentidfield', 'ParentId field', 'collectioneditorform')}
                                disabled={!data.hierarchical || data.childrenField} value={data.parentIdField}
                                onChange={handleChange}/>
                    <Form.Input name="childrenField"
                                label={this.getLocalValue('childrenField', 'Children field', 'collectioneditorform')}
                                disabled={!data.hierarchical || data.parentIdField} value={data.childrenField}
                                onChange={handleChange}/>
                </div>
            </Form.Group>
            <CollectionEditor key="columns"
                              draggable={true}
                              columns={columns}
                              label={this.getLocalValue('columnsfield', 'Columns', 'collectioneditorform')}
                              name="columns"
                              value={data['columns']}
                              height="200px"
                              onChange={handleChange}/>
        </Form>);
    }

    getEventsList() {
        return ['onChange', 'onAdd', 'onDelete', 'onCopy'];
    }
}
