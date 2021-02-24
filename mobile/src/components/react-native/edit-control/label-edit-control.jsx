import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import builderStyles from '../../../builder-styles';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class LabelEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;

        const sizeData = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { text: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
            { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' }
        ];

        /*
                const attachedData = [
                    { text: this.getLocalValue('attachednone', 'None'), value: '' },
                    { text: this.getLocalValue('attachedtop', 'Top'), value: 'top' },
                    { text: this.getLocalValue('attachedbottom', 'Bottom'), value: 'bottom' },
                    { text: this.getLocalValue('attachedtopright', 'Top right'), value: 'top right' },
                    { text: this.getLocalValue('attachedtopleft', 'Top left'), value: 'top left' },
                    { text: this.getLocalValue('attachedbottomleft', 'Bottom left'), value: 'bottom left' },
                    { text: this.getLocalValue('attachedbottomright', 'Bottom right'), value: 'bottom right' }
                ];
        */

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'labelform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('contentfield', 'Content', 'labelform')}
                            value={data.content} onChange={handleChange('content')}/>
                <DWKitDropdown options={sizeData} placeholder="Default"
                            label={this.getLocalValue('sizefield', 'Size', 'labelform')} value={data.size}
                            onChange={handleChange('size')}/>
                {/*
                <DWKitDropdown options={attachedData} placeholder={attachedData[0].text}
                               label={this.getLocalValue('attachedfield', 'Attached', 'labelform')}
                               value={data.attached} onChange={handleChange('attached')}/>
                */}
            </Row>
            <View>
                <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'labelform')}</DWKitLabel>
                <View>
                    <DWKitCheckBox label={this.getLocalValue('basicfield', 'Basic', 'labelform')}
                                    checked={data.basic} onChange={handleChange('basic')}/>
                    <DWKitCheckBox label={this.getLocalValue('circularfield', 'Circular', 'labelform')}
                                    checked={data.circular} onChange={handleChange('circular')}/>
                    {/*
                    <DWKitCheckBox label={this.getLocalValue('cornerfield', 'Corner', 'labelform')}
                                    checked={data.corner} onChange={handleChange('corner')}/>
                </View>
                <View>
                    <DWKitCheckBox label={this.getLocalValue('floatingfield', 'Floating', 'labelform')}
                                    checked={data.floating} onChange={handleChange('floating')}/>
                    <DWKitCheckBox label={this.getLocalValue('pointingfield', 'Pointing', 'labelform')}
                                    checked={data.pointing} onChange={handleChange('pointing')}/>
                    */}
                </View>
            </View>
        </Column>);
    }
}
