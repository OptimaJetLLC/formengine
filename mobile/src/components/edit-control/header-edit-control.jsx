import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import builderStyles from '../../builder-styles';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import DWKitInput from './dwkit/dwkit-input.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class HeaderEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const sizeData = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { text: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
            { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' }
        ];

        const textAlignGroup = [
            { value: 'left', label: this.getLocalValue('textalignleft', 'Left', 'headerform') },
            { value: 'center', label: this.getLocalValue('textaligncenter', 'Center', 'headerform') },
            { value: 'right', label: this.getLocalValue('textalignright', 'Right', 'headerform') },
        ];

        return (<View>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'headerform')}
                            value={data.key} onChange={handleChange('key')} style={{flexGrow: 0.5}}/>
                <DWKitDropdown options={sizeData} placeholder='Default'
                               label={this.getLocalValue('sizefield', 'Size', 'header')}
                               value={data.size} onChange={handleChange('size')} style={{flexGrow: 0.5}}/>
                <DWKitRadioGroup label={this.getLocalValue('textalignfield', 'Text Align', 'headerform')}
                    items={textAlignGroup} selectedValue={data.textAlign} style={{flexDirection: 'row', flexGrow: 0.5}}
                    onChange={handleChange('textAlign')}/>
            </Row>
            <View style={builderStyles.formGroupEqual}>
                <DWKitTextArea label={this.getLocalValue('contentfield', 'Content', 'headerform')}
                               value={data.content} onChange={handleChange('content')} flex={1}/>
            </View>
            <DWKitInput label={this.getLocalValue('subheaderfield', 'Subheader', 'headerform')}
                        value={data.subheader} onChange={handleChange('subheader')}/>
        </View>);
    }
}
