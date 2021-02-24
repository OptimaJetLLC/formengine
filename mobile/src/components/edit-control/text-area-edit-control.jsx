import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitLabel from './dwkit/dwkit-label.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class TextAreaEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleIntChange = this.props.parent.handleIntChange.bind(this.props.parent);

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'textareaform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('labelfield', 'Label', 'textareaform')}
                            value={data.label} onChange={handleChange('label')}/>
            </Row>
            <Row>
                <DWKitInput placeholder="3" type="number"
                            label={this.getLocalValue('rowsfield', 'Rows', 'textareaform')} value={data.rows}
                            onChange={handleIntChange('rows', true)}/>
                <DWKitInput label={this.getLocalValue('placeholderfield', 'Placeholder', 'textareaform')}
                            value={data.placeholder} onChange={handleChange('placeholder')}/>
            </Row>
            <View>
                <DWKitLabel>{this.getLocalValue('optionsfield', 'Options', 'textareaform')}</DWKitLabel>
                <DWKitCheckBox label={this.getLocalValue('readonlyfield', 'Read only', 'textareaform')}
                               checked={data.readOnly} onChange={handleChange('readOnly')}/>
            </View>
        </Column>);
    }

    getEventsList() {
        return ['onChange'];
    }
}
