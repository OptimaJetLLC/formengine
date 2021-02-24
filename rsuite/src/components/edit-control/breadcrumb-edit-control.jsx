import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class BreadcrumbEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const columns = [
            { key: 'text', name: this.getLocalValue('itemstextcolumn', 'Text', 'breadcrumbform') },
            { key: 'url', name: this.getLocalValue('itemsurlcolumn', 'Url', 'breadcrumbform') }           
        ];
        return (<Form>
            <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'breadcrumbform')}
                            value={data.key} onChange={handleChange}/>
            <Form.Input name="separator" label={this.getLocalValue('separatorfield', 'Separator', 'breadcrumbform')}
                            value={data.separator} onChange={handleChange}/>
            <CollectionEditor key="items"
                              draggable={true}
                              columns={columns}
                              label={this.getLocalValue('itemsfield', 'Items', 'breadcrumbform')}
                              name="items"
                              value={data['items']}
                              onChange={handleChange}/>
        </Form>);
    }

    getEventsList() {
        return ['onItemClick'];
    }
}
