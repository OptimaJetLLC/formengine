import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import React from 'react';

export default class RnPickerEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('enabled')}
                {propertyEditor.drawProperty('mode')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('prompt')}
                {propertyEditor.drawProperty('selectedValue')}
            </View>
        </View>);
    }

}
