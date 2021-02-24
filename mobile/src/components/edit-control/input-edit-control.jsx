import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class InputEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;

        const inputTypeItems = [
            { value: 'text', text: this.getLocalValue('typetext', 'Text', 'inputform') },
            { value: 'number', text: this.getLocalValue('typenumber', 'Number', 'inputform') },
            { value: 'password', text: this.getLocalValue('typepasswod', 'Password', 'inputform') },
            // { value: 'file', text: this.getLocalValue('typefile', 'File', 'inputform') }, //todo
            { value: 'date', text: this.getLocalValue('typedate', 'Date', 'inputform') },
            { value: 'time', text: this.getLocalValue('typetime', 'Time', 'inputform') },
            { value: 'datetime', text: this.getLocalValue('typedatetime', 'Date Time', 'inputform') },
        ];
        let inputTypeValue = data.type ? data.type : 'text';

        const sizeData = [
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
        ];

        // const labelPositions = [
        //     { text: this.getLocalValue('labeldefault', 'Default'), value: '' },
        //     { text: this.getLocalValue('labelleft', 'Left'), value: 'left' },
        //     { text: this.getLocalValue('labelright', 'Right'), value: 'right' },
        //     { text: this.getLocalValue('labelleftcorner', 'Left corner'), value: 'left corner' },
        //     { text: this.getLocalValue('labelrightcorner', 'Right corner'), value: 'right corner' }
        // ];

        const keyboardTypes = [
            { text: this.getLocalValue('keyboardTypesDefault', 'Default'), value: 'default' },
            { text: this.getLocalValue('keyboardTypesEmail-address', 'Email address'), value: 'email-address' },
            { text: this.getLocalValue('keyboardTypesNumbers-and-punctuation', 'Numbers And Punctuation'), value: 'numbers-and-punctuation' },
            { text: this.getLocalValue('keyboardTypesUrl', 'Url'), value: 'url' },
            { text: this.getLocalValue('keyboardTypesName-phone-pad', 'Name Phone Pad'), value: 'name-phone-pad' },
            { text: this.getLocalValue('keyboardTypesWeb-search', 'Web search'), value: 'web-search' },
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
                <DWKitDropdown label={this.getLocalValue('typefield', 'Type', 'inputform')}
                                options={inputTypeItems}  placeholder={inputTypeValue} value={inputTypeValue}
                                onChange={handleChange('type')}/>
                <DWKitDropdown options={sizeData} placeholder={sizeData[0].text}
                            label={this.getLocalValue('sizefield', 'Size', 'inputform')} value={data.size}
                            onChange={handleChange('size')}/>
                            
                {/* <DWKitDropdown placeholder={labelPositions[0].text} //todo
                            options={labelPositions}
                            label={this.getLocalValue('labelpositionfield', 'Label position', 'inputform')}
                            value={data.labelPosition} onChange={handleChange('labelPosition')}/> */}
            </Row>
            <Row>  
                <View style={{flexGrow: 0}}>           
                    <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'labelform')}</DWKitLabel>
                    <View style={builderStyles.formGroupEqual}>
                        <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'inputform')}
                                    checked={data.disabled} onChange={handleChange('disabled')}/>
                        {/* <DWKitCheckBox label={this.getLocalValue('transparentfield', 'Transparent', 'inputform')}
                                    checked={data.transparent} onChange={handleChange('transparent')}/> */}
                        <DWKitCheckBox label={this.getLocalValue('fluidfield', 'Fluid', 'inputform')}
                                    checked={data.fluid} onChange={handleChange('fluid')}/>
                        <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'inputform')}
                                    checked={data.readOnly} onChange={handleChange('readOnly')}/>
                    </View>
                </View>
                <DWKitDropdown options={keyboardTypes} placeholder={keyboardTypes[0].text}
                    label={this.getLocalValue('keyboardtypefield', 'Keyboard type', 'inputform')} value={data.keyboardType}
                    onChange={handleChange('keyboardType')}  style={{flexGrow: 1}}/>
            </Row>
        </Column>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
