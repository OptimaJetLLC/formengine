import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import { CollectionEditor } from 'optimajet-builder-shared';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class RadioGroupEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleDataChange = this.props.parent.handleChange.bind(this.props.parent);

        const dataColumns = [
            { key: 'value', name: this.getLocalValue('datavaluecolumn', 'Value', 'radiogroupform') },
            { key: 'text', name: this.getLocalValue('datatextcolumn', 'Text', 'radiogroupform') }
        ];

        const directionTypeItems = [
            { value: 'g', label: this.getLocalValue('directionhorizontalfield', 'Horizontal', 'radiogroupform') },
            { value: 'v', label: this.getLocalValue('directionverticalfield', 'Vertical', 'radiogroupform') },
        ];
        let directionTypeValue = data.direction ? data.direction : 'g';

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'radiogroupform')}
                            value={data.key} onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('labelfield', 'Label', 'radiogroupform')}
                            value={data.label} onChange={handleChange('label')}/>
            </Row>
            {/* <Row> //todo
                    <View style={builderStyles.halfSize}>
                        <DWKitRadioGroup label={this.getLocalValue('groupdirectfield', 'Group direction', 'radiogroupform')}
                                        items={directionTypeItems} selectedValue={directionTypeValue}
                                        onChange={handleChange('direction')} direction='horizontal'/>
                    </View>
            </Row> */}
            <CollectionEditor key="data-elements"
                                  draggable={true}
                                  columns={dataColumns}
                                  label={this.getLocalValue('datafield', 'Data', 'radiogroupform')}
                                  name="data-elements"
                                  value={data['data-elements']}
                                  onChange={handleDataChange}/>
            <View>                
                <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'dropdownform')}</DWKitLabel>
                <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'radiogroupform')}
                            checked={data.readOnly} onChange={handleChange('readOnly')}/>
            </View>
        </Column>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
