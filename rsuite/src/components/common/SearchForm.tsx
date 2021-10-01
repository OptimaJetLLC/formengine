import React, { Component } from 'react';
import { Icon, Input, InputGroup } from 'rsuite';

interface SearchFormProps {
    handleChange: (value: string) => void;
}

interface SearchFormState {
    value: string;
}

export default class SearchForm extends Component<SearchFormProps, SearchFormState> {

    constructor(props: SearchFormProps) {
        super(props);
        this.state = { value: '' };
    }

    handleChange(value: string): void {
        const newValue = value.toLowerCase();
        this.setState({ value: newValue });
        if (this.props.handleChange) {
            this.props.handleChange(newValue);
        }
    };

    reset() {
        this.handleChange('');
    }

    render() {
        const icon = this.state.value.length ? 'close-circle' : 'search';
        return (<InputGroup inside size="xs">
            <Input
                onChange={this.handleChange.bind(this)}
                placeholder="Search..."
                value={this.state.value}
                size="xs" appearance="subtle" style={{ marginLeft: 10 }}
            />
            <InputGroup.Addon style={{ cursor: 'pointer' }} onClick={this.handleChange.bind(this, '')}>
                <Icon icon={icon}/>
            </InputGroup.Addon>
        </InputGroup>)
    }
}
