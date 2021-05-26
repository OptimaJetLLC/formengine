import React from "react";
import { Icon, Input, InputGroup } from 'rsuite';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (value) => {
        const newValue = value.toLowerCase();        
        this.setState({value: newValue});    
        if(this.props.handleChange) this.props.handleChange(newValue); 
    }

    reset() {
        this.handleChange('');
    }

    render() {
        return (
            <InputGroup inside size="xs">
                <Input 
                    onChange={this.handleChange}
                    className="formbuilder-toolbox-search"
                    placeholder='Search...'
                    value={this.state.value}
                    size="xs" appearance="subtle" style={{marginLeft: 0, fontSize: "14px",  background: "#0000001c"}}
                />
            <InputGroup.Addon style={{cursor: "pointer"}} onClick={this.handleChange.bind(this, '')}>
                {this.state.value.length 
                    ? <Icon icon='close-circle' inverse /> 
                    : <Icon icon='search' inverse/>
                }
            </InputGroup.Addon>
          </InputGroup>)
    }
}