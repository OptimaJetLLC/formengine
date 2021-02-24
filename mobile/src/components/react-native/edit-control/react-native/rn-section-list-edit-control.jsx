import RnBaseEditControl from './rn-base-edit-control.jsx';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import React from 'react';

export default class RnSectionListEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        // todo multiple items editor
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
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('initialNumToRender')}
                {propertyEditor.drawProperty('inverted')}
                {propertyEditor.drawProperty('stickySectionHeadersEnabled')}
            </View>
        </View>);
    }
}
