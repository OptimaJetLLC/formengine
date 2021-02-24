import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import builderStyles from '../../builder-styles';
import DWKitRadioGroup from './dwkit/dwkit-radio-group.jsx';
import DWKitDropdown from './dwkit/dwkit-dropdown.jsx';
import { Icon } from 'react-native-elements';
import { Label } from '../renderer/label.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class ButtonEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        const sizeData = [
            { text: this.getLocalValue('sizedefault', 'Default'), value: '' },
            { text: this.getLocalValue('sizemini', 'Mini'), value: 'mini' },
            { text: this.getLocalValue('sizetiny', 'Tiny'), value: 'tiny' },
            { text: this.getLocalValue('sizesmall', 'Small'), value: 'small' },
            { text: this.getLocalValue('sizemedium', 'Medium'), value: 'medium' },
            { text: this.getLocalValue('sizebig', 'Big'), value: 'big' },
            { text: this.getLocalValue('sizelarge', 'Large'), value: 'large' },
            { text: this.getLocalValue('sizehuge', 'Huge'), value: 'huge' },
            { text: this.getLocalValue('sizemassive', 'Massive'), value: 'massive' }
        ];

        const floatedTypeItems = [
            { value: 'flex-start', label: this.getLocalValue('floatedleftfield', 'Left', 'buttonform') },            
            { value: 'center', label: this.getLocalValue('floatedcenterfield', 'Center', 'buttonform') },
            { value: 'flex-end', label: this.getLocalValue('floatedrightfield', 'Right', 'buttonform') },
        ];
        let floatedTypeValue = data.floated ? data.floated : 'flex-start';

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'buttonform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('iconfield', 'Icon', 'buttonform')} value={data.icon}
                            onChange={handleChange('icon')}
                            rightIcon={<Icon name='question' type='font-awesome'
                                             onPress={() => window.open(
                                                 'https://oblador.github.io/react-native-vector-icons/')}/>}
                />
            </Row>
            <Row>
                <DWKitInput label={this.getLocalValue('contentfield', 'Content', 'buttonform')}
                            value={data.content} onChange={handleChange('content')}/>
                <DWKitDropdown options={sizeData} placeholder="Default"
                               label={this.getLocalValue('sizefield', 'Size', 'buttonform')} value={data.size}
                               onChange={handleChange('size')}/>
            </Row>
            <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 40}}>
                    {/*todo remove unused styles*/}
                    <DWKitRadioGroup label={this.getLocalValue('floatedfield', 'Floated', 'buttonform')}
                                        items={floatedTypeItems} selectedValue={floatedTypeValue}
                                        onChange={handleChange('floated')} style={{flexDirection: 'row', flexGrow: 0.5}}/>
                    {/*<Form.Radio name="floated"*/}
                    {/*            label={this.getLocalValue('floateddefaultfield', 'Default', 'buttonform')} value=''*/}
                    {/*            checked={data.floated === undefined || data.floated === ''}*/}
                    {/*            onChange={handleChange}/>*/}
                    {/*<Form.Radio name="floated" label={this.getLocalValue('floatedleftfield', 'Left', 'buttonform')}*/}
                    {/*            value='left' checked={data.floated === 'left'} onChange={handleChange}/>*/}
                    {/*<Form.Radio name="floated"*/}
                    {/*            label={this.getLocalValue('floatedrightfield', 'Right', 'buttonform')} value='right'*/}
                    {/*            checked={data.floated === 'right'} onChange={handleChange}/>*/}
                </View>
                <View>
                    <Label>{this.getLocalValue('optionsfield', 'Options', 'buttonform')}</Label>
                    <View style={{flexDirection: 'row', flexGrow: 0.5}}>
                        <DWKitCheckBox label={this.getLocalValue('basicfield', 'Basic', 'buttonform')}
                                        checked={data.basic} onChange={handleChange('basic')}/>
                        <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'buttonform')}
                                        checked={data.disabled} onChange={handleChange('disabled')}/>
                        <DWKitCheckBox label={this.getLocalValue('fluidfield', 'Fluid', 'buttonform')}
                                        checked={data.fluid} onChange={handleChange('fluid')}/>
                        <DWKitCheckBox label={this.getLocalValue('primaryfield', 'Primary', 'buttonform')}
                                        checked={data.primary} onChange={handleChange('primary')}/>
                        <DWKitCheckBox label={this.getLocalValue('secondaryfield', 'Secondary', 'buttonform')}
                                        checked={data.secondary} onChange={handleChange('secondary')}/>
                    </View>
                </View>
            </View>
        </Column>);
    }

    getEventsList() {
        return ['onClick'];
    }
}
