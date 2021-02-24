import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import React from 'react';

export default class RnTouchableHighlightEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('delayLongPress')}
                {propertyEditor.drawProperty('delayPressIn')}
                {propertyEditor.drawProperty('delayPressOut')}
                {propertyEditor.drawProperty('disabled')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('activeOpacity')}
                {propertyEditor.drawProperty('underlayColor')}
            </View>
        </View>);
    }

}
