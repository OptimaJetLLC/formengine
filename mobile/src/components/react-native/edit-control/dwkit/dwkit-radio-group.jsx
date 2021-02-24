 import React from 'react';
import { Radio, RadioGroup} from '@ui-kitten/components';
import { View } from 'react-native';
import { isDefined, isUndefined } from 'optimajet-builder-shared';
import builderStyles from '../../../../builder-styles';
import { Label } from '../../renderer/label.jsx';

export default function DWKitRadioGroup(props) {
    let selectedIndex = props.selectedIndex;
    if (isUndefined(selectedIndex)) {
        if (isDefined(props.selectedValue)) {
            selectedIndex = props.items.findIndex(item => item.value === props.selectedValue);
        }
        else{
            selectedIndex = props.items.findIndex(item => !item.value);
        }
    }

    const buttons = props.items.map(item => <Radio status={props.error ? "danger": undefined} children={item.label || item.text}></Radio>);
    return (<View style={[builderStyles.dwKitRadioGroup.containerStyle, {paddingLeft: 0, marginBottom: 0}]}>
        {props.label && <Label>{props.label}</Label>}
        <RadioGroup disabled={props.readonly} onChange={(index) => {
            props.onChange(props.items[index].value)}}
            selectedIndex={selectedIndex} style={props.style}>{buttons}</RadioGroup>
    </View>);
}
