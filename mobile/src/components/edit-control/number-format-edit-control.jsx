import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import DWKitInput from './dwkit/dwkit-input.jsx';
import builderStyles from '../../builder-styles';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';
export default class NumberFormatEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;

        const keyboardTypes = [
            { text: this.getLocalValue('keyboardTypesDefault', 'Default'), value: 'default' },
            { text: this.getLocalValue('keyboardTypesNumber-pad', 'Number-pad'), value: 'number-pad' },
            { text: this.getLocalValue('keyboardTypesDecimal-pad', 'Decimal-pad'), value: 'decimal-pad' },
            { text: this.getLocalValue('keyboardTypesNumeric', 'Numeric'), value: 'numeric' },
            { text: this.getLocalValue('keyboardTypesPhone-pad', 'Phone-pad'), value: 'phone-pad' },
        ];

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'inputform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('labelfield', 'Label', 'inputform')}
                            value={data.label} onChange={handleChange('label')}/>
                <DWKitInput label={this.getLocalValue('placeholderfield', 'Placeholder', 'inputform')}
                            value={data.placeholder} onChange={handleChange('placeholder')}/>
            </Row>
            <Row>
                <DWKitInput label={this.getLocalValue('formatfield', 'Format', 'inputform')}
                            value={data.format} onChange={handleChange('format')}/>
                <DWKitInput disabled={!Boolean(data.format)}
                            label={this.getLocalValue('maskfield', 'Mask', 'inputform')} value={data.mask}
                            onChange={handleChange('mask')}/>
            </Row>
            <Row>
                <DWKitInput disabled={Boolean(data.format)}
                            label={this.getLocalValue('prefixfield', 'Prefix', 'inputform')} value={data.prefix}
                            onChange={handleChange('prefix')}/>
                <DWKitInput disabled={Boolean(data.format)}
                            label={this.getLocalValue('suffixfield', 'Suffix', 'inputform')} value={data.suffix}
                            onChange={handleChange('suffix')}/>
            </Row>
            <Row>
                <View style={{flexGrow: 0}}>
                    <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'inputform')}</DWKitLabel>
                    <View style={builderStyles.formGroupEqual}>
                        <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'inputform')}
                                    checked={data.disabled} onChange={handleChange('disabled')}/>
                        {/* <DWKitCheckBox label={this.getLocalValue('transparentfield', 'Transparent', 'inputform')} //todo
                                    checked={data.transparent} onChange={handleChange('transparent')}/> */}
                        <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'inputform')}
                                    checked={data.readOnly} onChange={handleChange('readOnly')}/>
                        <DWKitCheckBox label={this.getLocalValue('thousandSeparatorfield', 'Thousand Separator', 'inputform')}
                                    checked={data.thousandSeparator} onChange={handleChange('thousandSeparator')}/>
                    </View>
                </View>
                <DWKitDropdown options={keyboardTypes} placeholder={keyboardTypes[1].text}
                                label={this.getLocalValue('keyboardtypefield', 'Keyboard type', 'inputform')} value={data.keyboardType}
                                onChange={handleChange('keyboardType')}  style={{flexGrow: 1}}/>
            </Row>

            <Text>Read the <a target="_blank" href="https://www.npmjs.com/package/react-number-format">documentation</a> for more info about format options</Text>
        </Column>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
