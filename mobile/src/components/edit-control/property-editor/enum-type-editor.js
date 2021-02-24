import React, { Component } from 'react';
import DWKitDropdown from '../dwkit/dwkit-dropdown.jsx';

export class EnumTypeEditor extends Component {

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
        const options = this.props.typeDefinition.getValues().map(item => {
            return { text: this.props.getLocalValue(item.key, item.defaultValue, item.formName), value: item.value };
        });

        return (<DWKitDropdown placeholder={this.props.placeholder} label={this.props.label} value={this.state.value}
                               onChange={this.valueChanged.bind(this)} options={options}/>);
    }

}
