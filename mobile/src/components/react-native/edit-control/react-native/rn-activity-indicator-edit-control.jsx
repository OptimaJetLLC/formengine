import React from 'react';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import RnBaseEditControl from './rn-base-edit-control.jsx';

export default class RnActivityIndicatorEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('animating')}
                {propertyEditor.drawProperty('color')}

            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('hidesWhenStopped')}
                {propertyEditor.drawProperty('size')}
            </View>
        </View>);
    }

}
