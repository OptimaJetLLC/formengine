import React from 'react';
import { DWKitWebForm } from 'optimajet-builder-shared';
import reactNativeControlsInstance from './viewer-controls';
import { View } from 'react-native';

export default class DWKitReactNativeForm extends DWKitWebForm {

    constructor(props) {
        super(props);
        this.createControls = (...args) => reactNativeControlsInstance.createControls.apply(
            reactNativeControlsInstance,
            args
        );
    }

    render() {
        const items = this.getItemsForRender();
        return (
            <View style={{margin: 5, /*display: 'block' //not supported for react native*/}}>
                {items}
            </View>
        );
    }

}
