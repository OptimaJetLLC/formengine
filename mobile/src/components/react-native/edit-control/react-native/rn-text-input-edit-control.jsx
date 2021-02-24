import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import React from 'react';

export default class RnTextInputEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('autoCompleteType')}
                {propertyEditor.drawProperty('autoCorrect')}
                {propertyEditor.drawProperty('defaultValue')}
                {propertyEditor.drawProperty('editable')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('keyboardType')}
                {propertyEditor.drawProperty('multiline')}
                {propertyEditor.drawProperty('numberOfLines')}
                {propertyEditor.drawProperty('placeholder')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('placeholderTextColor')}
                {propertyEditor.drawProperty('secureTextEntry')}
                {propertyEditor.drawProperty('textAlign')}
            </View>
        </View>);
    }

}
