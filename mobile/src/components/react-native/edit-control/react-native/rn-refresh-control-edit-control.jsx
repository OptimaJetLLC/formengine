import React from 'react';
import { View } from 'react-native';
import RnBaseEditControl from './rn-base-edit-control.jsx';
import builderStyles from '../../../../builder-styles';

export default class RnRefreshControlEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('title')}
                {propertyEditor.drawProperty('refreshing')}
                {propertyEditor.drawProperty('enabled')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('progressBackgroundColor')}
                {propertyEditor.drawProperty('tintColor')}
                {propertyEditor.drawProperty('progressViewOffset')}
            </View>
        </View>);
    }

}
