import React from 'react';
import { Linking, Platform, TouchableOpacity } from 'react-native';

export default function Link(props) {
    return Platform.select({
        native: () => (<TouchableOpacity {...props} onPress={() => Linking.openURL(props.href)}/>),
        default: () => (
            <a {...props} target={props.target} href={props.href}
               rel={props.rel} onClick={props.onPress}>{props.children}</a>
        ),
    })();
}
