import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class MenuEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleDataChange = this.props.parent.handleChange.bind(this.props.parent);

        const columns = [
            { key: 'target', name: this.getLocalValue('itemstargetcolumn', 'Target', 'menuform'), width: 150 },
            { key: 'title', name: this.getLocalValue('itemstitlecolumn', 'Title', 'menuform') },
            {
                key: 'visibleCondition',
                name: this.getLocalValue('visibleConditioncolumn', 'Visible Condition', 'menuform')
            }
        ];
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'menuform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('activeitemfield', 'Active Item', 'menuform')}
                            value={data.activeItem} onChange={handleChange('activeItem')}/>
            </View>
            <View>
                {/*todo remove unsupported styles*/}
                <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'menuform')}</DWKitLabel>
                <View>
                    <DWKitCheckBox label={this.getLocalValue('pointingfield', 'Pointing', 'menuform')}
                                   checked={data.pointing} onChange={handleChange('pointing')}/>
                    <DWKitCheckBox label={this.getLocalValue('secondaryfield', 'Secondary', 'menuform')}
                                   checked={data.secondary} onChange={handleChange('secondary')}/>
                    <DWKitCheckBox label={this.getLocalValue('tabularfield', 'Tabular', 'menuform')}
                                   checked={data.tabular} onChange={handleChange('tabular')}/>
                    <DWKitCheckBox label={this.getLocalValue('fluidfield', 'Fluid', 'menuform')}
                                   checked={data.fluid} onChange={handleChange('fluid')}/>
                    <DWKitCheckBox label={this.getLocalValue('verticalfield', 'Vertical', 'menuform')}
                                   checked={data.vertical} onChange={handleChange('vertical')}/>
                    <DWKitCheckBox label={this.getLocalValue('linkfield', 'Link', 'menuform')}
                                   checked={data.link} onChange={handleChange('link')}/>
                </View>
            </View>
            <CollectionEditor key="items"
                              draggable={true}
                              hierarchical={true}
                              childrenField="children"
                              columns={columns}
                              label={this.getLocalValue('itemsfield', 'Items', 'menuform')}
                              name="items"
                              value={data['items']}
                              onChange={handleDataChange}/>
        </View>);
    }

    getEventsList() {
        return ['onItemClick'];
    }
}
