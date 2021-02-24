import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import React from 'react';

export default class RnImageBackgroundEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('source')}
                {propertyEditor.drawProperty('defaultSource')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('blurRadius')}
                {propertyEditor.drawProperty('fadeDuration')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('resizeMethod')}
                {propertyEditor.drawProperty('resizeMode')}
            </View>
        </View>);
    }

    getStyleDescription() {
        const propertyEditor = this.getPropertyEditor();
        return (<View>
            <View>{super.getStyleDescription()}</View>
            {/* todo текущий парсинг пропертей работает не всегда корректно
             (числа типа width и height превращает в строки) */}
            {propertyEditor.drawProperty('imageStyle')}
        </View>);
    }

    beforeSave() {
        super.beforeSave();
        this.convertStyle('data-imageStyle', 'imageStyle');
    }

}
