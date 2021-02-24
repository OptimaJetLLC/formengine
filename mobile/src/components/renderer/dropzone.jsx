import React from 'react';
import { register } from 'optimajet-builder-shared';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

register('dropzone', options => {
    // todo simple file upload?
    const control = options.props.readOnly ?
        <View/> : <View><Text>dropzone</Text></View>
        // <DropzoneComponent config={options.componentConfig} eventHandlers={options.eventHandlers}
        //                    djsConfig={options.djsConfig}></DropzoneComponent>;

    // todo check in form
    // if (options.isForm) {
    //     return (<div className="field">{control}</div>);
    // }
    return control;
});
