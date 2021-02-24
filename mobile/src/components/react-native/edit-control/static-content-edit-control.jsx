import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles';
import DWKitInput from './dwkit/dwkit-input.jsx';
import DWKitCheckBox from './dwkit/dwkit-check-box.jsx';
import DWKitTextArea from './dwkit/dwkit-textarea.jsx';
import {Column, Row} from './dwkit/dwkit-item-group.jsx';

export default class StaticContentEditControl extends BaseEditControl {

    getGeneralDescription() {
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        const handleIntChange = this.props.parent.handleIntChange.bind(this.props.parent);
        const data = this.props.data;

        return (<Column>
            <Row>
                <DWKitInput label={this.getLocalValue('namefield', 'Name', 'staticcontentform')}
                            value={data.key} onChange={handleChange('key')}/>
                <DWKitInput name="style-font-size" placeholder="20"
                            label={this.getLocalValue('fontsizefield', 'Font size', 'staticcontentform')}
                            value={data['style-font-size']} onChange={handleIntChange('style-font-size')}/>
            </Row>
            <DWKitTextArea numberOfLines={6} label={this.getLocalValue('contentfield', 'Content', 'staticcontentform')}
                           value={data.content} onChange={handleChange('content')}/>
            <DWKitCheckBox label={this.getLocalValue('allowhtmlfield', 'Allow HTML', 'staticcontentform')}
                           checked={data.isHtml} onChange={handleChange('isHtml')}/>
        </Column>);
    }
}
