import React from 'react';
import { View } from 'react-native';
import { BasePreview } from 'optimajet-builder-shared';

// todo rename all preview etc
export default class Preview extends BasePreview {

    render() {
        const preview = this.getPreview();
        return (
            <View style={{
                margin: "15px"
            }}>
                {preview.dropzoneHeader}
                {preview.items}
                {preview.dropzoneFooter}
            </View>
        )
    }
}
