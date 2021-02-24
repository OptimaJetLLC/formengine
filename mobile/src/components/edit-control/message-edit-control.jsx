import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import builderStyles from '../../builder-styles';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class MessageEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;

        const sizeData = [
            // { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            // { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            // { text: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
            // { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' }
        ];

        return (
            <Column>
                <Row>
                    <DWKitInput label={this.getLocalValue('namefield', 'Name', 'messageform')}
                                value={data.key} onChange={handleChange('key')}/>
                    <DWKitInput label={this.getLocalValue('headerfield', 'Header', 'messageform')}
                                value={data.header} onChange={handleChange('header')}/>
                    <DWKitDropdown options={sizeData} placeholder={sizeData[0].text}
                                label={this.getLocalValue('sizefield', 'Size', 'messageform')} value={data.size}
                                onValueChange={handleChange('size')}/>
                </Row>
                <DWKitTextArea label={this.getLocalValue('contentfield', 'Content', 'messageform')}
                                value={data.content} onChangeText={handleChange('content')}/>
                <View>
                    <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'messageform')}</DWKitLabel>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <DWKitCheckBox label={this.getLocalValue('floatingfield', 'Floating', 'messageform')}
                                        checked={data.floating} onChange={handleChange('floating')}/>
                            <DWKitCheckBox label={this.getLocalValue('fluidfield', 'Fluid', 'messageform')}
                                        checked={data.fluid} onChange={handleChange('fluid')}/>
                        </View>
                        <View>
                            <DWKitCheckBox label={this.getLocalValue('negativefield', 'Negative', 'messageform')}
                                        checked={data.negative} onChange={handleChange('negative')}/>
                            <DWKitCheckBox label={this.getLocalValue('positivefield', 'Positive', 'messageform')}
                                        checked={data.positive} onChange={handleChange('positive')}/>
                        </View>
                        <View>
                            <DWKitCheckBox label={this.getLocalValue('successfield', 'Success', 'messageform')}
                                        checked={data.success} onChange={handleChange('success')}/>
                            <DWKitCheckBox label={this.getLocalValue('warningfield', 'Warning', 'messageform')}
                                        checked={data.warning} onChange={handleChange('warning')}/>
                        </View>
                        <View>                        
                            <DWKitCheckBox label={this.getLocalValue('infofield', 'Info', 'messageform')}
                                        checked={data.info} onChange={handleChange('info')}/>
                            <DWKitCheckBox label={this.getLocalValue('errorfield', 'Error', 'messageform')}
                                        checked={data.error} onChange={handleChange('error')}/>
                        </View>
                    </View>
                    
                </View>
            </Column>
        );
    }
}
