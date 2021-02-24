import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import React from 'react';

export default class RnStatusbarEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('animated')}
                {propertyEditor.drawProperty('backgroundColor')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('barStyle')}
                {propertyEditor.drawProperty('hidden')}
            </View>
        </View>);
    }

}
