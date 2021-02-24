import React from 'react';
import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';

export default class RnKeyboardAvoidingViewEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('behavior')}
                {propertyEditor.drawProperty('enabled')}
                {propertyEditor.drawProperty('keyboardVerticalOffset')}
            </View>
        </View>);
    }

    getStyleDescription() {
        const propertyEditor = this.getPropertyEditor();
        return (<View>
            <View>{super.getStyleDescription()}</View>
            {propertyEditor.drawProperty('contentContainerStyle')}
        </View>);
    }

    beforeSave() {
        super.beforeSave();
        this.convertStyle('data-contentContainerStyle', 'contentContainerStyle');
    }

}
