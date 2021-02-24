import React from 'react';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import RnBaseEditControl from './rn-base-edit-control.jsx';
import DWKitMessage from '../dwkit/dwkit-message.jsx';
import { Image, Text } from 'react-native-elements';

export default class RnButtonEditControl extends RnBaseEditControl {

    getDescriptionPart(propertyEditor) {
        return (<View>
            {propertyEditor.drawProperty('title')}
            <View style={builderStyles.formGroupEqual}>
                {propertyEditor.drawProperty('color')}
                {propertyEditor.drawProperty('disabled')}
            </View>
        </View>);
    }

    getStyleDescription() {
        return (
            <View>
                <DWKitMessage>
                    <Image source={{ uri: '/images/dwkitbuilder-info.png' }} style={builderStyles.dwKitMessageIcon}/>
                    <DWKitMessage.Content>
                        <Text>{this.getLocalValue('controlhasnostylesmsg', 'This control has no styles.')}</Text>
                    </DWKitMessage.Content>
                </DWKitMessage>
            </View>
        );
    }

}
