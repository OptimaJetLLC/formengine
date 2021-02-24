import React from 'react';
import { View } from 'react-native';
import BaseEditControl from './base-edit-control.jsx';
import builderStyles from '../../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class FormEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const sizeData = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
        ];

        return (<View>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'form')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitDropdown options={sizeData} placeholder={sizeData[0].text}
                               label={this.getLocalValue('sizefield', 'Size', 'form')} value={data.size}
                               onChange={handleChange('size')}/>
            </Row>
        </View>);
    }

    getEventsList() {
        return ['onSubmit'];
    }
}
