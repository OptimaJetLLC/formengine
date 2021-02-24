import React from 'react';
import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import DWKitTextArea from '../dwkit/dwkit-textarea.jsx';

export default class RnTextEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);
        return (<View>
            <DWKitTextArea numberOfLines={6} label={this.getLocalValue('contentfield', 'Content', this.getFormName())}
                           value={data.content} onChange={handleChange('content')}/>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('allowFontScaling')}
                {propertyEditor.drawProperty('dataDetectorType')}
                {propertyEditor.drawProperty('disabled')}
                {propertyEditor.drawProperty('ellipsizeMode')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('numberOfLines')}
                {propertyEditor.drawProperty('maxFontSizeMultiplier')}
                {propertyEditor.drawProperty('selectable')}
                {propertyEditor.drawProperty('selectionColor')}
            </View>
        </View>);
    }

}
