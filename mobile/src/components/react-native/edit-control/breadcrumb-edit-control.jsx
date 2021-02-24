import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import builderStyles from '../../../builder-styles';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class BreadcrumbEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleDataChange = this.props.parent.handleChange.bind(this.props.parent);

        const columns = [
            { key: 'text', name: this.getLocalValue('itemstextcolumn', 'Text', 'breadcrumbform') },
            { key: 'url', name: this.getLocalValue('itemsurlcolumn', 'Url', 'breadcrumbform') },
            {
                key: 'active',
                control: 'checkbox',
                name: this.getLocalValue('itemsactivecolumn', 'Active', 'breadcrumbform')
            },
            {
                key: 'divider',
                name: this.getLocalValue('itemsiconcolumn', 'Divider Icon', 'breadcrumbform'),
                dataList: ['angle-right', 'chevron-right']
            }
        ];
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'breadcrumbform')}
                            value={data.key} onChange={handleChange('key')}/>
            </View>
            <CollectionEditor key="items"
                              draggable={true}
                              columns={columns}
                              label={this.getLocalValue('itemsfield', 'Items', 'breadcrumbform')}
                              name="items"
                              value={data['items']}
                              onChange={handleDataChange}/>
        </View>);
    }

    getEventsList() {
        return ['onItemClick'];
    }
}
