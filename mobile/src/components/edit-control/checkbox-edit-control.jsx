import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class CheckboxEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const data = this.props.data;
        return (<View>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'checkboxform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('labelfield', 'Label', 'checkboxform')}
                            value={data.label} onChange={handleChange('label')}/>
            </Row>
            <View style={builderStyles.formGroupEqual}>
                <View>
                    <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'checkboxform')}</DWKitLabel>
                    <View>
                        <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'ReadOnly', 'checkboxform')}
                                       checked={data.readOnly} onChange={handleChange('readOnly')}/>
                    </View>
                    <View>
                        <DWKitCheckBox label={this.getLocalValue('disabledfield', 'Disabled', 'checkboxform')}
                                       checked={data.disabled} onChange={handleChange('disabled')}/>
                        <DWKitCheckBox label={this.getLocalValue('togglefield', 'Toggle', 'checkboxform')}
                                       checked={data.toggle} onChange={handleChange('toggle')}/>
                    </View>
                </View>
            </View>
        </View>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
