import React, { Component } from 'react';
import DWKitInput from '../dwkit/dwkit-input.jsx';

export class StringTypeEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    valueChanged(value) {
        this.setState({
            value: value,
        });
        this.props.onValueChange && this.props.onValueChange(value);
    }

    render() {
        return (<DWKitInput placeholder={this.props.placeholder} label={this.props.label} value={this.state.value}
                            onChange={this.valueChanged.bind(this)}/>);
    }

}
