import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import { CollectionEditor } from 'optimajet-builder-shared';

export default class StatisticEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleDataChange = this.props.parent.handleChange.bind(this.props.parent);

        const sizeData = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { text: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
            { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' }
        ];

        const dataColumns = [
            { key: 'label', name: this.getLocalValue('datakeycolumn', 'Label', 'statisticform') },
            { key: 'value', name: this.getLocalValue('datavaluecolumn', 'Value', 'statisticform') }
        ];

        return (<View>
            <View style={builderStyles.formGroupEqual}>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'statisticform')} value={data.key}
                            onChange={handleChange('key')}/>
                <View>
                    <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'statisticform')}</DWKitLabel>
                    <View>
                        <DWKitCheckBox label={this.getLocalValue('horizontalfield', 'Horizontal', 'statisticform')}
                                       checked={data.horizontal} onChange={handleChange('horizontal')}/>
                    </View>
                </View>
            </View>
            <View style={builderStyles.formGroupEqual}>
                <CollectionEditor key="data-elements"
                                  columns={dataColumns}
                                  label={this.getLocalValue('datafield', 'Data', 'statisticform')}
                                  name="data-elements"
                                  value={data['data-elements']}
                                  onChange={handleDataChange}/>
                <DWKitDropdown options={sizeData} placeholder={sizeData[0].text}
                               label={this.getLocalValue('sizefield', 'Size', 'statisticform')} value={data.size}
                               onChange={handleChange('size')}/>
            </View>
        </View>);
    }
}
