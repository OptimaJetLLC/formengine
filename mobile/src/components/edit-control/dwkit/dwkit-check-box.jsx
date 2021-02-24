import React from 'react';
import { CheckBox } from '@ui-kitten/components';
import builderStyles from '../../../builder-styles'

export default function DWKitCheckBox(props) {
    const disabledProps = props.disabled === true ? builderStyles.dwKitCheckDisabledProps : {};
    const controlProps = {
        ...props,
        ...builderStyles.dwKitCheckBoxProps,
        ...disabledProps,
    }

    if(props.error){
        controlProps.status = "danger";
    }

    controlProps.style = [builderStyles.controls.dwKitCheckBox, controlProps.style];
    return (<CheckBox {...controlProps} checked={!!controlProps.checked} children={props.label}/>);
}
