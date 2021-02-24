import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import builderStyles from '../../../builder-styles'

export default class DWKitInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        }
    }

    onFocus() {
        this.setState({
            focused: true,
        });
    }

    onBlur() {
        this.setState({
            focused: false,
        });
    }

    render() {
        const focusedProps = this.state.focused && !this.props.disabled ? builderStyles.dwKitFocusedInputProps : {};
        const disabledProps = this.props.disabled ? builderStyles.dwKitDisabledInputProps : {};

        const controlProps = {
            ...this.props,
            ...builderStyles.dwKitInputProps,
            ...focusedProps,
            ...disabledProps,
            disabled: this.props.disabled || this.props.readOnly
        };

        if (controlProps.onChange) {
            controlProps.onChangeText = controlProps.onChange;
            delete controlProps.onChange;
        }

        if(this.props.error){
            controlProps.status = "danger";
        }

        if(this.props.type == "number"){
            let v = controlProps.value;
            if(typeof v == "number")
                v = Number(v).toString();

            if(!controlProps.keyboardType || controlProps.keyboardType == "default")
                controlProps.keyboardType = "decimal-pad";

            return (<Input onFocus={this.onFocus.bind(this)}
                       onBlur={this.onBlur.bind(this)}
                       textStyle={{textAlign:"right"}}
                       {...controlProps}
                       value={v}
                       />);

        }

        return (<Input onFocus={this.onFocus.bind(this)}
                       onBlur={this.onBlur.bind(this)}
                       {...controlProps}/>);
    }

}
