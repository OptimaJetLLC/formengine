import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class CustomEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        return (<View>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'customform')} value={data.key}
                            onChange={handleChange('key')}/>
                <DWKitInput label={this.getLocalValue('typefield', 'Control type', 'customform')}
                            value={data.type} onChange={handleChange('type')}/>
            </Row>
            <Row>
                <DWKitTextArea label={this.getLocalValue('propsfield', 'Props', 'customform')} flex={1}
                               value={data['props']} onChange={handleChange('props')} rows={5}/>
                <DWKitTextArea label={this.getLocalValue('childrenfield', 'Children', 'customform')} flex={1}
                               value={data['children']} onChange={handleChange('children')} rows={5}/>
            </Row>
        </View>);
    }
}
