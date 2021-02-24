import React from 'react';
import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';

export default class RnFlatListControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('horizontal')}
                {propertyEditor.drawProperty('initialNumToRender')}
                {propertyEditor.drawProperty('initialScrollIndex')}
                {propertyEditor.drawProperty('inverted')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('numColumns')}
            </View>
        </View>);
    }

}
