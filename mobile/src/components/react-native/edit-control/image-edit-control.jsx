import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class ImageEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const floatedTypeItems = [
            { value: 'left', label: this.getLocalValue('floatedleftfield', 'Left', 'imageform') },
            { value: 'center', label: this.getLocalValue('floatedcenterfield', 'Center', 'imageform') },
            { value: 'right', label: this.getLocalValue('floatedrightfield', 'Right', 'imageform') },
        ];
        let floatedTypeValue = data.floated ? data.floated : 'center';

        const verticalAlignTypeItems = [
            { value: 'top', label: this.getLocalValue('verticalaligntopfield', 'Top', 'imageform') },
            { value: 'middle', label: this.getLocalValue('verticalalignmiddlefield', 'Middle', 'imageform') },
            { value: 'bottom', label: this.getLocalValue('verticalalignbottomfield', 'Bottom', 'imageform') },
        ];
        let verticalAlignTypeValue = data.verticalAlign ? data.verticalAlign : 'top';

        return (
            <Column>
                <Row>
                    <DWKitInput label={this.getLocalValue('namefield', 'Name', 'imageform')} value={data.key}
                                onChange={handleChange('key')}/>
                    <DWKitInput label={this.getLocalValue('srcfield', 'Src', 'imageform')} value={data.src}
                                onChange={handleChange('src')}/>
                    <DWKitInput label={this.getLocalValue('hreffield', 'Href', 'imageform')}
                                value={data.href} onChange={handleChange('href')}/>
                </Row>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 40}}>
                        <DWKitRadioGroup label={this.getLocalValue('floatedfield', 'Floated', 'imageform')}
                                    items={floatedTypeItems} selectedValue={floatedTypeValue}
                                    onChange={handleChange('floated')}/>
                    </View>
                    <View style={{marginRight: 40}}>
                         <DWKitRadioGroup label={this.getLocalValue('verticalalignfield', 'Vertical align', 'imageform')}
                                    items={verticalAlignTypeItems} selectedValue={verticalAlignTypeValue}
                                    onChange={handleChange('verticalAlign')}/>
                    </View>
                    <View>
                        <DWKitLabel style={{marginBottom: 4}}>{this.getLocalValue('optionsfield', 'Options', 'imageform')}</DWKitLabel>
                        <View>
                            <DWKitCheckBox label={this.getLocalValue('avatarfield', 'Avatar', 'imageform')}
                                        checked={data.avatar} onChange={handleChange('avatar')}/>
                            <DWKitCheckBox label={this.getLocalValue('borderedfield', 'Bordered', 'imageform')}
                                        checked={data.bordered} onChange={handleChange('bordered')}/>
                        </View>
                        {/*
                        <View>
                            <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'imageform')}
                                        checked={data.disabled} onChange={handleChange('disabled')}/>
                            <DWKitCheckBox label={this.getLocalValue('inlinefield', 'Inline', 'imageform')}
                                        checked={data.inline} onChange={handleChange('inline')}/>
                            <DWKitCheckBox label={this.getLocalValue('spacedfield', 'Spaced', 'imageform')}
                                        checked={data.spaced} onChange={handleChange('spaced')}/>
                        </View>
                        */}
                    </View>
                </View>
            </Column>
        );
    }
}
