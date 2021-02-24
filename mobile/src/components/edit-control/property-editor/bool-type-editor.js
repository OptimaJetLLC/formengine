import React, { Component } from 'react';
import { BoolType } from '../../control/control-property-types';
import DWKitDropdown from '../dwkit/dwkit-dropdown.jsx';

export class BoolTypeEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    valueChanged(value) {
        const newValue = value === 'true'
            ? true
            : value === 'false' ? false : undefined;
        this.setState({
            value: newValue,
        });
        this.props.onValueChange && this.props.onValueChange(newValue);
    }

    render() {
        const options = BoolType.getValues().map(item => {
            return { text: this.props.getLocalValue(item.key, item.defaultValue, item.formName), value: item.value };
        });

        return (<DWKitDropdown placeholder={this.props.placeholder} label={this.props.label} value={this.state.value}
                               onChange={this.valueChanged.bind(this)} options={options}/>);
    }

}
