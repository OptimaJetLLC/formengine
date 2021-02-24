import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import React from 'react';

export default class RnVirtualizedListEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('decelerationRate')}
                {propertyEditor.drawProperty('disableIntervalMomentum')}
                {propertyEditor.drawProperty('disableScrollViewPanResponder')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('endFillColor')}
                {propertyEditor.drawProperty('horizontal')}
                {propertyEditor.drawProperty('invertStickyHeaders')}
            </View>
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('keyboardShouldPersistTaps')}
                {propertyEditor.drawProperty('pagingEnabled')}
                {propertyEditor.drawProperty('scrollEnabled')}
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
