import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { isUndefined } from 'optimajet-builder-shared';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';

export default class DropdownTriggerEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const columns = [
            { key: 'target', name: this.getLocalValue('itemstargetcolumn', 'Target', 'dropdowntriggerform') },
            { key: 'title', name: this.getLocalValue('itemstitlecolumn', 'Title', 'dropdowntriggerform') },
            {
                key: 'visibleCondition',
                name: this.getLocalValue('itemsvisibleconditioncolumn', 'Visible Condition', 'dropdowntriggerform')
            }
        ];

        return (<View>
            <DWKitInput label={this.getLocalValue('namefield', 'Name', 'dropdowntriggerform')}
                        value={data.key} onChange={handleChange('key')}/>
            <DWKitInput label={this.getLocalValue('defaultvaluefield', 'Default Value', 'dropdowntriggerform')}
                        value={isUndefined(data.defaultValue) ? '' : data.defaultValue}
                        onChange={handleChange('defaultValue')}/>
            <DWKitInput label={this.getLocalValue('imageurlfield', 'ImageUrl', 'dropdowntriggerform')}
                        value={isUndefined(data.imageUrl) ? '' : data.imageUrl} onChange={handleChange('imageUrl')}/>
            {/*todo implement*/}
            {/*<CollectionEditor key="items"*/}
            {/*                  draggable={true}*/}
            {/*                  columns={columns}*/}
            {/*                  label={this.getLocalValue('itemsfield', 'Items', 'dropdowntriggerform')}*/}
            {/*                  name="items"*/}
            {/*                  value={data['items']}*/}
            {/*                  onChange={handleChange}/>*/}
        </View>);
    }

    getEventsList() {
        return ['onItemClick'];
    }
}
