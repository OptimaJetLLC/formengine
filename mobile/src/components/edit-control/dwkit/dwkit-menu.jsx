import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tab, TabBar } from '@ui-kitten/components';
import builderStyles from '../../../builder-styles'

export default function DWKitMenu(props) {
    return (<View>
        <TabBar
            selectedIndex={props.selectedIndex}
            onSelect={props.onPress}>
                {props.items.map((item) => <Tab title={item}/>)}
        </TabBar>
        <View style={StyleSheet.flatten(builderStyles.controls.tabBarChild)}>
            {props.children}
        </View>
    </View>);
}
