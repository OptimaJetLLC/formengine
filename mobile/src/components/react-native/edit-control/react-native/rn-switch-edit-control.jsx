import React from 'react';
import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';

export default class RnSwitchEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('disabled')}
                {propertyEditor.drawProperty('thumbColor')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {/* todo object editor */}
                {/*{propertyEditor.drawProperty('thumbColor')}*/}
                {propertyEditor.drawProperty('value')}
            </View>
        </View>);
    }

}
