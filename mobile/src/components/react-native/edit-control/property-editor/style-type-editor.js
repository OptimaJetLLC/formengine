import React, { Component } from 'react';
import DWKitTextArea from '../dwkit/dwkit-textarea.jsx';

export class StyleTypeEditor extends Component {

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
        return (<DWKitTextArea placeholder={this.props.placeholder} label={this.props.label} value={this.state.value}
                               onChange={this.valueChanged.bind(this)}/>);
    }

}
