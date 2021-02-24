import React from 'react';
import { WebForm } from 'optimajet-builder-shared';
import reactNativeControlsInstance from './builder/controls-for-forms';
import { View } from 'react-native';

export default class Form extends WebForm {

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